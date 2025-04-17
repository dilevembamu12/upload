require('dotenv').config();
const path = require('path')

const express = require('express');
const expressLayouts = require('express-ejs-layouts')

const bodyParser = require('body-parser')

const guestRoutes = require("./app/routes")
const userRoutes = require("./app/routes/")
const adminRoutes = require("./app/routes/admin")


const ENV= require('./app/config');


const cors = require('cors');
const cookieParser = require('cookie-parser')


const authToken=require('./app/middlewares/auth')
/**************************************************************** */

const PORT = ENV.PORT || 3000;
const app = express();
const i18n = require('i18n');


app.set('views', path.join(__dirname, 'app/resources/views'))
app.set('view engine', 'ejs')


app.use(expressLayouts)
//app.set("layout extractScripts", true)//If you like to place all the script blocks at the end, you can do it like this:
app.set('layout', 'layouts/app')

app.use(express.static('app/public'))


// MIDDLEWARE
//app.use(express.json())
app.use(bodyParser.json()); // support json encoded bodies
app.use(express.urlencoded({ extended: true })); // support encoded bodies

app.use(cors())
app.use(cookieParser())



/*
app.use(bodyParser.json())
*/



i18n.configure({
    locales: ['fr', 'fr'], // English and Spanish
    directory: __dirname + '/app/resources/lang',
    defaultLocale: 'fr',
    objectNotation: true
});




/*
app.get('/aaab', function (req, res, next) {
  var locals = {
    //__: i18n,
    title: ENV.APP_NAME,
    description: ENV.APP_TITLE,
    layout: 'layouts/auth'
    //header: 'Page Header'
  };
  
  res.render('pages/auth', locals);
});
*/

/*
app.post('/aaab', function (req, res) {
  console.log("=====>");
  // your JSON
  console.log("+++++++++");
  console.log(req.body.email);
  res.send(req.body.email);    // echo the result back
  console.log("<=====");
});
*/

/*
app.post('/aaab', async (req, res, next) => {
  next(createError(404,'ERR500',"error"))
});
*/


/*****************ROUTES******************** */
//
app.use( ( req, res, next ) => {
  //console.log("1AAA1",req.path)
  req.active_url=req.path
  next();
  
});




app.use(authToken)
app.use(guestRoutes)
app.use('/user',userRoutes)
app.use('/admin',adminRoutes)

/*
app.get('*', (req, res) => {
  // REDIRECT goes here
  res.redirect('/404');
})

/********************************* */



//MIDDLEWARE GESTION ERROR
app.use((err,req,res,next)=>{
  const status=err.status || 500;
  const message=i18n.__(err.message)||err.message
  const details=err.details

  res.status(status).json({
      error:{
          status,message,details
      }
  })
})
//append req on the app.use in last response
/*
app.use( ( req, res, next ) => {
  res.on( 'finish', () => {
      req.active = req.path.split('/')[1] // [0] will be empty since routes start with '/'
  } );

  next();
});
*/


//met la base url dans le navigateur du client dans localstorage
app.locals.BASE_URL = ENV.BASE_URL;
app.locals.API_URL = ENV.API_URL;

app.listen(PORT, () => console.log(`==>${process.env.APP_NAME = "FinTrax Uploader"
  }<== run at port ${PORT}`))