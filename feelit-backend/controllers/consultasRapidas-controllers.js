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
    const consultaFlashId = req.params.crId;
    const getConsultasRapidasId = DBA_CONSULTA_RAPIDA.find(p => p.id === consultaFlashId)

    if(!getConsultasRapidasId){
        throw new httpError('could not find any flash consult',404)
    }

    res.status(201).json({getConsultasRapidasId})
};
//get consultas rapidas by status
const getconsultasRapidasByStatus = (req,res,next) => {
    const consultaFlashStatus = req.params.ToF === 'true' ? true : false;
    const getConsultasRapidasStatus = DBA_CONSULTA_RAPIDA.filter(p => p.status === consultaFlashStatus);

    if(getConsultasRapidasStatus < 1){
        throw new httpError(`could not find any flash consult with status ${consultaFlashStatus}`,404)
    }

    res.status(201).json({getConsultasRapidasStatus});
}
//get consultas rapidas by doctor
const getconsultasRapidasByDoctor = (req,res,next) => {
    const doctorId = req.params.dId;
    const getConsultasRapidasDoctor = DBA_CONSULTA_RAPIDA.filter(p => p.idDoctor === doctorId);

    if(getConsultasRapidasDoctor < 1){
        throw new httpError(`could not find any flash consult with this doctor`,404)
    }

    res.status(201).json({getConsultasRapidasDoctor})
}
//get consultas rapidas by date
const getconsultasRapidasByDate = (req,res,next) => {
    const consultasRapidasDate = req.params.date;
    const getConsultasRapidasDate = DBA_CONSULTA_RAPIDA.filter(p => p.dateCreated === consultasRapidasDate)

    if(getConsultasRapidasDate < 1){
        throw new httpError(`Could not find any with this date`,404)
    }

    res.status(201).json({getConsultasRapidasDate})
}
//post a: consultas rapidas
const postconsultasRapidas = (req,res,next)=>{
    const {
        idPaciente,
        idDoctor,
        time,
        message,
    } = req.body;
    const createConsultasRapidas = {
        id:uuidv4(),
        idPaciente:idPaciente,
        idDoctor:idDoctor,
        time:time,
        message:message,
        dateCreated:todayFunction(),
        status:true,
        link:uuidv4()
    }

    const pacienteDates = [... DBA_CONSULTA_RAPIDA.filter(p => p.idPaciente === idPaciente)];
    const doctorDates = [... DBA_CONSULTA_RAPIDA.filter(p => p.idDoctor === idDoctor)];
    const verifyPacienteTime = pacienteDates.find(d => d.time === time)
    const verifyDoctorTime = doctorDates.find(d => d.time === time)

    if(verifyPacienteTime || verifyDoctorTime){
        throw new httpError(`We can't save this date with the same hour`,404)
    }

    DBA_CONSULTA_RAPIDA.push(createConsultasRapidas)
    res.status(201).json({message:'This flash date was already created!!',createConsultasRapidas})
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