const express= require('express');
const router = express.Router();

const indexController = require('../controllers/indexController'); 
router.get('/', indexController.list); 
router.get('/index.html', indexController.list); 
//router.post('/add', indexController.save); 

const productsController = require('../controllers/productsController'); 
router.get('/products.html', productsController.list); 

const productPageController = require('../controllers/productPageController'); 
router.get('/productPage.html', productPageController.list); 

const contactController = require('../controllers/contactController'); 
router.get('/contact.html', contactController.list); 

const adoptController = require('../controllers/adoptController'); 
router.get('/adopt.html', adoptController.list); 

module.exports=router;