const mongoose = require('mongoose');

const agendarCitaSchema = mongoose.Schema({
    idPaciente:{ type: mongoose.Types.ObjectId, required: true, ref: 'Paciente'},
    idDoctor:{ type: mongoose.Types.ObjectId, required: true, ref: 'Doctor' },
    date:{type: String, required: true, maxlength: 10},
    time:{type: String, required: true, maxlength: 6},
    status:{type: String, required: true, ref: 'status_list'},
    status_list:{ type: String, enum: ['Pendiente','Aprobado','Rechazado','Completado'], require: true},
    messagePaciente:{type: String, required: true},
    messageCancelDoctor:{type: String, required: false},
    link:{ type:String, required:true, unique:true },
    chat:[
        {
            idOwner:{ type: mongoose.Types.ObjectId, required: false, ref: 'model_type' },
            model_type: { type: String, enum: ['Paciente', 'Doctor'], required: false },
            messageChat:{type:String, require:false},
            dateChat:{type:String, require:false},
            timeChat:{type:String, require:false}
        }
    ]
});

module.exports = mongoose.model('AgendarCita',agendarCitaSchema);