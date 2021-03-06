const httpError = require('../models/http-error');
const {validationResult} = require('express-validator');
const Doctor = require('../models/doctor');

//get all doctor
const getAllDoctor = async (req,res,next)=>{
    let getAllDoctor;

    try {
        getAllDoctor = await Doctor.find().exec();
    } catch(err) {
        return next(new httpError(`Something went wrong ${err}`,404))
    }

    res.json({getAllDoctor:getAllDoctor.map(data => data.toObject({getters:true}))})
};
//get doctor by id
const getDoctorById = async (req,res,next)=>{
    const doctorId = req.params.dId;
    let getDoctorById;

    try {
        getDoctorById = await Doctor.findById(doctorId);
    } catch(err) {
        return next(new httpError(`Something went wrong ${err}`,404))
    }

    res.json({getDoctorById:getDoctorById.toObject({getters:true})})
};
//get doctor by specialty
const getAllDoctorBySpecialty = async (req,res,next)=>{
    const specialty = req.params.specialityName;
    let getAllDoctorBySpecialty;

    try {
        getAllDoctorBySpecialty = await Doctor.find({specialty:specialty});
        if(getAllDoctorBySpecialty.length === 0){
            return next(new httpError(`Could not find any doctor with this specialty`,404))
        }
    } catch(err){
        return next(new httpError(`Could not find this specialty ${err}`,404))
    }

    res.json({getAllDoctorBySpecialty:getAllDoctorBySpecialty.map(data => data.toObject({getters:true}))})
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
        const ifCedulaExist = await Doctor.findOne({cedula:cedula});
        const ifEmailExist = await Doctor.findOne({email:email});

        if(ifCedulaExist){
            throw new httpError(`a user with this cedula: ${cedula} is already exist`,322)
        } 
        if(ifEmailExist){
            throw new httpError(`a user with this email: ${email} is already exist`,322)
        }

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

        if(updateDoctor.status === false){
            return next(new httpError(`We can't modify a doctor inactive`,500));
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
        
        await updateDoctor.save();
    } catch (err) {
        return next(new httpError(`Somethig went wrong, please try again 2 ${err}`,500));
    }

    res.status(201).json({message:'doctor`s account was succesfull edited: ',updateDoctor:updateDoctor.toObject({getters:true})})
}
//delete a doctor
const deleteDoctor = async (req,res,next) => {
    const doctorId = req.params.dId;
    let setDoctorStatusFalse;
    try {
        setDoctorStatusFalse = await Doctor.findById(doctorId);

        setDoctorStatusFalse.status = false;

        await setDoctorStatusFalse.save();
    } catch(err){
        return next(new httpError(`we can't find this doctor ${err}`,404))
    }

    res.status(201).json({message:`doctor's account was succesfull off, now it status is: ${setDoctorStatusFalse.status}: `,setDoctorStatusFalse:setDoctorStatusFalse.toObject({getters:true})})
}

//active a doctor
const activeDoctor = async (req,res,next) => {
    const doctorId = req.params.dId;
    let setDoctorStatusTrue;
    try {
        setDoctorStatusTrue = await Doctor.findById(doctorId);

        setDoctorStatusTrue.status = true;

        await setDoctorStatusTrue.save();
    } catch(err){
        return next(new httpError(`we can't find this doctor ${err}`,404))
    }

    res.status(201).json({message:`doctor's account was succesfull off, now it status is: ${setDoctorStatusTrue.status}: `,setDoctorStatusTrue:setDoctorStatusTrue.toObject({getters:true})})
}
//login doctor
const loginDoctor = async (req,res,next) => {
    const {
        password,
        email,
    } = req.body;
    let loginDoctor;

    try{
        loginDoctor = await Doctor.findOne({email:email});

        if(!loginDoctor){
            return next(new httpError(`we can't find your account`,404))
        }
        if(loginDoctor && loginDoctor.password !== password){
            return next(new httpError(`you wrote your password wrong, try again`,404))
        }

    } catch (err){
        return next(new httpError(`something went wrong ${err}`,404))
    }

    res.json({message:`Welcome ${loginDoctor.name} you're logging`})
}

exports.getAllDoctor = getAllDoctor;
exports.getDoctorById = getDoctorById;
exports.getAllDoctorBySpecialty = getAllDoctorBySpecialty;
exports.postDoctor = postDoctor;
exports.patchDoctor = patchDoctor;
exports.deleteDoctor = deleteDoctor;
exports.activeDoctor = activeDoctor;
exports.loginDoctor = loginDoctor;