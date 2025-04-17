const express = require('express');
const router = express.Router();

/******** ROUTE  *************/
const AuthController = require('../controllers/AuthController')
/***************************** */

/********* AUTH ROUTES *********************************/
router.get('/',AuthController.showLoginForm)
router.get('/signin',AuthController.showLoginForm)
router.post('/signin',AuthController.signin)

//router.get('/register',AuthController.showRegisterForm)
router.post('/register',AuthController.signup)


router.all('/signout',AuthController.signout)

router.all('/404',AuthController.pageNotFound)
/********************************************************/


  
module.exports=router

