import React, { useState } from "react";
import NestedModal from "../../components/UIElements/NestedModal";
import BasicButtons from "../../components/UIElements/BasicButtons-MUI";
import StaticTimePickerDemo from "../../components/UIElements/StaticTimePickerDemo";
import PacienteData from "../../components/ConsultaRapidaComponent/PacienteData";
import FormPayment from "../../components/ConsultaRapidaComponent/FormPayment";

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

export default function PopUpConsultaRapida(props){
    let [step, setStep] = useState(0);

    const closeModal = () => {
        props.handleClose();
        setStep(0);
    }

    console.log({step})

    return <NestedModal
        className="class-PopUpConsultaRapida"
        withButton={true}
        closeNow={props.closeNow}
        name={props.buttonName}
        variantName={props.variantName}
        handleClose={props.handleClose}
        title="CONSULTA RAPIDA"
        cancelButton={false}
        body={<form className={step === 1 ? "class-gridChange" : ""}>
            { step === 0 ? <>
                <StaticTimePickerDemo/>
                <textarea placeholder="jjjjjjjjj"></textarea>
            </> :
            <>
                <PacienteData DATATEMPORAL={DATA_TEMPORAL}/>
                <FormPayment/>
            </>}
        </form>}
        buttonOptions={<>
            <BasicButtons
                onClick={step === 0 ? closeModal : ()=>setStep(step - 1)}
                variantName="outlined"
                buttonName={step === 0 ? "Cancelar" : "Volver"}
            />
            <BasicButtons
                onClick={step === 1 ? closeModal : ()=>setStep(step + 1)}
                variantName="contained"
                buttonName={step === 1 ? "Solicitar" : "Siguiente"}
            />
        </>}
    />
}