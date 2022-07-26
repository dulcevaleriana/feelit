import React from 'react';

const DATA_TEMPORAL = [
    {
        title:'Nombre',
        data:'Juana Perez'
    },
    {
        title:'Teléfono',
        data:'000-000-0000'
    },
    {
        title:'Correo',
        data:'juana.perez@gmail.com'
    },
    {
        title:'Tipo de cita',
        data:'Terapia inicial'
    },
    {
        title:'Este es mi mensaje',
        data:'Hola solo quiero decir que...'
    }
]

export default function PacienteData(){
    return <div>
        <h5>Estos son tus datos:</h5>
        {DATA_TEMPORAL.map((index,key)=><span key={key}>
            <h4>{index.title}</h4>
            <h5>{index.data}</h5>
        </span>)}
    </div>
}