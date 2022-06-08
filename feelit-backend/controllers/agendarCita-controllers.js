const httpError = require('../models/http-error');
const { v4: uuidv4 } = require('uuid');
const {validationResult} = require('express-validator');
//BDA temporal
let DBA_AGENDAR_CITA = [
    {
        id:'dadafgsgfsdgrgf5678',
        idPaciente:'dsfewjboforngboergo',
        idDoctor:'sigr389r23ubru',
        date:'6/8/2022',
        time:'11:00',
        status:true,
        message:'hi hi hi hi hi',
        link:'sfnsdnosgohnreignerognvfdng'
    }
]
//get all agendar cita
const getAllAgendarCita = (req,res,next)=>{
    res.json({DBA_AGENDAR_CITA})
};
//get agendar cita by id
const getAgendarCitaById = (req,res,next)=>{

};
//get agendar cita by status
const getAgendarCitaByStatus = (req,res,next) => {

}
//get agendar cita by doctor
const getAgendarCitaByDoctor = (req,res,next) => {

}
//get agendar cita by date
const getAgendarCitaByDate = (req,res,next) => {

}
//post a: agendar cita
const postAgendarCita = (req,res,next)=>{

}
//patch a: agendar cita
const patchAgendarCita = (req,res,next) => {

}
//delete a: agendar cita
const deleteAgendarCita = (req,res,next) => {

}

exports.getAllAgendarCita = getAllAgendarCita;
exports.getAgendarCitaById = getAgendarCitaById;
exports.getAgendarCitaByStatus = getAgendarCitaByStatus;
exports.getAgendarCitaByDoctor = getAgendarCitaByDoctor;
exports.getAgendarCitaByDate = getAgendarCitaByDate;
exports.postAgendarCita = postAgendarCita;
exports.patchAgendarCita = patchAgendarCita;
exports.deleteAgendarCita = deleteAgendarCita;