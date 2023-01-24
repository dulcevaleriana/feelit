const mongoose = require('mongoose');

const agendarCitaSchema = mongoose.Schema({
    idPaciente:{ type: mongoose.Types.ObjectId, required: true, ref: 'Paciente'},
    idDoctor:{ type: mongoose.Types.ObjectId, required: true, ref: 'Doctor' },
    date:{type: Date, required: true},
    time:{type: String, required: true},
    paymentStatus:{type: Boolean, required: true},
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
    ],
    doctorPrice:{type:Number,required:true}
});

module.exports = mongoose.model('AgendarCita',agendarCitaSchema);