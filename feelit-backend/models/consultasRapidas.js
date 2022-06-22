const mongoose = require('mongoose');

const consultasRapidasSchema = mongoose.Schema({
    idPaciente:{ type: mongoose.Types.ObjectId, required: true, ref: 'Paciente'},
    idDoctor:{ type: mongoose.Types.ObjectId, required: true, ref: 'Doctor' },
    time:{type: String, required: true, maxlength: 6},
    message:{type: String, required: true},
    dateCreated:{type: String, required: true, maxlength: 10},
    status:{type: Boolean, required: true},
    link:{ type:String, required:true, unique:true }
})

module.exports = mongoose.model('ConsultasRapidas',consultasRapidasSchema)