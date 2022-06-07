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
        cedula:'402-2234267-0',
        email:'juanOrtega2@gmail.com',
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
        laborDays,
        hourStart,
        hourFinish,
        location
    } = req.body;

    const createDoctor = {
        id: uuidv4(),
        name:name,
        password:password,
        cedula:cedula,
        email:email,
        specialty:specialty,
        telefono:telefono,
        laborDays:laborDays,
        hourStart:hourStart,
        hourFinish:hourFinish,
        location:location,
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
    const doctorId = req.params.dId;
    const {
        name,
        password,
        cedula,
        email,
        specialty,
        telefono,
        laborDays,
        hourStart,
        hourFinish,
        location
    } = req.body;

    const updateDoctor = {... DBA_DOCTOR.find(p => p.id === doctorId)}
    const verifyDoctorId = DBA_DOCTOR.findIndex(p => p.id === doctorId)

    if(verifyDoctorId === -1){
        throw new httpError(`we can't find this doctor`,322)
    }

    updateDoctor.name = name;
    updateDoctor.password = password;
    updateDoctor.cedula = cedula;
    updateDoctor.email = email;
    updateDoctor.specialty = specialty;
    updateDoctor.telefono = telefono;
    updateDoctor.laborDays = laborDays;
    updateDoctor.hourStart = hourStart;
    updateDoctor.hourFinish = hourFinish;
    updateDoctor.location = location;

    const ifCedulaExist = DBA_DOCTOR.filter(p => p.cedula === cedula)
    const ifEmailExist = DBA_DOCTOR.filter(p => p.email === email)

    if(ifCedulaExist > 1){
        throw new httpError(`we can't save this changes: a user with this cedula: ${cedula} is already exist`,322)
    }

    if(ifEmailExist > 1){
        throw new httpError(`we can't save this changes: a user with this email: ${email} is already exist`,322)
    }

    DBA_DOCTOR[verifyDoctorId] = updateDoctor;
    res.status(201).json({message:'doctor`s account was succesfull edited: ',updateDoctor})
}
//delete a doctor
const deleteDoctor = (req,res,next) => {
    const doctorId = req.params.dId;
    const findDoctorId = DBA_DOCTOR.find(p => p.id === doctorId)
    const updateStatusDoctor = {... DBA_DOCTOR.find(p => p.id === doctorId)}
    const verifyDoctorId = DBA_DOCTOR.findIndex(p => p.id === doctorId)

    if(!findDoctorId){
        throw new httpError('we can`t find this doctor',404)
    }

    updateStatusDoctor.status = false;
    DBA_DOCTOR[verifyDoctorId] = updateStatusDoctor;

    res.status(201).json({message:`doctor's account was succesfull off, now it status is: ${updateStatusDoctor.status}: `,updateStatusDoctor})

}

exports.getAllDoctor = getAllDoctor;
exports.getAllDoctorBySpecialty = getAllDoctorBySpecialty;
exports.postDoctor = postDoctor;
exports.patchDoctor = patchDoctor;
exports.deleteDoctor = deleteDoctor;