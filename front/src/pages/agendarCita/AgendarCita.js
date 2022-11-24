import React, { useState } from "react";
import DoctorGallery from '../../components/ConsultaRapidaComponent/DoctorGallery';
import StaticTimePickerDemo from '../../components/UIElements/StaticTimePickerDemo';
import DoctorSelected from '../../components/ConsultaRapidaComponent/DoctorSelected';
import PacienteData from '../../components/ConsultaRapidaComponent/PacienteData';
import FormPayment from '../../components/ConsultaRapidaComponent/FormPayment';
import MessageComponent from "../../components/ConsultaRapidaComponent/MessageComponent";

import BasicButtons from "../../components/UIElements/BasicButtons-MUI";

import { faAnglesRight, faMoneyBillTransfer, faAnglesLeft, faClock } from '@fortawesome/free-solid-svg-icons';

import FormControl from '@mui/material/FormControl';
import BasicSelect from "../../components/UIElements/BasicSelect";
import CustomDay from "../../components/UIElements/CustomDay";
import FormUserDataAgendarCita from "../../components/AgendarCita/FormUserDataAgendarCita";

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

export default function AgendarCita(){
    const [step, setStep] = useState(0);

    return <div className={step === 0 ? "class-AgendarCita-step1" : step === 1 ? "class-AgendarCita-step2" : step === 2 ? "class-AgendarCita-step3" : ""}>
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
            <PacienteData/>
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
            {step >= 1 && <>
                <BasicButtons
                    onClick={()=>setStep(3)}
                    variantName="outlined"
                    buttonName="Pagar día de la cita"
                    iconName={faClock}
                />
            </>}
            <BasicButtons
                onClick={()=>setStep(step + 1)}
                variantName="contained"
                buttonName={step === 0 ? "Siguiente" : step === 1 ? "Pagar ahora" : ""}
                iconName={step === 0 ? faAnglesRight : step === 1 ? faMoneyBillTransfer : ""}
            />
            </div>
        </>}
    </div>
}