const mongoose = require('mongoose');
const Product = require('../models/product');
mongoose.connect(
    'mongodb+srv://dulceguzmantaveras:Z8MZtFcDyVW9oWzW@cluster0.rcqta.mongodb.net/products_test?retryWrites=true&w=majority'
    ).then(() => {
        console.log('database is conected!')
    }).catch(()=>{
        console.log('connection failed!')
    })

const getProducts = async (req,res,next) => {

}

const createProduct = async (req,res,next) => {
    const createProduct = new Product({
        name:req.body.name,
        price:req.body.price
    });
    const result = await createProduct.save();
    res.json(result)
}

exports.getProducts = getProducts;
exports.createProduct = createProduct;