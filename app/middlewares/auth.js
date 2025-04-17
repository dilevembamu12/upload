const jwt = require('jsonwebtoken')

const i18n = require('i18n');
const ENV = require('../config')
const createError = require('../middlewares/error')

function responseError(obj, req, res, next, authentificated = false) {
    if (!req.xhr) {
        //the request is not ajax call

        //si il etait deja connecté
        if (authentificated) {
            console.log('DEJA AUTHENTIFIE=============>', "1")

        }
        console.log('PAS AUTHENTIFIE=============>', "1")
        return res.redirect('/signin');
        // il n'a jamais été connecté

        //return res.redirect('/admin');
    }
    return obj;
}

const authToken = (req, res, next) => {

    //console.log('BBB',req.originalUrl)
    var token = '';


    try {
        token = req.cookies.access_token
        //console.log('ABC=============>', token)

        //SI LE TOKEN EST UNDEFINIED ET QUE CE NEST PAS UN AJAX
        if (token === undefined) {

            console.log('GGGGGGG==>', token)
            console.log('originalUrl==>', req.originalUrl)
            /*
            if(req.originalUrl='/signin'){
                return next();
            }*/

            var active_depth1='';
            try {
                active_depth1 = req.path.split('/')[1]
            } catch (error) {

            }
            console.log('AAAAAAA==>', active_depth1)
            if (active_depth1 != 'admin' && active_depth1 != 'user') {
                console.log('TTTTTTTTTTTT==>', req.originalUrl)
                return next();
            } else {
                console.log('OOOOOOOOO==>', req.originalUrl)
                return res.redirect('/signin');
                //return responseError(createError(403, "token invalid", err.message),req,res,next)
            }
        }



        //VERIFIER LA VALIDITE
        jwt.verify(token, ENV.JWT_ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) return responseError(createError(403, "token invalid", err.message), req, res, next) //403, INTERDIT

            req.authUser = user
            //SI IL EST CONNECTE MAIS IL SE RETROUVE DANS L'ACCUEIL ON LE REDIRIGE DANS /ADMIN OU /USER
            if (req.originalUrl == '/' || req.originalUrl == '') {
                return next(res.redirect('/admin'));
            }
            next()
        })
    } catch (error) {
        responseError(createError(401, "error", error.message), req, res, next)
    }
}



module.exports = authToken;