const httpError = require('../models/http-error');
const { v4: uuidv4 } = require('uuid');
const {validationResult} = require('express-validator');
const {todayFunction} = require('../models/today')
//BDA temporal
let DBA_ENVIAR_EXAMENES = [
    {
        id:'dadafgsgfsdgrgf5678',
        idPaciente:'dsfewjboforngboergo',
        idDoctor:'sigr389r23ubru',
        message:'hi hi hi hi hi',
        messageDoctor:'hohohohoho',
        docUpload:'sdsadassafdfdafafsd.pdf',
        dateCreated:todayFunction(),
        status:true,
        link:'sfnsdnosgohnreignerognvfdng'
    }
]
//get all enviar examenes
const getAllEnviarExamenes = (req,res,next)=>{
    res.json({DBA_ENVIAR_EXAMENES});
};
//get enviar examenes by id
const getEnviarExamenesById = (req,res,next)=>{

};
//get enviar examenes by status
const getEnviarExamenesByStatus = (req,res,next) => {

}
//get enviar examenes by doctor
const getEnviarExamenesByDoctor = (req,res,next) => {

}
//get enviar examenes by date
const getEnviarExamenesByDate = (req,res,next) => {

}
//post a: enviar examenes
const postEnviarExamenes = (req,res,next)=>{

}
//patch a: enviar examenes
const patchEnviarExamenes = (req,res,next) => {

}
//delete a: enviar examenes
const deleteEnviarExamenes = (req,res,next) => {

}

exports.getAllEnviarExamenes = getAllEnviarExamenes;
exports.getEnviarExamenesById = getEnviarExamenesById;
exports.getEnviarExamenesByStatus = getEnviarExamenesByStatus;
exports.getEnviarExamenesByDoctor = getEnviarExamenesByDoctor;
exports.getEnviarExamenesByDate = getEnviarExamenesByDate;
exports.postEnviarExamenes = postEnviarExamenes;
exports.patchEnviarExamenes = patchEnviarExamenes;
exports.deleteEnviarExamenes = deleteEnviarExamenes;