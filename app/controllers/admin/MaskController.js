const i18n = require('i18n');
const ENV = require('../../config');
const { Mask, Field, Rule, MaskField, FieldRule } = require('../../models'); // Assure-toi d'importer tous les modèles nécessaires
const createError = require('../../middlewares/error');
const Sequelize = require('sequelize');
const datatable = require('sequelize-datatables');

const uri = "pages/admin/masks/";
const uri_url = "/admin/masks/";

const index = async (req, res, next) => {
    if (req.xhr) {
        try {
            const dt = await datatable(Mask, req.query, {
                attributes: ['id', 'name', 'description'], // Spécifiez les attributs à récupérer
                order: [['createdAt', 'DESC']], // Tri par défaut
            });
            dt.data.forEach(row => {
                row.actions = `<div class="me-2 mb-2 btn-actions">
                                    <div class="dropdown">
                                        <a href="javascript:void(0);" class="dropdown-toggle btn btn-white d-inline-flex align-items-center" data-bs-toggle="dropdown"> Actions </a>
                                        <ul class="dropdown-menu  dropdown-menu-end p-3">
                                            <li><a href="${uri_url}${row.id}" class="dropdown-item rounded-1"><i class="ti ti-edit me-2"></i>Voir</a></li>
                                            <li><a href="${uri_url}${row.id}/edit" class="dropdown-item rounded-1"  target="ext"><i class="ti ti-edit me-2"></i>Modifier</a></li>
                                            <li><a href="${uri_url}${row.id}" class="dropdown-item rounded-1" data-method="delete"><i class="ti ti-trash me-2"></i>Supprimer</a></li>
                                        </ul>
                                    </div>
                                </div>`;
            });
            return res.json(dt);
        } catch (error) {
            console.error("Datatable error:", error);
            return next(createError(500, 'Failed to retrieve masks', error));
        }
    }

    var locals = {
        __: i18n,
        title: ENV.APP_NAME,
        description: ENV.APP_TITLE,
        layout: 'layouts/app',
        req: req
    };
    res.render(uri + 'index', locals);
};

const show = async (req, res, next) => {
    try {
        const mask = await Mask.findByPk(req.params.id, {
            include: [{
                model: Field,
                as: 'fields',
                through: { attributes: [] } // Exclure les attributs de la table de jointure
            }]
        });
        if (!mask) {
            return next(createError(404, 'Mask not found'));
        }

        var locals = {
            __: i18n,
            title: ENV.APP_NAME,
            description: ENV.APP_TITLE,
            layout: 'layouts/app',
            req: req,
            mask: mask
        };
        res.render(uri + 'show', locals);
    } catch (error) {
        console.error("Erreur lors de la récupération du mask:", error);
        return next(createError(500, 'Erreur lors de la récupération du mask', error));
    }
};

const create = async (req, res, next) => {
    try {
        const fields = await Field.findAll();
        const rules = await Rule.findAll();

        var locals = {
            __: i18n,
            title: ENV.APP_NAME,
            description: ENV.APP_TITLE,
            layout: 'layouts/app',
            req: req,
            fields: fields, // Passer les données des champs à la vue
            rules: rules // Passer les données des règles à la vue
        };
        res.render(uri + 'create', locals);
    } catch (error) {
        console.error("Erreur lors de la récupération des champs et des règles:", error);
        return next(createError(500, 'Erreur lors de la récupération des champs et des règles', error));
    }
};

const store = async (req, res, next) => {
    const t = await req.app.get('sequelize').transaction(); // Récupère l'instance sequelize et démarre une transaction
    try {
        const { name, description, fields } = req.body;

        // 1. Créer le Mask
        const mask = await Mask.create({ name, description }, { transaction: t });

        // 2. Associer les Fields et les Rules
        if (fields && fields.length > 0) {
            for (const fieldData of fields) {
                const { fieldId, rules } = fieldData;

                // 2.1 Créer l'association MaskField
                await MaskField.create({ maskId: mask.id, fieldId: fieldId }, { transaction: t });

                // 2.2 Associer les Rules au Field
                if (rules && rules.length > 0) {
                    for (const ruleData of rules) {
                        const { ruleId, order } = ruleData;

                        // 2.3 Créer l'association FieldRule
                        await FieldRule.create({ fieldId: fieldId, ruleId: ruleId, order: order }, { transaction: t });
                    }
                }
            }
        }

        // Valider la transaction
        await t.commit();

        // Envoyer la réponse
        res.status(201).json({ message: 'Masque créé avec succès', mask: mask });
    } catch (error) {
        // Annuler la transaction en cas d'erreur
        await t.rollback();
        console.error("Erreur lors de la création du masque:", error);
        return next(createError(500, 'Erreur lors de la création du masque', error));
    }
};

