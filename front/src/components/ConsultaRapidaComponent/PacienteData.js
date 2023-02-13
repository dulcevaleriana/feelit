import React from 'react';

export default function PacienteData(props){

    return <div>
        <h5>Estos son tus datos:</h5>
        <span>
            <h4>Nombre</h4>
            <h5>{props.pacienteData?.name}</h5>
        </span>
        <span>
            <h4>Teléfono</h4>
            <h5>{props.pacienteData?.telefono}</h5>
        </span>
        <span>
            <h4>Correo</h4>
            <h5>{props.pacienteData?.email}</h5>
        </span>
        <span>
            <h4>Este es mi mensaje</h4>
            <h5>{props.message}</h5>
        </span>
    </div>
}