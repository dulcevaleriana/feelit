import React, { useState } from "react";
import DoctorGallery from '../../components/ConsultaRapidaComponent/DoctorGallery';
import StaticTimePickerDemo from '../../components/UIElements/StaticTimePickerDemo';
import DoctorSelected from '../../components/ConsultaRapidaComponent/DoctorSelected';
import PacienteData from '../../components/ConsultaRapidaComponent/PacienteData';
import FormPayment from '../../components/ConsultaRapidaComponent/FormPayment';
import MessageComponent from "../../components/ConsultaRapidaComponent/MessageComponent";

import FormUserData from '../../components/ConsultaRapidaComponent/FormUserData';
import BasicButtons from "../../components/UIElements/BasicButtons-MUI";

import { faClock } from '@fortawesome/free-solid-svg-icons';
import { faAnglesRight, faMoneyBillTransfer, faAnglesLeft } from '@fortawesome/free-solid-svg-icons';

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

export default function ConsultaRapida(){
    const [step, setStep] = useState(0);

    return <div className={step === 0 ? "class-ConsultaRapida-step1" : step === 1 ? "class-ConsultaRapida-step2" : "class-ConsultaRapida-step3"}>
        {step === 0 && <>
            <DoctorGallery/>
            <StaticTimePickerDemo/>
            <FormUserData/>
        </>}
        {step === 1 && <>
            <DoctorSelected/>
            <PacienteData DATATEMPORAL={DATA_TEMPORAL}/>
            <FormPayment/>
        </>}
        {step === 2 && <>
            <MessageComponent />
        </>}
        {step !== 2 && <>
            <BasicButtons
                onClick={step === 1 ? ()=>setStep(step - 1) : ""}
                variantName="outlined"
                buttonName={step === 0 ? "Quiero otra fecha" : step === 1 ? "Volver" : ""}
                iconName={step === 0 ? faClock : step === 1 ? faAnglesLeft : ""}
            />
            <BasicButtons
                onClick={()=>setStep(step + 1)}
                variantName="contained"
                buttonName={step === 0 ? "Siguiente" : step === 1 ? "Pagar ahora" : ""}
                iconName={step === 0 ? faAnglesRight : step === 1 ? faMoneyBillTransfer : ""}
            />
        </>}
    </div>
}