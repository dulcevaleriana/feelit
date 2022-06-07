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
    const {
        name,
        password,
        cedula,
        email,
        specialty,
        telefono,
        laborDays:{
            su,
            mo,
            tu,
            we,
            th,
            fr,
            sa
        },
        hourStart,
        hourFinish,
        location:{
            lan,
            lng,
            address
        }
    } = req.body;

    const createDoctor = {
        id: uuidv4(),
        name:name,
        password:password,
        cedula:cedula,
        email:email,
        specialty:specialty,
        telefono:telefono,
        laborDays:{
            su:su,
            mo:mo,
            tu:tu,
            we:we,
            th:th,
            fr:fr,
            sa:sa
        },
        hourStart:hourStart,
        hourFinish:hourFinish,
        location:{
            lan:lan,
            lng:lng,
            address:address
        },
        status:true
    }

    const ifCedulaExist = DBA_DOCTOR.find(p => p.cedula === cedula)
    const ifEmailExist = DBA_DOCTOR.find(p => p.email === email)

    if(ifCedulaExist){
        throw new httpError(`a user with this cedula: ${cedula} is already exist`,322)
    }

    if(ifEmailExist){
        throw new httpError(`a user with this email: ${email} is already exist`,322)
    }

    DBA_DOCTOR.push(createDoctor);

    res.json({message:'this doctor was created succesfully!!',createDoctor})
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