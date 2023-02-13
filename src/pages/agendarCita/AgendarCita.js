import React, { useEffect, useState } from "react";
import DoctorGallery from '../../components/ConsultaRapidaComponent/DoctorGallery';
import StaticTimePickerDemo from '../../components/UIElements/StaticTimePickerDemo';
import DoctorSelected from '../../components/ConsultaRapidaComponent/DoctorSelected';
import PacienteData from '../../components/ConsultaRapidaComponent/PacienteData';
import FormPayment from '../../components/ConsultaRapidaComponent/FormPayment';
import MessageComponent from "../../components/ConsultaRapidaComponent/MessageComponent";

import BasicButtons from "../../components/UIElements/BasicButtons-MUI";

import { faAnglesRight, faMoneyBillTransfer, faAnglesLeft, faClock, faX, faSearch, faCheck } from '@fortawesome/free-solid-svg-icons';

import FormControl from '@mui/material/FormControl';
import BasicSelect from "../../components/UIElements/BasicSelect";
import CustomDay from "../../components/UIElements/CustomDay";
import FormUserDataAgendarCita from "../../components/AgendarCita/FormUserDataAgendarCita";
import NestedModal from "../../components/UIElements/NestedModal";

import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';

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
    }
]

export default function AgendarCita(){
    const [step, setStep] = useState(localStorage.stepLS ? 2 : 0);
    const [stepVerifyDate, setStepVerifyDate] = useState(false);
    const [codigo] = useState("")
    // , setCodigo

    useEffect(()=>{
        localStorage.removeItem("stepLS")
    },[step])

    return <div className={step === 0 ? "class-AgendarCita-step1" : step === 1 ? "class-AgendarCita-step2" : step === 2 ? "class-AgendarCita-step3" : "class-ConsultaRapida-step3"}>
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
            <CustomDay/>
            <StaticTimePickerDemo/>
        </>}
        {step === 1 && <>
            <DoctorSelected/>
            <FormUserDataAgendarCita/>
        </>}
        {step === 2 && <>
            <DoctorSelected/>
            <PacienteData DATATEMPORAL={DATA_TEMPORAL}/>
            <FormPayment/>
        </>}
        {step === 3 && <>
            <MessageComponent />
        </>}
        {step !== 3 && <>
            {step !== 0 && <>
                <BasicButtons
                    onClick={()=>setStep(step - 1)}
                    variantName="outlined"
                    buttonName={step >= 1 ? "Volver" : ""}
                    iconName={step >= 1 ? faAnglesLeft : ""}
                />
            </>}
            <div>
            {step === 1 && <>
                <BasicButtons
                    onClick={()=>setStep(3)}
                    variantName="outlined"
                    buttonName="Pagar día de la cita"
                    iconName={faClock}
                />
            </>}
            {step === 2 && <>
                <NestedModal
                        className="class-modalVerifyDate"
                        withButton={true}
                        name="Esta no es mi cita"
                        icon={faX}
                        variantName="outlined"
                        title="Recuperar tu cita"
                        message="Busca el codigo de tu cita en tu bandeja de entrada de correo o span
                        para buscar tu cita"
                        body={<>
                            <FormControl>
                                <InputLabel htmlFor="component-outlined">Escribe tu codigo</InputLabel>
                                <OutlinedInput
                                id="component-outlined"
                                value={codigo}
                                onChange={(event)=>{}}
                                label="Telefono"
                                />
                            </FormControl>
                            {stepVerifyDate && <PacienteData/>}
                        </>}
                        cancelButton={!stepVerifyDate}
                        buttonNameCancel="Cancelar"
                        buttonOptions={<>
                            {stepVerifyDate && <BasicButtons
                                onClick={()=>setStepVerifyDate(!stepVerifyDate)}
                                variantName="outlined"
                                buttonName="No soy yo"
                                iconName={faX}
                            />}
                            <BasicButtons
                                onClick={()=>setStepVerifyDate(!stepVerifyDate)}
                                variantName="contained"
                                buttonName={!stepVerifyDate ? "Buscar cita" : "Si soy yo"}
                                iconName={!stepVerifyDate ? faSearch : faCheck}
                            />
                        </>}
                    />
            </>}
            <BasicButtons
                onClick={()=>setStep(step + 1)}
                variantName="contained"
                buttonName={step === 0 ? "Siguiente" : step >= 1 ? "Pagar ahora" : ""}
                iconName={step === 0 ? faAnglesRight : step >= 1 ? faMoneyBillTransfer : ""}
            />
            </div>
        </>}
    </div>
}