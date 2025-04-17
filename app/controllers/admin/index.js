const bcrypt= require('bcrypt')
const jwt= require('jsonwebtoken')

const {User} = require('../../models')

const i18n = require('i18n');
const ENV= require('../../config')

const createError= require('../../middlewares/error')

const bodyParser = require('body-parser')
const urlencodedparser = bodyParser.urlencoded({extended:false})
/*


const bcrypt= require('bcrypt')
const jwt= require('jsonwebtoken')

const {User} = require('../models')


const createError= require('../middlewares/error')
*/


const dashboard = async (req, res, next) => {
    var locals = {
        __: i18n,
        title: ENV.APP_NAME,
        description: ENV.APP_TITLE,
        layout: 'layouts/app',
        req:req
        //header: 'Page Header'
    };
    res.render('pages/admin/', locals);
}




module.exports = { dashboard }