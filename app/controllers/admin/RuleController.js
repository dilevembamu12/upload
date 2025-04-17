const i18n = require('i18n');
const ENV = require('../../config');
const { Rule } = require('../../models');
const createError = require('../../middlewares/error');
const datatable = require('sequelize-datatables');

const uri = "pages/admin/rules/";
const uri_url = "/admin/rules/";

const index = async (req, res, next) => {
    if (req.xhr) {
        try {
            const dt = await datatable(Rule, req.query, {
                attributes: ['id', 'name', 'type', 'description', 'is_active'],
                order: [['createdAt', 'DESC']],
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
            return next(createError(500, 'Failed to retrieve rules', error));
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
        const rule = await Rule.findByPk(req.params.id);
        if (!rule) {
            return next(createError(404, 'Rule not found'));
        }
        var locals = {
            __: i18n,
            title: ENV.APP_NAME,
            description: ENV.APP_TITLE,
            layout: 'layouts/app',
            req: req,
            rule: rule
        };
        res.render(uri + 'show', locals);
    } catch (error) {
        return next(createError(500, 'Failed to retrieve rule', error));
    }
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
        const rule = await Rule.create(req.body);
        res.status(201).json({ message: 'Rule created successfully', rule: rule });
    } catch (error) {
        return next(createError(400, 'Failed to create rule', error));
    }
};

const edit = async (req, res, next) => {
    try {
        const rule = await Rule.findByPk(req.params.id);
        if (!rule) {
            return next(createError(404, 'Rule not found'));
        }
        var locals = {
            __: i18n,
            title: ENV.APP_NAME,
            description: ENV.APP_TITLE,
            layout: 'layouts/app',
            req: req,
            rule: rule
        };
        res.render(uri + 'edit', locals);
    } catch (error) {
        return next(createError(500, 'Failed to retrieve rule', error));
    }
};

const update = async (req, res, next) => {
    try {
        const rule = await Rule.findByPk(req.params.id);
        if (!rule) {
            return next(createError(404, 'Rule not found'));
        }
        await rule.update(req.body);
        res.json({ message: 'Rule updated successfully', rule: rule });
    } catch (error) {
        return next(createError(400, 'Failed to update rule', error));
    }
};

const _delete = async (req, res, next) => {
    try {
        const rule = await Rule.findByPk(req.params.id);
        if (!rule) {
            return next(createError(404, 'Rule not found'));
        }
        await rule.destroy();
        res.json({ message: 'Rule deleted successfully' });
    } catch (error) {
        return next(createError(500, 'Failed to delete rule', error));
    }
};

module.exports = { index, show, create, store, edit, update, _delete };