const express = require ('express');
const morgan = require ('morgan');
const mysql =require ('mysql');
const myConnection = require('express-myconnection');
const path =require ('path');
//Este modulo nos servirá para poder mostrar mensajes 
//https://github.com/visionmedia/express-messages
var flash = require('connect-flash');
//checkout session -- modulos para guardar nuestras sesiones y utilizarlas para distintos fines
//https://www.npmjs.com/package/express-session
const session = require('express-session');
//particularmente mysql session nos servirá para guardar la información de las sesiones en una tabla dentro de nuestra bd
//https://www.npmjs.com/package/express-mysql-session
const MySQLStore = require('express-mysql-session')(session);
//La constante sessionStore será nuestra conexión para la session exclusivamente 
//(mismas credenciales que en la conexion que ya hicimos)
const sessionStore = new MySQLStore({
    host: 'localhost',
    user: 'root', 
    password: '',
    port: 3306,
    database: 'database_petshoptest'
});
//npm install nodemailer
const nodemailer = require('nodemailer');
// Con este comando empezamos la creación de configuraciones para nuestro servidor local
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
    saveUninitialized: true //true para empezar a guardar información
}));
//Para entender datos de los formularios
app.use(express.urlencoded({extended:false}));
//Las siguientes 3 funciones nos van a servir para poder utilizar información a traves de todo nuestro proyecto
app.use(function(req, res, next) {
    res.locals.cart = req.session.cart; //utilizar la información del carrito en toda la navegación
    console.log(res.locals.cart)
    next();
  });
app.use(flash());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res); //mensajes que quisieramos mostrar
    next();
});

//routes (secciones del servidor)
app.use(require('./routes/routes'));

//static files
app.use(express.static(path.join(__dirname,'public')));

//Tenemos que leer nuestra aplicación por el puerto que configuramos para que nuestro servidor corra. 
app.listen (app.get('port'),() => {
    console.log('server on port');
});