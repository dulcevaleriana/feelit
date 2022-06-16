const httpError = require('../models/http-error');
const { v4: uuidv4 } = require('uuid');
const {validationResult} = require('express-validator');
const MongoClient = require('mongodb').MongoClient;
const Paciente = require('../models/paciente');

const url = `mongodb+srv://dulceguzmantaveras:${process.env.MONGODB_KEY}@cluster0.rcqta.mongodb.net/${process.env.MONGODB_DBA}?retryWrites=true&w=majority`;

//BDA temporal
let DBA_PACIENTE = [
    {
        id:'dadafgsgfsdgrgf',
        cedula:'402-2334268-0',
        email:'juanOrtega@gmail.com',
        password:'dsfdgds',
        telefono:'849-654-9687',
        name:'Juan Ortega',
        status:true
    }
]
//get all paciente
const getAllPaciente = async (req,res,next)=>{
    const clientMongoDB = new MongoClient(url);
    let getAllPaciente;

    try{
        await clientMongoDB.connect();
        const db = clientMongoDB.db();
        getAllPaciente = await db.collection('paciente').find().toArray();
    } catch(error){
        return res.json({message:'Could not find any paciente'})
    }
    setTimeout(()=>clientMongoDB.close(),1500)
    res.json({getAllPaciente})
};
//get paciente by id
const getPacienteById = (req,res,next)=>{
    const pacienteId = req.params.pId;
    const findPacienteById = DBA_PACIENTE.find(p => p.id === pacienteId);
    if(!findPacienteById){
        throw new httpError('Could not find this paciente',404)
    }
    res.status(201).json({findPacienteById});
};
//post a doctor
const postPaciente = async (req,res,next)=>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        return next(new httpError('Invalid inputs passed, please check your data',422));
    }
    const {
        cedula,
        email,
        password,
        telefono,
        name
    } = req.body;
    const createPaciente = new Paciente({
        cedula,
        email,
        password,
        telefono,
        name,
        status:true
    })

    try {
        const ifCedulaExist = await Paciente.findOne({cedula:cedula});
        const ifEmailExist = await Paciente.findOne({email:email});

        if(ifCedulaExist){
            throw new httpError(`a user with this cedula: ${cedula} is already exist`,322)
        } 
        if(ifEmailExist){
            throw new httpError(`a user with this email: ${email} is already exist`,322)
        }

        createPaciente.save();
    } catch (err) {
        return next(new httpError(`something went wrong ${err}`,500))
    }

    res.status(201).json({message:"this paciente was succesfull created!",createPaciente:createPaciente.toObject({getters:true})});
}
//patch a doctor
const patchPaciente = async (req,res,next) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return next(new httpError('Invalid inputs passed, please check your data',422));
    }
    const {
        cedula,
        email,
        password,
        telefono,
        name
    } = req.body;
    const pacienteId = req.params.pId;
    let updatePaciente;

    try{
        updatePaciente = await Paciente.findById(pacienteId);

        updatePaciente.cedula = cedula;
        updatePaciente.email = email;
        updatePaciente.password = password;
        updatePaciente.telefono = telefono;
        updatePaciente.name = name;
    
        await updatePaciente.save();
    } catch (err){
        return next(new httpError(`something went wrong ${err}`,500))
    }

    res.status(201).json({message:'paciente`s account was succesfull edited:',updatePaciente})
}
//delete a doctor
const deletePaciente = async (req,res,next) => {
    const pacienteId = req.params.pId;
    let setDoctorStatusFalse;

    try{
        setDoctorStatusFalse = await Paciente.findById(pacienteId);
        setDoctorStatusFalse.status = false;
        setDoctorStatusFalse.save();
    } catch(err){
        return next(new httpError(`something went wrong ${err}`,500))
    }

    res.status(201).json({message:`doctor's account was succesfull off, now it status is: ${setDoctorStatusFalse.status}: `,setDoctorStatusFalse:setDoctorStatusFalse.toObject({getters:true})})
}

exports.getAllPaciente = getAllPaciente;
exports.getPacienteById = getPacienteById;
exports.postPaciente = postPaciente;
exports.patchPaciente = patchPaciente;
exports.deletePaciente = deletePaciente;