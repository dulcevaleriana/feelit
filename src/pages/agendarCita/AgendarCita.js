import React, { useEffect, useState } from "react";
import DoctorGallery from '../../components/ConsultaRapidaComponent/DoctorGallery';
import DoctorSelected from '../../components/ConsultaRapidaComponent/DoctorSelected';
import PacienteData from '../../components/ConsultaRapidaComponent/PacienteData';
import FormPayment from '../../components/ConsultaRapidaComponent/FormPayment';
import MessageComponent from "../../components/ConsultaRapidaComponent/MessageComponent";
import TimeAvaiable from "../../components/AgendarCita/TimeAvaiable";

import BasicButtons from "../../components/UIElements/BasicButtons-MUI";

import { faAnglesRight, faMoneyBillTransfer, faAnglesLeft, faClock, faX, faSearch, faCheck } from '@fortawesome/free-solid-svg-icons';

import FormControl from '@mui/material/FormControl';
import CustomDay from "../../components/UIElements/CustomDay";
import NestedModal from "../../components/UIElements/NestedModal";

import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';

import FormUserDataCreateUser from "../../components/paciente/FormUserDataCreateUser";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from '../../shared/hooks/http-hook';

import ModalComponent from '../../components/UIElements/ModalComponent';

export default function AgendarCita(props){
    const [step, setStep] = useState(localStorage.stepLS ? 2 : 0);
    const [stepVerifyDate, setStepVerifyDate] = useState(false);
    const [codigo] = useState("")
    // , setCodigo
    const [getTelephone, setGetTelephone] = useState("");
    const [getCedula, setGetCedula] = useState("");
    let [getDateDay, setGetDateDay] = useState('');
    const [getDayNumber, setgetDayNumber] = useState("");
    let [getDateTime, setGetDateTime] = useState('');
    const [getDoctor, setGetDoctor] = useState(null);

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    useEffect(()=>{
        localStorage.removeItem("stepLS")
    },[step])

    const [formState, inputHandler] = useForm(
        {
            name: {
                value: '',
                isValid: false
            },
            password: {
                value: '',
                isValid: false
            },
            cedula: {
                value: getCedula,
                isValid: false
            },
            email: {
                value: '',
                isValid: false
            },
            telefono: {
                value: getTelephone,
                isValid: false
            },
    
            idPaciente: {
                value: '',
                isValid: true
            },
            idDoctor: {
                value: getDoctor?.id,
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
                value: getDoctor?.agendarCitaPrice,
                isValid: true
            }
        },
        false
    );

    const createPacienteWithoutLoging = async event => {
        event.preventDefault();
        try{
            const responseData = await sendRequest(
                process.env.REACT_APP_ + "paciente/createPaciente",
                'POST',
                JSON.stringify({
                    cedula: getCedula,
                    email: formState.inputs.email.value,
                    password: formState.inputs.password.value,
                    telefono: getTelephone,
                    name: formState.inputs.name.value,
                }),
                {
                    'Content-Type': 'application/json'
                },
            )
            localStorage.setItem("savePacienteCreated",JSON.stringify({
                pacienteId:responseData.pacienteId,
                token:responseData.token,
                rol:responseData.rol
            }))
            setStep(step + 1)
            // auth.login(responseData.pacienteId, responseData.token, responseData.rol);
        } catch(err){}
    }

    const createAgendarCitaWithoutLoging = async event => {
        event.preventDefault();

        const getPaciente = JSON.parse(localStorage.getItem("savePacienteCreated"))

        try{
            await sendRequest(
                process.env.REACT_APP_ + "agendar-cita/createDate",
                'POST',
                JSON.stringify({
                  idPaciente: getPaciente.pacienteId,
                  idDoctor: getDoctor?.id,
                  date: getDateDay,
                  time: getDateTime,
                  messagePaciente: formState.inputs.messagePaciente.value,
                  doctorPrice: getDoctor?.consultaRapidaPrice
                }),
                {
                  'Content-Type': 'application/json'
                },
            )
            setStep(step + 1)
            // auth.login(responseData.pacienteId, responseData.token, responseData.rol);
        } catch(err){}
    }

    console.log({getDoctor})

    return <>
    <ModalComponent
        headerTitle='You can not access for now'
        show={error}
        onCancel={clearError}
    >
        {error}
    </ModalComponent>
    {isLoading && <h1>Loading...</h1>}
    <div className={step === 0 ? "class-AgendarCita-step1" : step === 1 ? "class-AgendarCita-step2" : "class-ConsultaRapida-step3"}>
        {step === 0 && <>
            <DoctorGallery
                sendDoctor={(doctor)=>setGetDoctor(doctor)}
                functionFilter={data => data?.agendarCitaPrice !== 0}
            />
            {getDoctor && <span>
                <CustomDay
                    getDate={(day)=>setGetDateDay(day)}
                    getDayNumber={(numberDay)=>setgetDayNumber(numberDay)}
                    horarioDoctor={getDoctor.horario}
                />
                <TimeAvaiable
                    horarioDoctor={getDoctor.horario}
                    getDayNumber={getDayNumber}
                    getTime={(time)=>setGetDateTime(time)}
                />
            </span>}
            <FormUserDataCreateUser
                arrayInputs={[
                    {
                        element:"input",
                        id:"name",
                        type:"text",
                        label:"Nombre",
                        validators:[],
                        errorText:"Please enter a valid Nombre.",
                        onInput:inputHandler
                    },
                    {
                        element:"mask",
                        id:"cedula",
                        type:"text",
                        label:"Cédula",
                        validators:[],
                        errorText:"Please enter a valid Cédula.",
                        onInput:inputHandler,
                        passData: (data)=>setGetCedula(data),
                        mask:"000-0000000-0"
                    },
                    {
                        element:"mask",
                        id:"telefono",
                        type:"text",
                        label:"Teléfono",
                        validators:[],
                        errorText:"Please enter a valid Teléfono.",
                        onInput:inputHandler,
                        passData: (data)=>setGetTelephone(data),
                        mask:"000-000-0000"
                    },
                    {
                        element:"input",
                        id:"email",
                        type:"email",
                        label:"Correo",
                        validators:[],
                        errorText:"Please enter a valid Correo.",
                        onInput:inputHandler
                    },
                    {
                        element:'password',
                        id:"password",
                        type:"password",
                        label:"Contraseña",
                        validators:[],
                        errorText:"Please enter a valid Contraseña.",
                        onInput:inputHandler
                    },
                    {
                        id:"messagePaciente",
                        label:"Mensaje",
                        validators:[],
                        errorText:"Please enter a valid Message.",
                        onInput:inputHandler
                    }
                ]}
            />
        </>}
        {step === 1 && <>
            <DoctorSelected/>
            <PacienteData
                message={formState.inputs.messagePaciente.value}
                pacienteData={{
                    cedula: getCedula,
                    email: formState.inputs.email.value,
                    telefono: getTelephone,
                    name: formState.inputs.name.value,
                }}
            />
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
                onClick={step === 0 ? createPacienteWithoutLoging : createAgendarCitaWithoutLoging}
                variantName="contained"
                buttonName={step === 0 ? "Siguiente" : step >= 1 ? "Pagar ahora" : ""}
                iconName={step === 0 ? faAnglesRight : step >= 1 ? faMoneyBillTransfer : ""}
            />
            </div>
        </>}
    </div>
    </>
}