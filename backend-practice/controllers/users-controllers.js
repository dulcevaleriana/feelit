const { v4: uuidv4 } = require('uuid');
const httpError = require('../models/http-error');

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
const getUsers = (req,res,next) => {
    res.json({users: DUMMY_USERS})
}
//post a user
const postUsers = (req,res,next) => {
    const {
        name,
        email,
        password,
        image,
    } = req.body;
    const createUser = {
        id: uuidv4(),
        name,
        email,
        password,
        image
    };

    DUMMY_USERS.push(createUser);
    res.status(200).json({user:createUser})
}
//login with a exist account
const login = (req,res,next) => {
    const {
        email,
        password
    } = req.body;
    const identifiedUser = DUMMY_USERS.find(u => u.email === email);
    if(!identifiedUser){
        throw new httpError("could not identify user, credentials seem to be wrong",401)
    }
}

exports.getUsers = getUsers;
exports.postUsers = postUsers;
exports.login = login;