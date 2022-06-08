const httpError = require('../models/http-error');
const { v4: uuidv4 } = require('uuid');
const {validationResult} = require('express-validator');
//BDA temporal
let DBA_PACIENTE = [
    {
        id:'dadafgsgfsdgrgf',
        cedula:'402-2334268-0',
        email:'juanOrtega@gmail.com',
        password:'dsfdgds',
        telefono:'849-654-9687',
        name:'Juan Ortega',
        status:true
    }
]
//get all paciente
const getAllPaciente = (req,res,next)=>{
    res.json({DBA_PACIENTE})
};
//get paciente by id
const getPacienteById = (req,res,next)=>{
    const pacienteId = req.params.pId;
    const findPacienteById = DBA_PACIENTE.find(p => p.id === pacienteId);
    if(!findPacienteById){
        throw new httpError('Could not find this paciente',404)
    }
    res.status(201).json({findPacienteById});
};
//post a doctor
const postPaciente = (req,res,next)=>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        console.log(error);
        throw new httpError('Invalid inputs passed, please check your data',422);
    }
    const {
        cedula,
        email,
        password,
        telefono,
        name
    } = req.body;
    const createPaciente = {
        id: uuidv4(),
        cedula:cedula,
        email:email,
        password:password,
        telefono:telefono,
        name:name,
        status:true
    }
    
    const ifCedulaExist = DBA_PACIENTE.find(p => p.id === cedula);
    const ifEmailExist = DBA_PACIENTE.find(p => p.email === email);

    if(ifCedulaExist){
        throw new httpError(`a user with this cedula: ${cedula} is already exist`,322)
    }
    if(ifEmailExist){
        throw new httpError(`a user with this email: ${email} is already exist`,322)
    }

    DBA_PACIENTE.push(createPaciente);
    res.status(201).json({message:"this paciente was succesfull created!",createPaciente});
}
//patch a doctor
const patchPaciente = (req,res,next) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        console.log(error);
        throw new httpError('Invalid inputs passed, please check your data',422);
    }
    const {
        cedula,
        email,
        password,
        telefono,
        name
    } = req.body;
    const pacienteId = req.params.pId;

    const updatePaciente = {... DBA_PACIENTE.find(p => p.id === pacienteId)};
    const verifyPacienteId = DBA_PACIENTE.findIndex(p => p.id === pacienteId);
    const ifCedulaExist = DBA_PACIENTE.filter(p => p.cedula === cedula);
    const ifEmailExist = DBA_PACIENTE.filter(p => p.email === email);
    const findPacienteId = DBA_PACIENTE.find(p => p.id === pacienteId);

    if(!findPacienteId){
        throw new httpError(`we can't find this paciente`,404)
    }
    if(ifCedulaExist > 1){
        throw new httpError(`we can't save this changes: a user with this cedula: ${cedula} is already exist`,322)
    }
    if(ifEmailExist > 1){
        throw new httpError(`we can't save this changes: a user with this email: ${email} is already exist`,322)
    }

    updatePaciente.cedula = cedula;
    updatePaciente.email = email;
    updatePaciente.password = password;
    updatePaciente.telefono = telefono;
    updatePaciente.name = name;

    DBA_PACIENTE[verifyPacienteId] = updatePaciente;

    res.status(201).json({message:'paciente`s account was succesfull edited:',updatePaciente})
}
//delete a doctor
const deletePaciente = (req,res,next) => {
    const pacienteId = req.params.pId;
    const findPacienteId = DBA_PACIENTE.find(p => p.id === pacienteId)
    const updateStatusPaciente = {... DBA_PACIENTE.find(p => p.id === pacienteId)}
    const verifyPacienteId = DBA_PACIENTE.findIndex(p => p.id === pacienteId)

    if(!findPacienteId){
        throw new httpError('we can`t find this paciente',404)
    }

    updateStatusPaciente.status = false;
    DBA_PACIENTE[verifyPacienteId] = updateStatusPaciente;

    res.status(201).json({message:`doctor's account was succesfull off, now it status is: ${updateStatusPaciente.status}: `,updateStatusPaciente})
}

exports.getAllPaciente = getAllPaciente;
exports.getPacienteById = getPacienteById;
exports.postPaciente = postPaciente;
exports.patchPaciente = patchPaciente;
exports.deletePaciente = deletePaciente;