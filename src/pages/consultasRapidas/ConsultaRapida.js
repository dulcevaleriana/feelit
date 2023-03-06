import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import DoctorGallery from '../../components/ConsultaRapidaComponent/DoctorGallery';
import StaticTimePickerDemo from '../../components/UIElements/StaticTimePickerDemo';
import DoctorSelected from '../../components/ConsultaRapidaComponent/DoctorSelected';
import PacienteData from '../../components/ConsultaRapidaComponent/PacienteData';
import FormPayment from '../../components/ConsultaRapidaComponent/FormPayment';
import MessageComponent from "../../components/ConsultaRapidaComponent/MessageComponent";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from '../../shared/hooks/http-hook';
import BasicButtons from "../../components/UIElements/BasicButtons-MUI";
import FormUserDataCreateUser from "../../components/paciente/FormUserDataCreateUser";
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { faAnglesRight, faMoneyBillTransfer, faAnglesLeft } from '@fortawesome/free-solid-svg-icons';
import ModalComponent from '../../components/UIElements/ModalComponent';
import { AuthContext } from "../../shared/context/auth-context";

export default function ConsultaRapida(){
    const auth = useContext(AuthContext);
    const History = useHistory()

    const [step, setStep] = useState(0);
    const [getDoctor, setGetDoctor] = useState(null);
    const [time, setTime] = useState("");
    const [getTelephone, setGetTelephone] = useState("");
    const [getCedula, setGetCedula] = useState("");
    const [goToAgendarCita, setGoToAgendarCita] = useState(false)

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

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
            time: {
                value: time,
                isValid: true
            },
            messagePaciente: {
                value: '',
                isValid: false
            },
            doctorPrice: {
                value: getDoctor?.consultaRapidaPrice,
                isValid: true
            }
        },
        false
    );

    console.log({getDoctor})

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

    const createConsultaRapidaWithoutLoging = async event => {
        event.preventDefault();

        const getPaciente = JSON.parse(localStorage.getItem("savePacienteCreated"))

        try{
            await sendRequest(
                process.env.REACT_APP_ + "consultas-rapidas/createConsultaRapida",
                'POST',
                JSON.stringify({
                  idPaciente: getPaciente.pacienteId,
                  idDoctor: getDoctor?.id,
                  time: time,
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

    const loginAndSawServices = () => {
        const getPaciente = JSON.parse(localStorage.getItem("savePacienteCreated"))
        auth.login(getPaciente.pacienteId, getPaciente.token, getPaciente.rol);
        History.push('/')
    }

    return <>
    <ModalComponent
        headerTitle='You can not access for now'
        show={error}
        onCancel={clearError}
    >
        {error}
    </ModalComponent>
    <ModalComponent
        headerTitle='Quieres otra fecha?'
        show={goToAgendarCita}
        onCancel={()=>setGoToAgendarCita(false)}
        className="class-modal-agendarCita"
    >
        <p>Para tener una cita con este doctor otro día debe agendar una cita tradicional</p>
        <div>
            <BasicButtons
                onClick={()=>setGoToAgendarCita(false)}
                variantName="outlined"
                buttonName="Cancelar"
            />
            <BasicButtons
                onClick={()=>History.push('/AgendarCita/create')}
                variantName="outlined"
                buttonName="Agendar cita"
            />
        </div>
    </ModalComponent>
    {isLoading && <h1>Loading...</h1>}
    <div className={step === 0 ? "class-ConsultaRapida-step1" : step === 1 ? "class-ConsultaRapida-step2" : "class-ConsultaRapida-step3"}>
        {step === 0 && <>
            <DoctorGallery
                functionFilter={data => data?.consultaRapidaPrice !== 0}
                sendDoctor={(doctor)=>setGetDoctor(doctor)}
                time={time}
            />
            <StaticTimePickerDemo
                id="time"
                getTimeFunctionOut={(time)=>setTime(time)}
            />
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
            <DoctorSelected getDoctor={getDoctor}/>
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
            <MessageComponent onClick={loginAndSawServices}/>
        </>}
        {step !== 2 && <>
            <BasicButtons
                onClick={step === 1 ? ()=>setStep(step - 1) : ()=>setGoToAgendarCita(true)}
                variantName="outlined"
                buttonName={step === 0 ? "Quiero otra fecha" : step === 1 ? "Volver" : ""}
                iconName={step === 0 ? faClock : step === 1 ? faAnglesLeft : ""}
            />
            <BasicButtons
                onClick={step === 0 ? createPacienteWithoutLoging : createConsultaRapidaWithoutLoging}
                variantName="contained"
                buttonName={step === 0 ? "Siguiente" : step === 1 ? "Pagar ahora" : ""}
                iconName={step === 0 ? faAnglesRight : step === 1 ? faMoneyBillTransfer : ""}
                disabled={step === 0 ? (
                    getDoctor === null ||
                    time === "" ||
                    getTelephone === "" ||
                    getCedula === "" ||
                    formState.inputs.messagePaciente.value === "" ||
                    formState.inputs.name.value === "" ||
                    formState.inputs.email.value === "" ||
                    formState.inputs.password.value === ""
                    ) : step === 1 && false}
            />
        </>}
    </div>
    </>
}