const express = require('express');
const router = express.Router();

/******** ROUTE  *************/
const AuthController = require('../controllers/AuthController')
/***************************** */

router.get('/222',AuthController.showLoginForm)

module.exports=router