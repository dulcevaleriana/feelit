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
    const enviarExamenesId = req.params.eeId;
    const getEnviarExamenesId = DBA_ENVIAR_EXAMENES.find(p => p.id === enviarExamenesId)

    if(!getEnviarExamenesId){
        throw new httpError('could not find any examn sended',404)
    }

    res.status(201).json({getEnviarExamenesId})
};
//get enviar examenes by status
const getEnviarExamenesByStatus = (req,res,next) => {
    const enviarExamenesStatus = req.params.ToF === 'true' ? true : false;
    const getEnviarExamenesStatus = DBA_ENVIAR_EXAMENES.filter(p => p.status === enviarExamenesStatus);

    if(getEnviarExamenesStatus < 1){
        throw new httpError(`could not find any examn sended with status ${enviarExamenesStatus}`,404)
    }

    res.status(201).json({getEnviarExamenesStatus});
}
//get enviar examenes by doctor
const getEnviarExamenesByDoctor = (req,res,next) => {
    const doctorId = req.params.dId;
    const getEnviarExamenesDoctor = DBA_ENVIAR_EXAMENES.filter(p => p.idDoctor === doctorId);

    if(getEnviarExamenesDoctor < 1){
        throw new httpError(`could not find any examn sended with this doctor`,404)
    }

    res.status(201).json({getEnviarExamenesDoctor})
}
//get enviar examenes by date
const getEnviarExamenesByDate = (req,res,next) => {
    const consultasRapidasDate = req.params.date;
    const getEnviarExamenesDate = DBA_ENVIAR_EXAMENES.filter(p => p.dateCreated === consultasRapidasDate)

    if(getEnviarExamenesDate < 1){
        throw new httpError(`Could not find any with this date`,404)
    }

    res.status(201).json({getEnviarExamenesDate})
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