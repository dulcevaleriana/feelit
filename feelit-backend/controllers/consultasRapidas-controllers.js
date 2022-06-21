const httpError = require('../models/http-error');
const { v4: uuidv4 } = require('uuid');
const {validationResult} = require('express-validator');
const {todayFunction} = require('../models/today')
const ConsultasRapidas = require('../models/consultasRapidas');
const Paciente = require('../models/paciente');
const Doctor = require('../models/doctor');
const { default: mongoose } = require('mongoose');
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
const postconsultasRapidas = async (req,res,next)=>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        return next(new httpError('Invalid inputs passed, please check your data',422));
    }
    const {
        idPaciente,
        idDoctor,
        time,
        message,
    } = req.body;
    const createConsultasRapidas = new ConsultasRapidas({
        idPaciente,
        idDoctor,
        time,
        message,
        dateCreated:todayFunction(),
        status:true,
        link:uuidv4()
    })

    try {
        const paciente = await Paciente.findById(idPaciente);
        const doctor = await Doctor.findById(idDoctor);
        const checkPaciente = await ConsultasRapidas.find({idPaciente:idPaciente});
        const checkDoctor = await ConsultasRapidas.find({idDoctor:idDoctor});
        const checkPacienteTime = checkPaciente.find(p => p.time === time);
        const checkDoctorTime = checkDoctor.find(p => p.time === time);

        if(!paciente){
            return next(new httpError(`we don't find any paciente`,404));
        }
        if(!doctor){
            return next(new httpError(`we don't find any `,404));
        }
        if(checkPacienteTime || checkDoctorTime){
            return next(new httpError(`this time isn't avaible, try with another one`,404));
        }

        const sess = await mongoose.startSession();
        sess.startTransaction();

        paciente.consultaRapida.push(createConsultasRapidas);
        doctor.consultaRapida.push(createConsultasRapidas);

        await createConsultasRapidas.save({session:sess});
        await paciente.save({session:sess});
        await doctor.save({session:sess});

        sess.commitTransaction();

    } catch(err){
        return next(new httpError(`somethign went wrong ${err}`,422));
    }

    res.status(201).json({message:'This flash date was already created!!',createConsultasRapidas})
}
//patch a: consultas rapidas
const patchconsultasRapidas = async (req,res,next) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return next(new httpError('Invalid inputs passed, please check your data',422));
    }
    const {
        idPaciente,
        idDoctor,
        time,
        message,
    } = req.body;
    const consultaFlashId = req.params.crId;
    let verifyconsultaFlashId;

    try {
        verifyconsultaFlashId = await ConsultasRapidas.findById(consultaFlashId);
        const verifyconsultaFlashWithoutId = await ConsultasRapidas.find({_id:{$ne:consultaFlashId}});
        const paciente = await Paciente.findById(idPaciente);
        const doctor = await Doctor.findById(idDoctor);
        const pacienteDates = verifyconsultaFlashWithoutId.filter(p => p.idPaciente.toString() === idPaciente.toString());
        const doctorDates = verifyconsultaFlashWithoutId.filter(p => p.idDoctor.toString() === idDoctor.toString());
        const verifyPacienteTime = pacienteDates.find(d => d.time === time);
        const verifyDoctorTime = doctorDates.find(d => d.time === time);

        if(!verifyconsultaFlashId){
            throw new httpError(`We can't find this flash date`,404)
        }    
        if(!paciente){
            return next(new httpError(`we don't find any paciente`,404));
        }
        if(!doctor){
            return next(new httpError(`we don't find any `,404));
        }
        if(verifyPacienteTime || verifyDoctorTime){
            return next(new httpError(`this time isn't avaible, try with another one`,404));
        }

        verifyconsultaFlashId.time = time;
        verifyconsultaFlashId.message = message;

        const sess = await mongoose.startSession();
        sess.startTransaction();

        paciente.consultaRapida.push(verifyconsultaFlashId);
        doctor.consultaRapida.push(verifyconsultaFlashId);

        await verifyconsultaFlashId.save({session:sess});
        await paciente.save({session:sess});
        await doctor.save({session:sess});
        
        sess.commitTransaction();

    } catch(err){
        return next(new httpError(`somethign went wrong ${err}`,422));
    }

    res.status(201).json({message:'This flash consult was edited succesfully!!',verifyconsultaFlashId})
}
//delete a: consultas rapidas
const deleteconsultasRapidas = async (req,res,next) => {
    const consultaFlashId = req.params.crId;
    let deleteconsultaRapidas;

    try {
        deleteconsultaRapidas = await ConsultasRapidas.findById(consultaFlashId);

        if(!deleteconsultaRapidas){
            throw new httpError('We can`t find this date',404)
        }
    
        deleteconsultaRapidas.status = false;
        await deleteconsultaRapidas.save();
        
    } catch(err){
        return next(new httpError(`somethign went wrong ${err}`,422));
    }

    res.status(201).json({message:'your date was already canceled!',deleteconsultaRapidas})
}

//active a: consultas rapidas
const activeConsultasRapidas = async (req,res,next) => {
    const consultaFlashId = req.params.crId;
    let deleteconsultaRapidas;

    try {
        deleteconsultaRapidas = await ConsultasRapidas.findById(consultaFlashId);

        if(!deleteconsultaRapidas){
            throw new httpError('We can`t find this date',404)
        }
    
        deleteconsultaRapidas.status = true;
        await deleteconsultaRapidas.save();
        
    } catch(err){
        return next(new httpError(`somethign went wrong ${err}`,422));
    }

    res.status(201).json({message:'your date was already activate again!',deleteconsultaRapidas})
}

exports.getAllconsultasRapidas = getAllconsultasRapidas;
exports.getconsultasRapidasById = getconsultasRapidasById;
exports.getconsultasRapidasByStatus = getconsultasRapidasByStatus;
exports.getconsultasRapidasByDoctor = getconsultasRapidasByDoctor;
exports.getconsultasRapidasByDate = getconsultasRapidasByDate;
exports.postconsultasRapidas = postconsultasRapidas;
exports.patchconsultasRapidas = patchconsultasRapidas;
exports.deleteconsultasRapidas = deleteconsultasRapidas;
exports.activeConsultasRapidas = activeConsultasRapidas;