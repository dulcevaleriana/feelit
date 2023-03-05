import React, { useState, useContext, useEffect } from "react";
import NestedModal from "../../components/UIElements/NestedModal";
import BasicButtons from "../../components/UIElements/BasicButtons-MUI";
import PacienteData from "../../components/ConsultaRapidaComponent/PacienteData";
import FormPayment from "../../components/ConsultaRapidaComponent/FormPayment";
import CustomDay from "../../components/UIElements/CustomDay";
import TimeAvaiable from "../../components/AgendarCita/TimeAvaiable";
import { useForm } from "../../shared/hooks/form-hook";
import { AuthContext } from "../../shared/context/auth-context";
import Input from "../../components/UIElements/InputComponent";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ModalComponent from "../../components/UIElements/ModalComponent";
import "../../scss/PopUpAgendarCita.scss";


export default function PopUpAgendarCita(props){
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    let [step, setStep] = useState(0);
    let [getDateDay, setGetDateDay] = useState('');
    let [getDateTime, setGetDateTime] = useState('');
    const [getDayNumber, setgetDayNumber] = useState("");
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
            date: {
                value: getDateDay,
                isValid: true
            },
            time: {
                value: getDateTime,
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

    const createAgendarCita = async event => {
        event.preventDefault();
        try{
            await sendRequest(
                process.env.REACT_APP_ + "agendar-cita/createDate",
                'POST',
                JSON.stringify({
                  idPaciente: formState.inputs.idPaciente.value,
                  idDoctor: formState.inputs.idDoctor.value,
                  time: getDateTime,
                  date: getDateDay,
                  messagePaciente: formState.inputs.messagePaciente.value,
                  doctorPrice: formState.inputs.doctorPrice.value
                }),
                {
                  'Content-Type': 'application/json'
                },
            )
            closeModal()
        }catch(err){
            alert(err)
        }
    }

    console.log({horarioDoctor:props.horarioDoctor})

    return <>
    <ModalComponent
        headerTitle='You can not access for now'
        show={error}
        onCancel={clearError}
    >
        {error}
    </ModalComponent>
    <NestedModal
        className="class-PopUpAgendarCita"
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
                <CustomDay
                    getDate={(day)=>setGetDateDay(day)}
                    getDayNumber={(numberDay)=>setgetDayNumber(numberDay)}
                    horarioDoctor={props.horarioDoctor}
                />
                <TimeAvaiable
                    horarioDoctor={props.horarioDoctor}
                    getDayNumber={getDayNumber}
                    getTime={(time)=>setGetDateTime(time)}
                />
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
                onClick={step === 1 ? createAgendarCita : ()=>setStep(step + 1)}
                variantName="contained"
                buttonName={step === 1 ? "Solicitar" : "Siguiente"}
                disabled={
                    getDateDay === "" ||
                    getDateDay === "" ||
                    formState.inputs.messagePaciente.value === ""
                }
            />
        </>}
    /> </>
}