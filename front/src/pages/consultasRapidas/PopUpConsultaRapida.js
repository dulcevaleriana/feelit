import React, { useState } from "react";
import NestedModal from "../../components/UIElements/NestedModal";
import BasicButtons from "../../components/UIElements/BasicButtons-MUI";

export default function PopUpConsultaRapida(props){
    let [step, setStep] = useState(0);
    console.log({step})

    return <NestedModal
        withButton={true}
        closeNow={props.closeNow}
        name={props.buttonName}
        variantName={props.variantName}
        handleClose={props.handleClose}
        title="CONSULTA RAPIDA"
        cancelButton={false}
        body={
            step === 0 ? <>
            00000
            </> :
            <>
            111111
            </>
        }
        buttonOptions={<>
            <BasicButtons
                onClick={step === 0 ? props.handleClose : ()=>setStep(step - 1)}
                variantName="outlined"
                buttonName={step === 0 ? "Cancelar" : "Volver"}
            />
            <BasicButtons
                onClick={step === 1 ? props.handleClose : ()=>setStep(step + 1)}
                variantName="contained"
                buttonName={step === 1 ? "Solicitar" : "Siguiente"}
            />
        </>}
    />
}