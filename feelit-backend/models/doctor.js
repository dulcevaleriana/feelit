const mongoose = require('mongoose');

const doctorSchema = mongoose.Schema({
    name:{ type:String, required:true },
    password:{ type:String, required:true, minlength: 6 },
    cedula:{ type:String, required:true, maxlength: 13, unique: true },
    email:{ type:String, required:true, unique: true },
    specialty:{type:mongoose.Types.ObjectId, required:true, ref:'Specialty'},
    telefono:{ type:String, required:true, maxlength: 12 },
    laborDays:{
        su:{ type:Boolean, required:true },
        mo:{ type:Boolean, required:true },
        tu:{ type:Boolean, required:true },
        we:{ type:Boolean, required:true },
        th:{ type:Boolean, required:true },
        fr:{ type:Boolean, required:true },
        sa:{ type:Boolean, required:true }
    },
    hourStart:{ type:String, required:true },
    hourFinish:{ type:String, required:true },
    location:{
        lan:{ type:Number, required:true },
        lng:{ type:Number, required:true },
        address:{ type:String, required:true }
    },
    status:{ type:Boolean, required:true },
    agendarCita:[{type:mongoose.Types.ObjectId, required:true, ref:'AgendarCita'}],
    consultaRapida:[{type:mongoose.Types.ObjectId, required:true, ref:'ConsultasRapidas'}],
    enviarExamenes:[{type:mongoose.Types.ObjectId, required:true, ref:'EnviarExamenes'}]
})

module.exports = mongoose.model('Doctor',doctorSchema);