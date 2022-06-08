const httpError = require('../models/http-error');
const { v4: uuidv4 } = require('uuid');
const {validationResult} = require('express-validator');
//BDA temporal
let DBA_AGENDAR_CITA = [
    {
        id:'dadafgsgfsdgrgf5678',
        idPaciente:'dsfewjboforngboergo',
        idDoctor:'sigr389r23ubru',
        date:'6-8-2022',
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
    const agendarCitaId = req.params.acId;
    const getAgendarCitaId = DBA_AGENDAR_CITA.find(p => p.id === agendarCitaId);

    if(!getAgendarCitaId){
        throw new httpError('Could not find this date',404)
    }

    res.status(201).json({getAgendarCitaId})
};
//get agendar cita by status
const getAgendarCitaByStatus = (req,res,next) => {
    const agendarCitaStatus = req.params.ToF === 'true' ? true : false;
    const getAgendarCitaStatus = DBA_AGENDAR_CITA.filter(p => p.status === agendarCitaStatus);

    if(getAgendarCitaStatus < 1){
        throw new httpError(`Could not find dates with status ${agendarCitaStatus}`,404)
    }

    res.status(201).json({getAgendarCitaStatus,agendarCitaStatus})
}
//get agendar cita by doctor
const getAgendarCitaByDoctor = (req,res,next) => {
    const doctorId = req.params.dId;
    const getAgendarCitaDoctor = DBA_AGENDAR_CITA.filter(p => p.idDoctor === doctorId);

    if(getAgendarCitaDoctor < 1){
        throw new httpError(`Could not find any dates with this doctor`,404)
    }

    res.status(201).json({getAgendarCitaDoctor})
}
//get agendar cita by date
const getAgendarCitaByDate = (req,res,next) => {
    const agendarCitaDate = req.params.date;
    const getAgendarCitaDate = DBA_AGENDAR_CITA.filter(p => p.date === agendarCitaDate)

    if(getAgendarCitaDate < 1){
        throw new httpError(`Could not find any with this date`,404)
    }

    res.status(201).json({getAgendarCitaDate})
}
//post a: agendar cita
const postAgendarCita = (req,res,next)=>{
    const {
        idPaciente,
        idDoctor,
        date,
        time,
        message, 
    } = req.body;
    const createAgendarCita = {
        id: uuidv4(),
        idPaciente: idPaciente,
        idDoctor: idDoctor,
        date: date,
        time: time,
        status: true,
        message: message,
        link: uuidv4()
    }

    const pacienteDates = [... DBA_AGENDAR_CITA.filter(p => p.idPaciente === idPaciente)];
    const doctorDates = [... DBA_AGENDAR_CITA.filter(p => p.idDoctor === idDoctor)];

    const verifyPacienteDates = pacienteDates.find(d => d.date === date);
    const verifyDoctorDates = doctorDates.find(d => d.date === date);

    if(verifyPacienteDates || verifyDoctorDates){
        const verifyPacienteTime = pacienteDates.find(d => d.time === time)
        const verifyDoctorTime = doctorDates.find(d => d.time === time)

        if(verifyPacienteTime || verifyDoctorTime){
            throw new httpError(`We can't save this date with the same date and hour`,404)
        }
    }

    DBA_AGENDAR_CITA.push(createAgendarCita)

    res.status(201).json({message:'your date was already agended!',createAgendarCita})
}
//patch a: agendar cita
const patchAgendarCita = (req,res,next) => {
    const {
        idPaciente,
        idDoctor,
        date,
        time,
        message, 
    } = req.body;
    const agendarCitaId = req.params.acId;
    const verifyAgendaCita = DBA_AGENDAR_CITA.find(p => p.id === agendarCitaId);
    const updateAgendarCita = {... DBA_AGENDAR_CITA.find(p => p.id === agendarCitaId)};
    const verifyIndexAC = DBA_AGENDAR_CITA.findIndex(p => p.id === agendarCitaId);

    const pacienteDates = [... DBA_AGENDAR_CITA.filter(p => p.idPaciente === idPaciente)];
    const doctorDates = [... DBA_AGENDAR_CITA.filter(p => p.idDoctor === idDoctor)];
    const verifyPacienteDates = pacienteDates.find(d => d.date === date);
    const verifyDoctorDates = doctorDates.find(d => d.date === date);

    if(verifyPacienteDates || verifyDoctorDates){
        const verifyPacienteTime = pacienteDates.find(d => d.time === time)
        const verifyDoctorTime = doctorDates.find(d => d.time === time)

        if(verifyPacienteTime || verifyDoctorTime){
            throw new httpError(`We can't save this date with the same date and hour`,404)
        }
    }
    
    if(!verifyAgendaCita){
        throw new httpError('We can`t find this date',404)
    }

    updateAgendarCita.date = date;
    updateAgendarCita.time = time;
    updateAgendarCita.message = message;

    DBA_AGENDAR_CITA[verifyIndexAC] = updateAgendarCita;

    res.status(201).json({message:'your date was already modified!',updateAgendarCita})
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