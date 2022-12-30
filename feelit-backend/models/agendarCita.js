const mongoose = require('mongoose');

const agendarCitaSchema = mongoose.Schema({
    idPaciente:{ type: mongoose.Types.ObjectId, required: true, ref: 'Paciente'},
    idDoctor:{ type: mongoose.Types.ObjectId, required: true, ref: 'Doctor' },
    date:{type: String, required: true, maxlength: 10},
    time:{type: String, required: true, maxlength: 6},
    status:{type: Boolean, required: true},
    messagePaciente:{type: String, required: true},
    messageCancelDoctor:{type: String, required: false},
    link:{ type:String, required:true, unique:true },
    chat:[
        {
            idOwner:{ type: mongoose.Types.ObjectId, required: false, ref: 'Paciente' || 'Doctor'},
            messageChat:{type:String, require:false},
            dateChat:{type:String, require:false},
            timeChat:{type:String, require:false}
        }
    ]
});

module.exports = mongoose.model('AgendarCita',agendarCitaSchema);