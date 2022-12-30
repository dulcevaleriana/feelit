const mongoose = require('mongoose');

const consultasRapidasSchema = mongoose.Schema({
    idPaciente:{ type: mongoose.Types.ObjectId, required: true, ref: 'Paciente'},
    idDoctor:{ type: mongoose.Types.ObjectId, required: true, ref: 'Doctor' },
    time:{type: String, required: true},
    messagePaciente:{type: String, required: true},
    messageCancelDoctor:{type: String, required: false},
    dateCreated:{type: Date, required: true, maxlength: 10},
    status:{type: Boolean, required: true},
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
})

module.exports = mongoose.model('ConsultasRapidas',consultasRapidasSchema)