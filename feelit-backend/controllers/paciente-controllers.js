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

};
//post a doctor
const postPaciente = (req,res,next)=>{

}
//patch a doctor
const patchPaciente = (req,res,next) => {

}
//delete a doctor
const deletePaciente = (req,res,next) => {

}

exports.getAllPaciente = getAllPaciente;
exports.getPacienteById = getPacienteById;
exports.postPaciente = postPaciente;
exports.patchPaciente = patchPaciente;
exports.deletePaciente = deletePaciente;