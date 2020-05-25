const express = require ('express');
const morgan = require ('morgan');
const mysql =require ('mysql');
const myConnection = require('express-myconnection');
const path =require ('path');
var flash = require('connect-flash');
//checkout session
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const sessionStore = new MySQLStore({
    host: 'localhost',
    user: 'root', 
    password: '',
    port: 3306,
    database: 'database_petshoptest'
});


const app = express();

//settings
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); 
app.set('public', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile); //usar archivos html usando ejs

//middlewares
app.use(morgan('dev'));
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root', 
    password: '',
    port: 3306,
    database: 'database_petshoptest'
}, 'single' ));
app.use(session({
    secret: 's3cur3',
    store: sessionStore,
    resave: false,
    saveUninitialized: true
}));
app.use(function(req, res, next) {
    res.locals.cart = req.session.cart;
    console.log(res.locals.cart)
    next();
  });
app.use(require('connect-flash')());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});
//Para entender datos de los formularios
app.use(express.urlencoded({extended:false}));

//routes (secciones del servidor)
app.use(require('./routes/routes'));

//static files
app.use(express.static(path.join(__dirname,'public')));


app.listen (app.get('port'),() => {
    console.log('server on port');
});