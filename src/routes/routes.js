const express= require('express');
const router = express.Router();

const indexController = require('../controllers/indexController'); 
router.get('/index.html', indexController.list); 
router.post('/add', indexController.save)

const productsController = require('../controllers/productsController'); 
router.get('/products.html', productsController.list); 

const productPageController = require('../controllers/productPageController'); 
router.get('/productPage.html', productPageController.list); 


module.exports=router;