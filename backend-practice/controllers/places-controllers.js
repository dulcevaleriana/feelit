const httpError = require('../models/http-error');
const { v4: uuidv4 } = require('uuid');
//BDA temporal
const DUMMY_PLACES = [
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

const getPlaceByUserId = (req,res,next)=>{


    const userId = req.params.uId;
    const place = DUMMY_PLACES.find(p =>{
        return p.creator === userId;
    });
    if (!place){
        return next(new httpError('could not find a place for the provided id',404))
    }
    res.json({place})
};

const postPlace = (req,res,next)=>{
    const {
        title,
        description,
        location,
        address,
        creator
    } = req.body;
    const postPlace = {
        id: uuidv4(),
        title: title,
        description: description,
        location: location,
        address: address,
        creator: creator
    };

    DUMMY_PLACES.push(postPlace);
    res.status(201).json(postPlace);
}

exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId = getPlaceByUserId;
exports.postPlace = postPlace;