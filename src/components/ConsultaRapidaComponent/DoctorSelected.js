import React from 'react';

export default function DoctorSelected(props){

    return <div className='class-DoctorSelected'>
        <h5>Has elegido para tu cita:</h5>
        <span className="class-select">
            <div>
                <img src={props.getDoctor?.image ? props.getDoctor?.image : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"} alt={props.getDoctor?.image ? props.getDoctor?.image : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}/>
            </div>
            <h4>{props.getDoctor?.name}</h4>
            <h5>"fecha actual" <br/> {props.time ? props.time : "Download..."}</h5>
        </span>
    </div>
}