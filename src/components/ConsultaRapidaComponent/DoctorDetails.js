import React from "react";

export default function DoctorDetails() {
    return <div>
        <h5>Elige tu medico de preferencia, fecha y hora de la cita</h5>
        <span>
            <div><img src={index.doctorImage} alt={index.doctorImage}/></div>
            <h4>{index.doctorName}</h4>
            <h5>{index.doctorSpeciallity}</h5>
            <h5>dateTime() </h5>
        </span>
        <h6>Hoy es: Lunes 21 de Abril 2:00pm </h6>
    </div>
}