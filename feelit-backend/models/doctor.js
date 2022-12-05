const mongoose = require('mongoose');

const doctorSchema = mongoose.Schema({
    name:{ type:String, required:true },
    password:{ type:String, required:true, minlength: 6 },
    cedula:{ type:String, required:true, maxlength: 13, unique: true },
    email:{ type:String, required:true, unique: true },
    telefono:{ type:String, required:true, maxlength: 12 },
    status:{ type:Boolean, required:true },
    address:{type:String, require:false},
    googleMapsLink:{type:String, require:false},
    horario:{
        lun:{
            estado:{ type:Boolean, required:false },
            horarioEntrada:{ type:Number, required:false },
            horarioSalida:{ type:Number, required:false }
        },
        mar:{
            estado:{ type:Boolean, required:false },
            horarioEntrada:{ type:Number, required:false },
            horarioSalida:{ type:Number, required:false },
        },
        mir:{
            estado:{ type:Boolean, required:false },
            horarioEntrada:{ type:Number, required:false },
            horarioSalida:{ type:Number, required:false },
        },
        jue:{
            estado:{ type:Boolean, required:false },
            horarioEntrada:{ type:Number, required:false },
            horarioSalida:{ type:Number, required:false },
        },
        vie:{
            estado:{ type:Boolean, required:false },
            horarioEntrada:{ type:Number, required:false },
            horarioSalida:{ type:Number, required:false },
        },
        sab:{
            estado:{ type:Boolean, required:false },
            horarioEntrada:{ type:Number, required:false },
            horarioSalida:{ type:Number, required:false },
        },
        dom:{
            estado:{ type:Boolean, required:false },
            horarioEntrada:{ type:Number, required:false },
            horarioSalida:{ type:Number, required:false },
        }
    },
    specialty:{type:mongoose.Types.ObjectId, required:true, ref:'Specialty'},
    rol:{ type:mongoose.Types.ObjectId, required:true, ref:'Rol' },
    agendarCita:[{type:mongoose.Types.ObjectId, required:true, ref:'AgendarCita'}],
    consultaRapida:[{type:mongoose.Types.ObjectId, required:true, ref:'ConsultasRapidas'}],
    enviarExamenes:[{type:mongoose.Types.ObjectId, required:true, ref:'EnviarExamenes'}]
})

module.exports = mongoose.model('Doctor',doctorSchema);