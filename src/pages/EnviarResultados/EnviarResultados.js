import React, { useEffect, useState } from "react";
import DoctorGallery from '../../components/ConsultaRapidaComponent/DoctorGallery';
import DoctorSelected from '../../components/ConsultaRapidaComponent/DoctorSelected';
import PacienteData from '../../components/ConsultaRapidaComponent/PacienteData';
import FormPayment from '../../components/ConsultaRapidaComponent/FormPayment';
import MessageComponent from "../../components/ConsultaRapidaComponent/MessageComponent";

import BasicButtons from "../../components/UIElements/BasicButtons-MUI";

import { faAnglesRight, faMoneyBillTransfer, faAnglesLeft } from '@fortawesome/free-solid-svg-icons';

import FormControl from '@mui/material/FormControl';
import BasicSelect from "../../components/UIElements/BasicSelect";
import FormUserData from "../../components/ConsultaRapidaComponent/FormUserData";
import UploadButtons from "../../components/EnviarResultados/UploadButtons";

const DUMfilterArray = [
    {
        value:10,
        name:"nombre especialidad"
    },
    {
        value:20,
        name:"nombre especialidad"
    },
    {
        value:30,
        name:"nombre especialidad"
    },
    {
        value:40,
        name:"nombre especialidad"
    },
    {
        value:50,
        name:"nombre especialidad"
    },
    {
        value:60,
        name:"nombre especialidad"
    },
]

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
    },
    {
        title:'Documentos Enviados',
        data:[
            'resultados-dulce-guzman.pdf',
            'resultados2-dulce-guzman.pdf'
        ]
    }
]

export default function EnviarResultados(){
    const [step, setStep] = useState(localStorage.stepLS ? 2 : 0);

    useEffect(()=>{
        localStorage.removeItem("stepLS")
    },[step])

    return <div className={step === 0 ? "class-EnviarResultados-step1" : step === 1 ? "class-EnviarResultados-step2" : "class-ConsultaRapida-step3"}>
        {step === 0 && <>
            <span>
                <FormControl>
                    <label>Elige tu medico de preferencia, fecha y hora de la cita</label>
                    <BasicSelect
                        name="Filtrar por especialidad"
                        filterArray={DUMfilterArray}
                    />
                </FormControl>
                <DoctorGallery/>
            </span>
            <FormUserData/>
            <UploadButtons/>
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
            {step !== 0 && <>
                <BasicButtons
                    onClick={()=>setStep(step - 1)}
                    variantName="outlined"
                    buttonName={step >= 1 ? "Cambiar Doc" : ""}
                    iconName={step >= 1 ? faAnglesLeft : ""}
                />
            </>}
            <BasicButtons
                onClick={()=>setStep(step + 1)}
                variantName="contained"
                buttonName={step === 0 ? "Siguiente" : step >= 1 ? "Pagar ahora" : ""}
                iconName={step === 0 ? faAnglesRight : step >= 1 ? faMoneyBillTransfer : ""}
            />
        </>}
    </div>
}