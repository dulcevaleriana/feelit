const { v4: uuidv4 } = require('uuid');
const httpError = require('../models/http-error');
const {validationResult} = require('express-validator');
const User = require('../models/user');
//BDA TEMPORAL
let DUMMY_USERS = [
    {
        id:'ul',
        name:'Dulce guzman',
        email:'dulce@gmail.com',
        password:'proof',
        image:'image.png'
    }
]
//get all users
const getUsers = async (req,res,next) => {
    const users = await User.find().exec();
    res.json({users})
}
//post a user
const signUpUsers = async (req,res,next) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return next(new httpError('Invalid inputs passed, please check your data',422));
    }
    
    const {
        name,
        email,
        password,
        image,
        places
    } = req.body;

    let existingUser;

    const createUser = new User({
        name,
        email,
        password,
        image,
        places
    });

    try {
        existingUser = await User.findOne({email: email})
        if(existingUser){
            return next(new httpError(`this email: ${email} was register by other user, try again`,422))
        }
        await createUser.save();
    } catch (err) {
        return next(new httpError('we can`t create this user, try again',500))
    }

    res.status(200).json({message:'your user was created!!',user:createUser.toObject({getters:true})})
}
//login with a exist account
const login = async (req,res,next) => {
    const {
        email,
        password
    } = req.body;
    let existingUser;

    try {
        existingUser = await User.findOne({email: email})
        if(!existingUser || existingUser.password !== password){
            return next(new httpError(`your credentials are incorrect, try again`,422))
        }
    } catch (err) {
        return next(new httpError('login failed, try again',500))
    }

    res.json({message: 'logged in!'})
}

exports.getUsers = getUsers;
exports.signUpUsers = signUpUsers;
exports.login = login;