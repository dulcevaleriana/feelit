const httpError = require('../models/http-error');
const { v4: uuidv4 } = require('uuid');
const {validationResult} = require('express-validator');
const Doctor = require('../models/doctor');
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
    }
]
//get all doctor
const getAllDoctor = (req,res,next)=>{
    res.json({DBA_DOCTOR})
};
//get doctor by id
const getDoctorById = (req,res,next)=>{
    const specialtyId = req.params.dId;
    const resultGetDoctorById = DBA_DOCTOR.filter(p => p.id === specialtyId)

    if(!resultGetDoctorById){
        throw new httpError('Could not find this specialty',404)
    }

    res.json({resultGetDoctorById})
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
const postDoctor = async (req,res,next)=>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        return next(new httpError('Invalid inputs passed, please check your data',422));
    }
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

    const createDoctor = new Doctor({
        name,
        password,
        cedula,
        email,
        specialty,
        telefono,
        laborDays,
        hourStart,
        hourFinish,
        location,
        status:true  
    })

    try {
        await createDoctor.save();
    } catch(err) {
        return next(new httpError(`could not create this doctor account, try again please ${err}`,500))
    }

    res.json({message:'this doctor was created succesfully!!',createDoctor: createDoctor.toObject({getters:true})})
}
//patch a doctor
const patchDoctor = async (req,res,next) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return next(new httpError('Invalid inputs passed, please check your data',422));
    }
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
    let updateDoctor;

    try {
        updateDoctor = await Doctor.findById(doctorId);

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
        
        await updateDoctor.save();
    } catch (err) {
        return next(new httpError(`Somethig went wrong, please try again 2 ${err}`,500));
    }

    res.status(201).json({message:'doctor`s account was succesfull edited: ',updateDoctor:updateDoctor.toObject({getters:true})})
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
exports.getDoctorById = getDoctorById;
exports.getAllDoctorBySpecialty = getAllDoctorBySpecialty;
exports.postDoctor = postDoctor;
exports.patchDoctor = patchDoctor;
exports.deleteDoctor = deleteDoctor;