const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { User } = require('../../models')

const i18n = require('i18n');
const ENV = require('../../config')

const createError = require('../../middlewares/error')

const bodyParser = require('body-parser')
const urlencodedparser = bodyParser.urlencoded({ extended: false })

const uri = "pages/admin/entities/"


const index = async (req, res, next) => {
    var locals = {
        __: i18n,
        title: ENV.APP_NAME,
        description: ENV.APP_TITLE,
        layout: 'layouts/app',
        req: req
        //header: 'Page Header'
    };
    res.render(uri, locals);
}

const show = async (req, res, next) => {
    var locals = {
        __: i18n,
        title: ENV.APP_NAME,
        description: ENV.APP_TITLE,
        layout: 'layouts/app',
        req: req
        //header: 'Page Header'
    };
    res.render(uri + 'show', locals);
}

const edit = async (req, res, next) => {
    var locals = {
        __: i18n,
        title: ENV.APP_NAME,
        description: ENV.APP_TITLE,
        layout: 'layouts/app',
        req: req
        //header: 'Page Header'
    };
    res.render(uri + 'edit', locals);
}

const create = async (req, res, next) => {
    var locals = {
        __: i18n,
        title: ENV.APP_NAME,
        description: ENV.APP_TITLE,
        layout: 'layouts/app',
        req: req
        //header: 'Page Header'
    };
    res.render(uri + 'create', locals);
}

const store = async (req, res, next) => {
    var locals = {
        __: i18n,
        title: ENV.APP_NAME,
        description: ENV.APP_TITLE,
        layout: 'layouts/app',
        req: req
        //header: 'Page Header'
    };
    res.render(uri + 'store', locals);
}

const update = async (req, res, next) => {
    var locals = {
        __: i18n,
        title: ENV.APP_NAME,
        description: ENV.APP_TITLE,
        layout: 'layouts/app',
        req: req
        //header: 'Page Header'
    };
    res.render(uri + 'update', locals);
}

const _delete = async (req, res, next) => {
    var locals = {
        __: i18n,
        title: ENV.APP_NAME,
        description: ENV.APP_TITLE,
        layout: 'layouts/app',
        req: req
        //header: 'Page Header'
    };
    res.render(uri + 'update', locals);
}

module.exports = { index, create, store, show, edit, update, _delete }
