const mongoose = require('mongoose');

const enviarExamenesSchema = mongoose.Schema({
    idPaciente:{ type: mongoose.Types.ObjectId, required: true, ref: 'Paciente'},
    idDoctor:{ type: mongoose.Types.ObjectId, required: true, ref: 'Doctor' },
    message:{type: String, required: true},
    messageDoctor:{type: String, required: true},
    docUpload:[{type: String, required: true}],
    dateCreated:{type: String, required: true, maxlength: 10},
    status:{type: Boolean, required: true},
    link:{ type:String, required:true, unique:true }
})

module.exports = mongoose.model('EnviarExamenes',enviarExamenesSchema);