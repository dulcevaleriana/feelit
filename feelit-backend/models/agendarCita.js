const mongoose = require('mongoose');

const agendarCitaSchema = mongoose.Schema({
    idPaciente:{ type: mongoose.Types.ObjectId, required: true, ref: 'Paciente'},
    idDoctor:{ type: mongoose.Types.ObjectId, required: true, ref: 'Doctor' },
    date:{type: String, required: true, maxlength: 10},
    time:{type: String, required: true, maxlength: 6},
    status:{type: Boolean, required: true},
    message:{type: String, required: true},
    link:{ type:String, required:true, unique:true }
});

module.exports = mongoose.model('AgendarCita',agendarCitaSchema);