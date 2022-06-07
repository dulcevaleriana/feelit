const httpError = require('../models/http-error');
const { v4: uuidv4 } = require('uuid');
const {validationResult} = require('express-validator');
//BDA temporal
let DBA_PACIENTE = [
    {
        id:'dadafgsgfsdgrgf',
    }
]
//get all paciente
const getAllPaciente = (req,res,next)=>{

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