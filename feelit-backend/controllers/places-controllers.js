const httpError = require('../models/http-error');
const { v4: uuidv4 } = require('uuid');
const {validationResult} = require('express-validator');
const Place = require('../models/place');
//BDA temporal
let DUMMY_PLACES = [
    {
        id: 'pl',
        title: 'Empire State Building',
        description: 'description description description description',
        location:{
            lat: 40.7484474,
            lng: -73.9871516
        },
        address: 'address address address address',
        creator: 'url'
    }
]
//get all element with principal id
const getPlaceById = (req,res,next)=>{
    const placeId = req.params.pId;
    const place = DUMMY_PLACES.find(p => {
        return p.id === placeId;
    });
    if (!place){
        throw new httpError('could not find a place for the provided id',404);
    }
    res.json({place});
};
//get all element with the same user id
const getPlacesByUserId = (req,res,next)=>{
    const userId = req.params.uId;
    const places = DUMMY_PLACES.filter(p =>{
        return p.creator === userId;
    });
    if (!places || getPlacesByUserId.length === 0){
        return next(new httpError('could not find a place for the provided id',404))
    }
    res.json({places})
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

    try{
        await postPlace.save();
    } catch (err) {
        const error = new httpError('post place failed, please try again',500);
        return next(error);
    }

    res.status(201).json({message:'your place was posted succesfully!',postPlace});
}
//update a place
const patchPlace = (req,res,next) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        throw new httpError('Invalid inputs passed, please check your data',422);
    }
    const {
        title,
        description,
        location,
        address
        // creator we don't need to chance creator
    } = req.body;
    const placeId = req.params.pId;

    const updatePlace = {... DUMMY_PLACES.find(p=> p.id === placeId)};
    const placeIndex = DUMMY_PLACES.findIndex(p=> p.id === placeId);

    updatePlace.title = title;
    updatePlace.description = description;
    updatePlace.location = location;
    updatePlace.address = address;

    DUMMY_PLACES[placeIndex] = updatePlace;

    res.status(201).json({place: updatePlace});
}
//delete a place
const deletePlace = (req,res,next) => {
    const placeId = req.params.pId;
    if(!DUMMY_PLACES.find(p => p.id === placeId)){
        throw new httpError('Could not find a place for that id',404)
    }
    DUMMY_PLACES = DUMMY_PLACES.filter(p => p.id !== placeId);

    res.status(200).json({message: 'deleted place'})
}

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.postPlace = postPlace;
exports.patchPlace = patchPlace;
exports.deletePlace = deletePlace;