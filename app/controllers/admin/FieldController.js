const i18n = require('i18n');
const ENV = require('../../config');
const datatable = require('sequelize-datatables');
const { Field } = require('../../models');
const createError = require('../../middlewares/error');
const { validateCreateField, validateUpdateField } = require('../../middlewares/validators/fieldValidator'); // Import des middlewares de validation

const uri = "pages/admin/fields/";
const uri_url = "/admin/fields/";


const index = async (req, res, next) => {
    if (req.xhr) {

        try {
            const dt = await datatable(Field, req.query, {
                attributes: ['id', 'name', 'type', 'label', 'description'], // Spécifiez les attributs à récupérer
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
            return next(createError(500, 'Failed to retrieve fields', error));
        }
    }

    var locals = {
        __: i18n,
        title: ENV.APP_NAME,
        description: ENV.APP_TITLE,
        layout: 'layouts/app',
        req: req
    };
    res.render(uri + "index", locals);
};

const show = async (req, res, next) => {
    var locals = {
        __: i18n,
        title: ENV.APP_NAME,
        description: ENV.APP_TITLE,
        layout: 'layouts/app',
        req: req,
        field: req.field
    };
    res.render(uri + 'show', locals);
};

const edit = async (req, res, next) => {
    var locals = {
        __: i18n,
        title: ENV.APP_NAME,
        description: ENV.APP_TITLE,
        layout: 'layouts/app',
        req: req,
        field: req.field
    };
    res.render(uri + 'edit', locals);
};

const create = async (req, res, next) => {
    var locals = {
        __: i18n,
        title: ENV.APP_NAME,
        description: ENV.APP_TITLE,
        layout: 'layouts/app',
        req: req
    };
    res.render(uri + 'create', locals);
};

const store = async (req, res, next) => {
    try {
        
        const field = await Field.create(req.body); // Utilisation de req.body pour récupérer les données du formulaire
        console.log("ok");
        res.status(201).json({ message: 'Field created successfully', field: field });
    } catch (error) {
        console.log("echec", error.message);
        return next(createError(403, error.message, error.details));       
    }
};

const update = async (req, res, next) => {
    try {
        const field = await Field.findByPk(req.params.id);
        if (!field) {
            return next(createError(404, 'Field not found'));
        }
        await field.update(req.body); // Utilisation de req.body pour récupérer les données du formulaire
        res.json({ message: 'Field updated successfully', field: field });
    } catch (error) {
        return next(createError(403, error.message, error.details)); 
    }
};

const _delete = async (req, res, next) => {
    try {
        const field = await Field.destroy({
            where: {
                id: req.params.id
            }
        });
        if (field === 0) {
            return next(createError(404, 'Field non trouvé'));
        }
        return res.status(200).json({ message: 'Field supprimé' });
    } catch (error) {
        return next(createError(500, error.name, error.message));
    }
};

module.exports = { index, create, store, show, edit, update, _delete };