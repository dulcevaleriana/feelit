import React, { useState, useContext, useEffect } from "react";
import NestedModal from "../../components/UIElements/NestedModal";
import BasicButtons from "../../components/UIElements/BasicButtons-MUI";
import StaticTimePickerDemo from "../../components/UIElements/StaticTimePickerDemo";
import PacienteData from "../../components/ConsultaRapidaComponent/PacienteData";
import FormPayment from "../../components/ConsultaRapidaComponent/FormPayment";
import { AuthContext } from "../../shared/context/auth-context";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Input from "../../components/UIElements/InputComponent";
import ModalComponent from "../../components/UIElements/ModalComponent";

export default function PopUpConsultaRapida(props){
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    let [step, setStep] = useState(0);
    const [time, setTime] = useState("");
    const [pacienteData, setPacienteData] = useState(null);

    useEffect(()=>{
        const getPacienteDataFunction = async () => {
            try{
                const response = await sendRequest(process.env.REACT_APP_ + 'paciente/' + auth.userId)
                setPacienteData(response)
            } catch(err){}
        }
        getPacienteDataFunction()
    },[auth.userId,sendRequest])

    console.log({pacienteData})

    const closeModal = () => {
        props.handleClose();
        setStep(0);
    }

    const [formState, inputHandler] = useForm(
        {
            idPaciente: {
                value: auth.userId,
                isValid: true
            },
            idDoctor: {
                value: props.idDoctor,
                isValid: true
            },
            time: {
                value: time,
                isValid: true
            },
            messagePaciente: {
                value: '',
                isValid: false
            },
            doctorPrice: {
                value: props.doctorPrice,
                isValid: true
            }
        },
        false
    );

    console.log({idDoctor:props.idDoctor})

    const CreateConsultaRapidaFunction = async event => {
        event.preventDefault();

        try{
            await sendRequest(
              process.env.REACT_APP_ + "consultas-rapidas/createConsultaRapida",
              'POST',
              JSON.stringify({
                idPaciente: formState.inputs.idPaciente.value,
                idDoctor: formState.inputs.idDoctor.value,
                time: time,
                messagePaciente: formState.inputs.messagePaciente.value,
                doctorPrice: props.doctorPrice
              }),
              {
                'Content-Type': 'application/json'
              },
            )
        } catch(err){alert(err)}

        closeModal()
    }

    return <>
        <ModalComponent
            headerTitle='You can not access for now'
            show={error}
            onCancel={clearError}
        >
            {error}
        </ModalComponent>
        <NestedModal
            className="class-PopUpConsultaRapida"
            withButton={true}
            closeNow={props.closeNow}
            name={props.buttonName}
            variantName={props.variantName}
            handleClose={props.handleClose}
            disabled={props.disabled}
            title="CONSULTA RAPIDA"
            cancelButton={false}
            body={<form className={step === 1 ? "class-gridChange" : ""}>
                { step === 0 ? <>
                    <StaticTimePickerDemo id="time" getTimeFunctionOut={(time)=>setTime(time)}/>
                    <Input
                        id="messagePaciente"
                        validators={[]}
                        onInput={inputHandler}
                    />
                </> :
                <>
                    <PacienteData
                        message={formState.inputs.messagePaciente.value}
                        pacienteData={{
                            cedula: pacienteData?.getPacienteById?.cedula,
                            email: pacienteData?.getPacienteById?.email,
                            telefono: pacienteData?.getPacienteById?.telefono,
                            name: pacienteData?.getPacienteById?.name
                        }}
                    />
                    <FormPayment/>
                    {isLoading && <h1>Loading...</h1>}
                </>}
            </form>}
            buttonOptions={<>
                <BasicButtons
                    onClick={step === 0 ? closeModal : ()=>setStep(step - 1)}
                    variantName="outlined"
                    buttonName={step === 0 ? "Cancelar" : "Volver"}
                />
                <BasicButtons
                    onClick={step === 1 ? CreateConsultaRapidaFunction : ()=>setStep(step + 1)}
                    variantName="contained"
                    buttonName={step === 1 ? "Solicitar" : "Siguiente"}
                />
            </>}
        />
    </>
}