const httpError = require('../models/http-error');
const { v4: uuidv4 } = require('uuid');
const {validationResult} = require('express-validator');
const Specialty = require('../models/specialty');
//BDA temporal
let DBA_SPECIALTY = [
    {
        id:'dadafgsgfsdgrgf5678',
        specialtyName:'Pediatry',
        status:true
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
const postSpecialty = async (req,res,next)=>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        console.log(error);
        throw new httpError('Invalid inputs passed, please check your data',422);
    }
    const {specialtyName} = req.body;
    const createSpecialty = new Specialty({
        specialtyName,
        status:true
    })
    let verifyNotDuplicatedName;

    try {
        verifyNotDuplicatedName = await Specialty.find({specialtyName:specialtyName});
        if(verifyNotDuplicatedName.length === 1){
            throw new httpError('This specialty was already exist',404)
        }
        await createSpecialty.save();
    } catch(err){
        return next(new httpError(`somenthing went wrong ${err}`,404))
    }

    res.status(201).json({message:'Your specialty was create succesfully',createSpecialty});
}
//patch a: specialty
const patchSpecialty = (req,res,next) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        console.log(error);
        throw new httpError('Invalid inputs passed, please check your data',422);
    }
    const {specialtyName} = req.body;
    const specialtyId = req.params.sId;

    const verifyspecialtyId = DBA_SPECIALTY.find(p => p.id === specialtyId);
    const verifyNotDuplicatedName = DBA_SPECIALTY.find(p => p.specialtyName === specialtyName);
    const verifyspecialtyIndex = DBA_SPECIALTY.findIndex(p => p.id === specialtyId);
    const updateSpecialty = {... DBA_SPECIALTY.find(p => p.id === specialtyId)};

    if(!verifyspecialtyId){
        throw new httpError('Could not find any specialty',404)
    }
    if(verifyNotDuplicatedName){
        throw new httpError('This specialty was already exist',404)
    }

    updateSpecialty.specialtyName = specialtyName;
    DBA_SPECIALTY[verifyspecialtyIndex] = updateSpecialty;

    res.status(201).json({message:'Your specialty was modify succesfully',updateSpecialty});
}
//delete a: specialty
const deleteSpecialty = (req,res,next) => {
    const specialtyId = req.params.sId;
    const deleteSpecialtyId = DBA_SPECIALTY.find(p => p.id === specialtyId);

    if(!deleteSpecialtyId){
        throw new httpError('Could not find any specialty',404)
    }

    deleteSpecialtyId.status = false;
    res.status(201).json({message:'your specialty was already canceled!',deleteSpecialtyId})
}

exports.getAllSpecialty = getAllSpecialty;
exports.getSpecialtyById = getSpecialtyById;
exports.postSpecialty = postSpecialty;
exports.patchSpecialty = patchSpecialty;
exports.deleteSpecialty = deleteSpecialty;