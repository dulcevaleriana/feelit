const httpError = require('../models/http-error');
const { v4: uuidv4 } = require('uuid');
const {validationResult} = require('express-validator');
const {todayFunction} = require('../models/today')
//BDA temporal
let DBA_CONSULTA_RAPIDA = [
    {
        id:'dadafgsgfsdgrgf5678',
        idPaciente:'dsfewjboforngboergo',
        idDoctor:'sigr389r23ubru',
        time:'11:00',
        message:'hi hi hi hi hi',
        dateCreated:todayFunction(),
        status:true,
        link:'sfnsdnosgohnreignerognvfdng'
    }
]
//get all consultas rapidas
const getAllconsultasRapidas = (req,res,next)=>{
    res.json({DBA_CONSULTA_RAPIDA})
};
//get consultas rapidas by id
const getconsultasRapidasById = (req,res,next)=>{

};
//get consultas rapidas by status
const getconsultasRapidasByStatus = (req,res,next) => {

}
//get consultas rapidas by doctor
const getconsultasRapidasByDoctor = (req,res,next) => {

}
//get consultas rapidas by date
const getconsultasRapidasByDate = (req,res,next) => {

}
//post a: consultas rapidas
const postconsultasRapidas = (req,res,next)=>{

}
//patch a: consultas rapidas
const patchconsultasRapidas = (req,res,next) => {

}
//delete a: consultas rapidas
const deleteconsultasRapidas = (req,res,next) => {

}

exports.getAllconsultasRapidas = getAllconsultasRapidas;
exports.getconsultasRapidasById = getconsultasRapidasById;
exports.getconsultasRapidasByStatus = getconsultasRapidasByStatus;
exports.getconsultasRapidasByDoctor = getconsultasRapidasByDoctor;
exports.getconsultasRapidasByDate = getconsultasRapidasByDate;
exports.postconsultasRapidas = postconsultasRapidas;
exports.patchconsultasRapidas = patchconsultasRapidas;
exports.deleteconsultasRapidas = deleteconsultasRapidas;