const httpError = require('../models/http-error');
const { v4: uuidv4 } = require('uuid');
const {validationResult} = require('express-validator');
const {todayFunction} = require('../models/today');
const EnviarExamenes = require('../models/enviarExamenes');
const Paciente = require('../models/paciente');
const Doctor = require('../models/doctor');
const { default: mongoose } = require('mongoose');
//BDA temporal
let DBA_ENVIAR_EXAMENES = [
    {
        id:'dadafgsgfsdgrgf5678',
        idPaciente:'dsfewjboforngboergo',
        idDoctor:'sigr389r23ubru',
        message:'hi hi hi hi hi',
        messageDoctor:'hohohohoho',
        docUpload:[
            'sdsadassafdfdafafsd.pdf',
            'sdsadassafdfdafafsd.pdf',
            'sdsadassafdfdafafsd.pdf',
            'sdsadassafdfdafafsd.pdf'
        ],
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
const postEnviarExamenes = async (req,res,next) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return next(new httpError('Invalid inputs passed, please check your data',422));
    }
    const {
        idPaciente,
        idDoctor,
        message,
        docUpload
    } = req.body;
    const createEnviarExamenes = new EnviarExamenes({
        idPaciente,
        idDoctor,
        message,
        docUpload,
        messageDoctor:' ',
        dateCreated:todayFunction(),
        status:true,
        link:uuidv4()
    })

    try {
        const paciente = await Paciente.findById(idPaciente);
        const doctor = await Doctor.findById(idDoctor);

        if(!paciente){
            return next(new httpError(`we can't find this paciente`,404))
        }
        if(!doctor){
            return next(new httpError(`we can't find this doctor`,404))
        }

        createEnviarExamenes.messageDoctor = `Dr. ${doctor.name} will send you a response soon`;

        const sess = await mongoose.startSession();
        sess.startTransaction();

        paciente.enviarExamenes.push(createEnviarExamenes);
        doctor.enviarExamenes.push(createEnviarExamenes);

        await createEnviarExamenes.save({session:sess});
        await doctor.save({session:sess});
        await paciente.save({session:sess});

        sess.commitTransaction();
    } catch(err){
        return next(new httpError(`somenthing went wrong ${err}`,404))
    }

    res.status(201).json({message:'These exams was already sended!!',createEnviarExamenes})
}
//patch a: enviar examenes by patience
const patchEnviarExamenesByPaciente = (req,res,next) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        console.log(error);
        throw new httpError('Invalid inputs passed, please check your data',422);
    }
    const {
        message,
        docUpload
    } = req.body;
    const enviarExamenesId = req.params.eeId;
    const pacienteId = req.params.pId;
    const verifyenviarExamenesId = DBA_ENVIAR_EXAMENES.find(p => p.id === enviarExamenesId)
    const verifyPacienteId = DBA_ENVIAR_EXAMENES.find(p => p.idPaciente === pacienteId)
    const verifyenviarExamenesIndex = DBA_ENVIAR_EXAMENES.findIndex(p => p.id === enviarExamenesId)
    const updateEnviarExamenes = {... DBA_ENVIAR_EXAMENES.find(p => p.id === enviarExamenesId)}

    if(!verifyenviarExamenesId){
        throw new httpError('Could not find any exams sended',404)
    }
    if(!verifyPacienteId){
        throw new httpError('Could not find any exams sended by you',404)
    }

    updateEnviarExamenes.message = message;
    updateEnviarExamenes.docUpload = DBA_ENVIAR_EXAMENES[verifyenviarExamenesIndex].docUpload.concat(docUpload);

    DBA_ENVIAR_EXAMENES[verifyenviarExamenesIndex] = updateEnviarExamenes;

    res.status(201).json({message:'Your exam sended was edited succesfully',updateEnviarExamenes})
}
//patch a: enviar examenes by doctor
const patchEnviarExamenesByDoctor = (req,res,next) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        console.log(error);
        throw new httpError('Invalid inputs passed, please check your data',422);
    }
    const {
        messageDoctor
    } = req.body;
    const enviarExamenesId = req.params.eeId;
    const doctorId = req.params.dId;
    const verifyenviarExamenesId = DBA_ENVIAR_EXAMENES.find(p => p.id === enviarExamenesId)
    const verifyDoctorId = DBA_ENVIAR_EXAMENES.find(p => p.idDoctor === doctorId)
    const verifyenviarExamenesIndex = DBA_ENVIAR_EXAMENES.findIndex(p => p.id === enviarExamenesId)
    const updateEnviarExamenes = {... DBA_ENVIAR_EXAMENES.find(p => p.id === enviarExamenesId)}

    if(!verifyenviarExamenesId){
        throw new httpError('Could not find any exams sended',404)
    }

    if(!verifyDoctorId){
        throw new httpError('Could not find any exams sended for you, dr',404)
    }

    updateEnviarExamenes.messageDoctor = messageDoctor;

    DBA_ENVIAR_EXAMENES[verifyenviarExamenesIndex] = updateEnviarExamenes;

    res.status(201).json({message:'Dr. , Your exam response was sended succesfully',updateEnviarExamenes})
}
//delete a: enviar examenes
const deleteEnviarExamenes = (req,res,next) => {
    const enviarExamenesId = req.params.eeId;
    const deleteEnviarExamenes = DBA_ENVIAR_EXAMENES.find(p => p.id === enviarExamenesId);

    if(!deleteEnviarExamenes){
        throw new httpError('We can`t find any exam sended',404)
    }

    deleteEnviarExamenes.status = false;

    res.status(201).json({message:'your exam sended was already canceled!',deleteEnviarExamenes})
}

exports.getAllEnviarExamenes = getAllEnviarExamenes;
exports.getEnviarExamenesById = getEnviarExamenesById;
exports.getEnviarExamenesByStatus = getEnviarExamenesByStatus;
exports.getEnviarExamenesByDoctor = getEnviarExamenesByDoctor;
exports.getEnviarExamenesByDate = getEnviarExamenesByDate;
exports.postEnviarExamenes = postEnviarExamenes;
exports.patchEnviarExamenesByPaciente = patchEnviarExamenesByPaciente;
exports.patchEnviarExamenesByDoctor = patchEnviarExamenesByDoctor;
exports.deleteEnviarExamenes = deleteEnviarExamenes;