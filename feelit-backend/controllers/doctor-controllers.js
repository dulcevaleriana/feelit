const httpError = require('../models/http-error');
const { v4: uuidv4 } = require('uuid');
const {validationResult} = require('express-validator');
//BDA temporal
let DBA_DOCTOR = [
    {
        id:'dadafgsgfsdgrgf',
        name:'Juan Ortega',
        password:'dsfdgds',
        cedula:'402-2334268-0',
        email:'juanOrtega@gmail.com',
        specialty:'pediatra',
        telefono:'849-654-9687',
        laborDays:{
            su:false,
            mo:true,
            tu:true,
            we:true,
            th:true,
            fr:true,
            sa:false
        },
        hourStart:'8:00',
        hourFinish:'17:00',
        location:{
            lan:23.42352,
            lng:43.35453,
            address:'calle sadas santo domingo'
        },
        status:true
    },
    {
        id:'dadafgsgfsdgrgfdasa',
        name:'Juana Perez',
        password:'dsfdgds',
        cedula:'402-2334268-0',
        email:'juanOrtega@gmail.com',
        specialty:'obstreta',
        telefono:'849-654-9687',
        laborDays:{
            su:false,
            mo:true,
            tu:true,
            we:true,
            th:true,
            fr:true,
            sa:false
        },
        hourStart:'8:00',
        hourFinish:'17:00',
        location:{
            lan:23.42352,
            lng:43.35453,
            address:'calle sadas santo domingo'
        },
        status:true
    }
]
//get all doctor
const getAllDoctor = (req,res,next)=>{
    res.json({DBA_DOCTOR})
};
//get doctor by specialty
const getAllDoctorBySpecialty = (req,res,next)=>{
    const specialtyId = req.params.sId;
    const resultGetAllDoctorBySpecialty = DBA_DOCTOR.filter(p => p.specialty === specialtyId)

    if(!resultGetAllDoctorBySpecialty){
        throw new httpError('Could not find this specialty',404)
    }

    res.json({resultGetAllDoctorBySpecialty})
};
//post a doctor
const postDoctor = (req,res,next)=>{

}
//patch a doctor
const patchDoctor = (req,res,next) => {

}
//delete a doctor
const deleteDoctor = (req,res,next) => {

}

exports.getAllDoctor = getAllDoctor;
exports.getAllDoctorBySpecialty = getAllDoctorBySpecialty;
exports.postDoctor = postDoctor;
exports.patchDoctor = patchDoctor;
exports.deleteDoctor = deleteDoctor;