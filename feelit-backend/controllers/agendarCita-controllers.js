const httpError = require('../models/http-error');
const { v4: uuidv4 } = require('uuid');
const {validationResult} = require('express-validator');
const AgendarCita = require('../models/agendarCita');
const Doctor = require('../models/doctor');
const Paciente = require('../models/paciente');
const { default: mongoose } = require('mongoose');
//BDA temporal
let DBA_AGENDAR_CITA = [
    {
        id:'dadafgsgfsdgrgf5678',
        idPaciente:'dsfewjboforngboergo',
        idDoctor:'sigr389r23ubru',
        date:'2022-6-12',
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
const postAgendarCita = async (req,res,next) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return next(new httpError('Invalid inputs passed, please check your data',422))
    }
    const {
        idPaciente,
        idDoctor,
        date,
        time,
        message, 
    } = req.body;
    const createAgendarCita = new AgendarCita({
        idPaciente,
        idDoctor,
        date,
        time,
        status: true,
        message,
        link: uuidv4()
    })

    try {
        const paciente = await Paciente.findById(idPaciente);
        const doctor = await Doctor.findById(idDoctor);
        const pacienteDates = await AgendarCita.find({idPaciente:idPaciente});
        const doctorDates = await AgendarCita.find({idDoctor:idDoctor});
        const verifyPacienteDates = pacienteDates.find(d => d.date === date);
        const verifyDoctorDates = doctorDates.find(d => d.date === date);

        if(!paciente){
            return next(new httpError(`we can't find this paciente`,404))
        }
        if(!doctor){
            return next(new httpError(`we can't find this doctor`,404))
        }
        if(verifyPacienteDates || verifyDoctorDates){
            const verifyPacienteTime = pacienteDates.find(d => d.time === time)
            const verifyDoctorTime = doctorDates.find(d => d.time === time)
    
            if(verifyPacienteTime || verifyDoctorTime){
                throw new httpError(`We can't save this date with the same date and hour`,404)
            }
        }

        const sess = await mongoose.startSession();
        sess.startTransaction();

        await createAgendarCita.save({session:sess});

        doctor.agendarCita.push(createAgendarCita);
        paciente.agendarCita.push(createAgendarCita);

        doctor.save({session:sess});
        paciente.save({session:sess});

        sess.commitTransaction();

    } catch(err){
        return next(new httpError(`something went wrong ${err}`,422))
    }

    res.status(201).json({message:'your date was already agended!',createAgendarCita})
}
//patch a: agendar cita
const patchAgendarCita = async (req,res,next) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return next(new httpError('Invalid inputs passed, please check your data',422));
    }
    const {
        date,
        time,
        message, 
    } = req.body;
    const agendarCitaId = req.params.acId;
    let updateAgendarCita;

    try {
        updateAgendarCita = await AgendarCita.findById(agendarCitaId);

        const AgendarCitaWithoutActualId = await AgendarCita.find({_id:{$ne:agendarCitaId}});

        const pacienteDates = AgendarCitaWithoutActualId.filter(d => d.idPaciente.toString() === updateAgendarCita.idPaciente.toString());
        const doctorDates = AgendarCitaWithoutActualId.filter(d => d.idDoctor.toString() === updateAgendarCita.idDoctor.toString());

        const verifyPacienteDates = pacienteDates.find(d => d.date === date);
        const verifyDoctorDates = doctorDates.find(d => d.date === date);

        if(!updateAgendarCita){
            throw new httpError(`We can't find this date`,404)
        }

        if(verifyPacienteDates || verifyDoctorDates){
            const verifyPacienteTime = pacienteDates.find(d => d.time === time)
            const verifyDoctorTime = doctorDates.find(d => d.time === time)
    
            if(verifyPacienteTime || verifyDoctorTime){
                throw new httpError(`We can't save this date with the same date and hour`,404)
            }
        }

        updateAgendarCita.date = date;
        updateAgendarCita.time = time;
        updateAgendarCita.message = message;

        await updateAgendarCita.save();

    } catch(err){
        return next(new httpError(`something went wrong: ${err}`,404));
    }

    res.status(201).json({message:'your date was already modified!',updateAgendarCita})
}
//delete a: agendar cita
const deleteAgendarCita = (req,res,next) => {
    const agendarCitaId = req.params.acId;
    const deleteAgendaCita = DBA_AGENDAR_CITA.find(p => p.id === agendarCitaId);

    if(!deleteAgendaCita){
        throw new httpError('We can`t find this date',404)
    }

    deleteAgendaCita.status = false;

    res.status(201).json({message:'your date was already canceled!',deleteAgendaCita})
}

exports.getAllAgendarCita = getAllAgendarCita;
exports.getAgendarCitaById = getAgendarCitaById;
exports.getAgendarCitaByStatus = getAgendarCitaByStatus;
exports.getAgendarCitaByDoctor = getAgendarCitaByDoctor;
exports.getAgendarCitaByDate = getAgendarCitaByDate;
exports.postAgendarCita = postAgendarCita;
exports.patchAgendarCita = patchAgendarCita;
exports.deleteAgendarCita = deleteAgendarCita;