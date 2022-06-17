const httpError = require('../models/http-error');
const {validationResult} = require('express-validator');
const Paciente = require('../models/paciente');

//get all paciente
const getAllPaciente = async (req,res,next)=>{
    let getAllPaciente;
    
    try{
        getAllPaciente = await Paciente.find().exec();
    } catch(error){
        return res.json({message:'Could not find any paciente'})
    }

    res.json({getAllPaciente:getAllPaciente.map(data => data.toObject({getters:true}))})
};
//get paciente by id
const getPacienteById = async (req,res,next) => {
    const pacienteId = req.params.pId;
    let getPacienteById;

    try {
        getPacienteById = await Paciente.findById(pacienteId);
    } catch(err){
        return next(new httpError('we can`t find this paciente',500));
    }

    res.json({getPacienteById:getPacienteById.toObject({getters:true})})
};
//post a doctor
const postPaciente = async (req,res,next)=>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        return next(new httpError('Invalid inputs passed, please check your data',422));
    }
    const {
        cedula,
        email,
        password,
        telefono,
        name
    } = req.body;
    const createPaciente = new Paciente({
        cedula,
        email,
        password,
        telefono,
        name,
        status:true
    })

    try {
        const ifCedulaExist = await Paciente.findOne({cedula:cedula});
        const ifEmailExist = await Paciente.findOne({email:email});

        if(ifCedulaExist){
            throw new httpError(`a user with this cedula: ${cedula} is already exist`,322)
        } 
        if(ifEmailExist){
            throw new httpError(`a user with this email: ${email} is already exist`,322)
        }

        createPaciente.save();
    } catch (err) {
        return next(new httpError(`something went wrong ${err}`,500))
    }

    res.status(201).json({message:"this paciente was succesfull created!",createPaciente:createPaciente.toObject({getters:true})});
}
//patch a doctor
const patchPaciente = async (req,res,next) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return next(new httpError('Invalid inputs passed, please check your data',422));
    }
    const {
        cedula,
        email,
        password,
        telefono,
        name
    } = req.body;
    const pacienteId = req.params.pId;
    let updatePaciente;

    try{
        updatePaciente = await Paciente.findById(pacienteId);

        if(updatePaciente.status === false){
            return next(new httpError(`We can't modify a paciente inactive`,500));
        }

        updatePaciente.cedula = cedula;
        updatePaciente.email = email;
        updatePaciente.password = password;
        updatePaciente.telefono = telefono;
        updatePaciente.name = name;
    
        await updatePaciente.save();
    } catch (err){
        return next(new httpError(`something went wrong ${err}`,500))
    }

    res.status(201).json({message:'paciente`s account was succesfull edited:',updatePaciente})
}
//delete a paciente
const deletePaciente = async (req,res,next) => {
    const pacienteId = req.params.pId;
    let setDoctorStatusFalse;

    try{
        setDoctorStatusFalse = await Paciente.findById(pacienteId);
        setDoctorStatusFalse.status = false;
        setDoctorStatusFalse.save();
    } catch(err){
        return next(new httpError(`something went wrong ${err}`,500))
    }

    res.status(201).json({message:`doctor's account was succesfull off, now it status is: ${setDoctorStatusFalse.status}: `,setDoctorStatusFalse:setDoctorStatusFalse.toObject({getters:true})})
}
//active a paciente
const activePaciente = async (req,res,next) => {
    const pacienteId = req.params.pId;
    let setDoctorStatusTrue;

    try{
        setDoctorStatusTrue = await Paciente.findById(pacienteId);
        setDoctorStatusTrue.status = true;
        setDoctorStatusTrue.save();
    } catch(err){
        return next(new httpError(`something went wrong ${err}`,500))
    }

    res.status(201).json({message:`doctor's account was succesfull off, now it status is: ${setDoctorStatusTrue.status}: `,setDoctorStatusTrue:setDoctorStatusTrue.toObject({getters:true})})
}
//login paciente
const loginPaciente = async (req,res,next) => {
    const {
        email,
        password,
    } = req.body;
    let loginPaciente;

    try {
        loginPaciente = await Paciente.findOne({email:email})

        if(loginPaciente && loginPaciente.password !== password){
            return next(new httpError(`your password are wrong, try again`,404))
        }
        if(!loginPaciente){
            return next(new httpError(`we can't find a paciente with this email`,404))
        }

    } catch(err){
        return next(new httpError(`something went wrong ${err}`,500))
    }

    res.json({message:`Welcome ${loginPaciente.name}, you're login now`})
}

exports.getAllPaciente = getAllPaciente;
exports.getPacienteById = getPacienteById;
exports.postPaciente = postPaciente;
exports.patchPaciente = patchPaciente;
exports.deletePaciente = deletePaciente;
exports.loginPaciente = loginPaciente;
exports.activePaciente = activePaciente;