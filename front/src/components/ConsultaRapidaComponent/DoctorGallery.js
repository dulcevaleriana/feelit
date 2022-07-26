import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons';

export default function DoctorGallery() {
    const [counterSelect, setCounterSelect] = useState(0);
    const imageGallery = [
        {
            doctorName:"Juan Ortega",
            doctorSpeciallity:"pediatry",
            doctorImage:"https://cdn.pixabay.com/photo/2017/03/14/03/20/woman-2141808__480.jpg"
        },
        {
            doctorName:"Juan Ortega 2",
            doctorSpeciallity:"pediatry",
            doctorImage:"https://cdn.pixabay.com/photo/2017/01/29/21/16/nurse-2019420__340.jpg"
        },
        {
            doctorName:"Juan Ortega 3",
            doctorSpeciallity:"pediatry",
            doctorImage:"https://cdn.pixabay.com/photo/2020/11/02/19/52/doctor-5707722_960_720.jpg"
        },
        {
            doctorName:"Juan Ortega 4",
            doctorSpeciallity:"pediatry",
            doctorImage:"https://cdn.pixabay.com/photo/2017/09/06/20/36/doctor-2722941_960_720.jpg"
        }
    ]

    const backFunction = () => {
        if(counterSelect <= 0){
            return setCounterSelect(0)
        }
        setCounterSelect(counterSelect - 1)
    }

    const nextFunction = () => {
        if(counterSelect >= imageGallery.length - 1){
            return setCounterSelect(imageGallery.length - 1)
        }
        setCounterSelect(counterSelect + 1)
    }

    return <div>
        <h5>Elige tu medico de preferencia, fecha y hora de la cita</h5>
        <div>
            <FontAwesomeIcon 
                onClick={backFunction} 
                icon={faAngleLeft} 
                size="lg"  
            />
            <span>
            {imageGallery.map((index, key) => (
                <span 
                    key={key} 
                    className={
                        key === counterSelect ? "class-select" : 
                        key === counterSelect - 1 ? "class-semi-view" : 
                        key === counterSelect + 1 ? "class-semi-view" : 
                        " "
                    }
                >
                    <div><img src={index.doctorImage} alt={index.doctorImage}/></div>
                    {key === counterSelect && <>
                        <h4>{index.doctorName}</h4>
                        <h5>{index.doctorSpeciallity}</h5>
                    </>}
                </span>
            ))}
            </span>
            <FontAwesomeIcon 
                onClick={nextFunction} 
                icon={faAngleRight} 
                size="lg"  
            />
        </div>
        <h6>Hoy es: Lunes 21 de Abril 2:00pm </h6>
    </div>
}