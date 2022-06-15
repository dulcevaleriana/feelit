const httpError = require('../models/http-error');
const {validationResult} = require('express-validator');
const Place = require('../models/place');
const User = require('../models/user');
const { default: mongoose } = require('mongoose');

//get all element with principal id
const getPlaceById = async (req,res,next)=>{
    const placeId = req.params.pId;
    let place;

    try{
        place = await Place.findById(placeId);
    } catch (err) {
        return next(new httpError('something went wrong',500));
    }

    if(!place){
        return next(new httpError('could not find a place for the provided id',500));
    }

    res.json({place: place.toObject( {getters:true} )});
};
//get all element with the same user id
const getPlacesByUserId = async (req,res,next)=>{
    const userId = req.params.uId;
    let place;

    try{
        place = await Place.find({creator:userId});
    } catch (err) {
        return next(new httpError('something went wrong',500));
    }

    if (!place || place.length === 0){
        return next(new httpError('could not find a place created by this user',404))
    }
    res.json({place:place.map(place => place.toObject({getters:true}))})
};
//post a place
const postPlace = async (req,res,next)=>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        console.log(error);
        throw new httpError('Invalid inputs passed, please check your data',422);
    }
    const {
        title,
        description,
        location,
        address,
        image,
        creator
    } = req.body;
    const postPlace = new Place({
        title,
        description,
        location,
        address,
        image:'https://www.industrialempathy.com/img/remote/ZiClJf-1920w.jpg',
        creator
    })
    let user;

    try{
        user = await User.findById(creator);
        if(!user){
            return next(new httpError('could not find this user for provide id, please try again',500));
        }
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await postPlace.save({session:sess});
        user.places.push(postPlace);
        await user.save({session:sess});
        sess.commitTransaction();
    } catch (err) {
        return next(new httpError('post place failed, please try again',500));
    }

    res.status(201).json({message:'your place was posted succesfully!',postPlace});
}
//update a place
const patchPlace = async (req,res,next) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        throw new httpError('Invalid inputs passed, please check your data',422);
    }
    const {
        title,
        description,
        location,
        address,
        image
    } = req.body;
    const placeId = req.params.pId;
    let updatePlace;

    try {
        updatePlace = await Place.findById(placeId);
    } catch (err) {
        return next(new httpError('something went wrong',500));
    }

    updatePlace.title = title;
    updatePlace.description = description;
    updatePlace.location = location;
    updatePlace.address = address;
    updatePlace.image = image;

    try {
        await updatePlace.save();
    } catch (err) {
        return next(new httpError('We couldn`t update this place, try again',500))
    }

    res.status(201).json({place: updatePlace.toObject({getters:true})});
}
//delete a place
const deletePlace = async (req,res,next) => {
    const placeId = req.params.pId;
    let placeById;

    try {
        placeById = await Place.findById(placeId).populate();
        placeById.remove();
    } catch (err) {
        return next(new httpError('Could not find this place',500))
    }

    res.status(200).json({message: 'deleted place'})
}

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.postPlace = postPlace;
exports.patchPlace = patchPlace;
exports.deletePlace = deletePlace;