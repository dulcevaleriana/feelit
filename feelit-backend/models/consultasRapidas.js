const mongoose = require('mongoose');

const consultasRapidasSchema = mongoose.Schema({
    idPaciente:{ type: mongoose.Types.ObjectId, required: true, ref: 'Paciente'},
    idDoctor:{ type: mongoose.Types.ObjectId, required: true, ref: 'Doctor' },
    time:{type: String, required: true, maxlength: 6},
    messagePaciente:{type: String, required: true},
    messageCancelDoctor:{type: String, required: false},
    dateCreated:{type: String, required: true, maxlength: 10},
    status:{type: Boolean, required: true},
    link:{ type:String, required:true, unique:true },
    chat:[
        {
            idOwner:{ type: mongoose.Types.ObjectId, required: false, ref: 'Paciente' || 'Doctor'},
            message:{type:String, require:false},
            date:{type:String, require:false},
            time:{type:String, require:false}
        }
    ]
})

module.exports = mongoose.model('ConsultasRapidas',consultasRapidasSchema)