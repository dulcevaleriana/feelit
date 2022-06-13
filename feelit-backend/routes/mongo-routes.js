const {Router} = require('express');
const router = Router();
const mongoControllers = require('../controllers/mongo-controller');

//get 
router.get('/',mongoControllers.getProducts)
//post
router.post('/createProducts',mongoControllers.createProduct)


module.exports = router;