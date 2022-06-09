const httpError = require('../models/http-error');
const { v4: uuidv4 } = require('uuid');
const {validationResult} = require('express-validator');
const {todayFunction} = require('../models/today')
//BDA temporal
let DBA_SPECIALTY = [
    {
        id:'dadafgsgfsdgrgf5678',
        specialtyName:'Pediatry'
    }
]
//get all specialty
const getAllSpecialty = (req,res,next)=>{
    res.json({DBA_SPECIALTY})
};
//get specialty by id
const getSpecialtyById = (req,res,next)=>{
    const specialtyId = req.params.sId;
    const getSpecialtyId = DBA_SPECIALTY.find(p => p.id === specialtyId);

    if(!getSpecialtyId){
        throw new httpError('Could not find any specialty',404)
    }

    res.status(201).json({getSpecialtyId})
};
//post a: specialty
const postSpecialty = (req,res,next)=>{

}
//patch a: specialty by patience
const patchSpecialty = (req,res,next) => {

}
//delete a: specialty
const deleteSpecialty = (req,res,next) => {

}

exports.getAllSpecialty = getAllSpecialty;
exports.getSpecialtyById = getSpecialtyById;
exports.postSpecialty = postSpecialty;
exports.patchSpecialty = patchSpecialty;
exports.deleteSpecialty = deleteSpecialty;