const edit = async (req, res, next) => {
    try {
        const mask = await Mask.findByPk(req.params.id, {
            include: [{
                model: Field,
                as: 'fields',
                through: { attributes: [] } // Exclure les attributs de la table de jointure
            }]
        });
        if (!mask) {
            return next(createError(404, 'Mask not found'));
        }

         const fields = await Field.findAll();
         const rules = await Rule.findAll();

        var locals = {
            __: i18n,
            title: ENV.APP_NAME,
            description: ENV.APP_TITLE,
            layout: 'layouts/app',
            req: req,
            mask: mask,
            fields: fields, // Passer les données des champs à la vue
            rules: rules // Passer les données des règles à la vue
        };
        res.render(uri + 'edit', locals);
    } catch (error) {
        console.error("Erreur lors de la récupération du mask pour la modification:", error);
        return next(createError(500, 'Erreur lors de la récupération du mask pour la modification', error));
    }
};

const update = async (req, res, next) => {
    const t = await req.app.get('sequelize').transaction(); // Démarre une transaction
    try {
        const { name, description, fields } = req.body;
        const maskId = req.params.id;

        // 1. Récupérer le Mask
        const mask = await Mask.findByPk(maskId, { transaction: t });
        if (!mask) {
            return next(createError(404, 'Mask not found'));
        }

        // 2. Mettre à jour les informations de base du Mask
        mask.name = name;
        mask.description = description;
        await mask.save({ transaction: t });

        // 3. Supprimer les relations existantes (MaskField et FieldRule)
        await MaskField.destroy({ where: { maskId: maskId }, transaction: t });
        await FieldRule.destroy({
            where: {
                fieldId: {
                    [Sequelize.Op.in]: Sequelize.literal(`(SELECT fieldId FROM MaskFields WHERE maskId = ${maskId})`)
                }
            },
            transaction: t
        });

        // 4. Recréer les relations
        if (fields && fields.length > 0) {
            for (const fieldData of fields) {
                const { fieldId, rules } = fieldData;

                // 4.1 Créer l'association MaskField
                await MaskField.create({ maskId: mask.id, fieldId: fieldId }, { transaction: t });

                // 4.2 Associer les Rules au Field
                if (rules && rules.length > 0) {
                    for (const ruleData of rules) {
                        const { ruleId, order } = ruleData;

                        // 4.3 Créer l'association FieldRule
                        await FieldRule.create({ fieldId: fieldId, ruleId: ruleId, order: order }, { transaction: t });
                    }
                }
            }
        }

        // Valider la transaction
        await t.commit();

        // Envoyer la réponse
        res.json({ message: 'Masque mis à jour avec succès', mask: mask });
    } catch (error) {
        // Annuler la transaction en cas d'erreur
        await t.rollback();
        console.error("Erreur lors de la mise à jour du masque:", error);
        return next(createError(500, 'Erreur lors de la mise à jour du masque', error));
    }
};

const _delete = async (req, res, next) => {
    try {
        const maskId = req.params.id;

        // 1. Supprimer les relations (MaskField et FieldRule)
        await MaskField.destroy({ where: { maskId: maskId } });
        await FieldRule.destroy({
            where: {
                fieldId: {
                    [Sequelize.Op.in]: Sequelize.literal(`(SELECT fieldId FROM MaskFields WHERE maskId = ${maskId})`)
                }
            }
        });

        // 2. Supprimer le Mask
        const mask = await Mask.findByPk(maskId);
        if (!mask) {
            return next(createError(404, 'Mask not found'));
        }
        await mask.destroy();

        // Envoyer la réponse
        res.json({ message: 'Masque supprimé avec succès' });
    } catch (error) {
        console.error("Erreur lors de la suppression du masque:", error);
        return next(createError(500, 'Erreur lors de la suppression du masque', error));
    }
};

module.exports = { index, show, create, store, edit, update, _delete };