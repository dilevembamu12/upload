const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { User } = require('../models')

const i18n = require('i18n');
const ENV = require('../config')

const createError = require('../middlewares/error')

const bodyParser = require('body-parser')
const urlencodedparser = bodyParser.urlencoded({ extended: false })
/*


const bcrypt= require('bcrypt')
const jwt= require('jsonwebtoken')

const {User} = require('../models')


const createError= require('../middlewares/error')
*/


const showLoginForm = async (req, res, next) => {
    var locals = {
        __: i18n,
        title: ENV.APP_NAME,
        description: ENV.APP_TITLE,
        layout: 'layouts/auth',
        req: req
        //header: 'Page Header'
    };
    res.render('pages/auth', locals);
}

const showRegisterForm = async (req, res, next) => {
    var locals = {
        __: i18n,
        title: ENV.APP_NAME,
        description: ENV.APP_TITLE,
        layout: 'layouts/auth',
        req: req,
        req: req
        //header: 'Page Header'
    };
    res.render('pages/auth/register', locals);
}

const pageNotFound = async (req, res, next) => {
    var locals = {
        __: i18n,
        title: ENV.APP_NAME,
        description: ENV.APP_TITLE,
        layout: 'layouts/app',
        req: req
        //header: 'Page Header'
    };
    res.render('404', locals);
}






const signin = async (req, res, next) => {

    console.log('A', req.body)
    try {
        //verifier que la personne existe
        const user = await User.findOne({ where: { email: req.body.email } })

        if (!user) next(createError(404, 'NOC.MODUPL.AUTH.USER.USER.404'))

        //verification du mot de passe
        const comparePassword = await bcrypt.compare(req.body.password, user.password)

        if (!comparePassword) next(createError(404, 'NOC.MODUPL.AUTH.USER.PASSWORD.404'))


        //GENERER LE TOKEN D'ACCES
        const token = jwt.sign({ id: user.id }, ENV.JWT_ACCESS_TOKEN_SECRET, { expiresIn: '24h' })

        //on exclu le mot de passe du resultat
        const { password, ...userData } = user.dataValues

        //la creation du cookie
        res.cookie('access_token', token, {
            httpOnly: true,
            secure: false, //true:https , false:http
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000
        }).status(200).json(userData)

    } catch (error) {
        next(createError(404, 'NOC.MODUPL.AUTH.USER.USER.404'))
        //return next(createError(401, "error", error.message))
        /*
        res.cookie('access_token', null, {
            httpOnly: true,
            secure: false, //true:https , false:http
            sameSite: 'strict',
            maxAge: 0
        }).status(500).json({
            error: {
                status: "500",
                message: 'ERR500',
                details: error.message
            }
        })
        */

    }
}



const signup = async (req, res, next) => {

    try {
        //hachage de mot de passe
        const hashedPassword = await bcrypt.hash(req.body.password.toString(), 10)
        console.log('A', hashedPassword)


        //creation de l'utilisateur
        const user = await User.create({
            ...req.body,
            password: hashedPassword
        })

        res.status(201).json({ message: 'utilisateur ajouté' })

    } catch (error) {
        res.status(500).json({
            error: {
                status: "500",
                message: 'ERR500',
                details: error.message
            }
        })
    }
}



const signout = async (req, res, next) => {
    console.log('CC', "1234567890")
    /*
    cookie = req.cookies;
    for (var prop in cookie) {
        if (!cookie.hasOwnProperty(prop)) {
            continue;
        }    
        res.cookie(prop, '', {expires: new Date(0)});
    }
    res.redirect('/');
    */
    /*
    const token = req.cookies.access_token
    try {
        //res.cookie('access_token')


        res.clearCookie("access_token");
        res.redirect("/");
        //cookies.set('testtoken', {expires: Date.now()});
        
    } catch (error) {
        res.redirect("/");
    }
    */
}



module.exports = { showLoginForm, showRegisterForm, signup, signin, signout, pageNotFound }