const mongoose = require('mongoose');
const Product = require('../models/product');
require('dotenv').config();

mongoose.connect(
    `mongodb+srv://dulceguzmantaveras:${process.env.MONGODB_KEY}@cluster0.rcqta.mongodb.net/${process.env.MONGODB_DBA}?retryWrites=true&w=majority`
    ).then(() => {
        console.log('database is conected!')
    }).catch(()=>{
        console.log('connection failed!',)
    })

const getProducts = async (req,res,next) => {
    const products = await Product.find().exec();
    res.json(products);
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