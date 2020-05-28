const express= require('express');
const router = express.Router();

const indexController = require('../controllers/indexController'); 
router.get('/', indexController.list); 
router.get('/index.html', indexController.list); 
router.post('/add', indexController.save); 

const productsController = require('../controllers/productsController'); 
router.get('/products.html', productsController.list); 

const productPageController = require('../controllers/productPageController'); 
router.get('/productPage.html/:product', productPageController.list); 
router.get('/productPage.html/', productPageController.list); 

const contactController = require('../controllers/contactController'); 
router.get('/contact.html', contactController.list); 

const adoptController = require('../controllers/adoptController'); 
router.get('/adopt.html', adoptController.list); 

const cartController = require('../controllers/cartController'); 
router.get('/add/:id', cartController.add); 
router.get('/cart.html', cartController.cart); 
router.get('/cart/update/:id/delete', cartController.remove); 
router.get('/cart/update/:id/remove', cartController.removeOne); 
router.get('/cart/update/:id/add', cartController.addOne); 
router.get('/cart/response/:resp', cartController.ppResp); 


const mailController = require('../controllers/mailController');
router.get('/sendMail', mailController.sendEmail);

//const sessions = require('../controllers/sessionController');
//router.get('/signIn', sessionController.get_identification);
//router.post('/identification', sessionController.post_identification);
//router.get('/', sessionController.welcome);
//router.get('/', sessionController.sign_out);

module.exports=router;