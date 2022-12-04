import React, { useEffect, useState } from "react";
import BasicButtons from "../../components/UIElements/BasicButtons-MUI";
import { faCamera, faCheck } from '@fortawesome/free-solid-svg-icons';
import FormControl from '@mui/material/FormControl';
import FormUserDataCreateUser from "../../components/paciente/FormUserDataCreateUser";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from '../../shared/hooks/http-hook';
import ModalComponent from '../../components/UIElements/ModalComponent';
import AddDayAndTimeWork from "../../components/paciente/AddDayAndTimeWork";

export default function CreateUserOrDoctor() {
    const [step, setStep] = useState(true);

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const [formState, inputHandler, setFormData] = useForm(
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
                value: '',
                isValid: false
            },
            email: {
                value: '',
                isValid: false
            },
            telefono: {
                value: '',
                isValid: false
            }
        },
        false
    );

    const switchDoctorOrPacient = () => {

        if(step){
            setFormData(
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
                        value: '',
                        isValid: false
                    },
                    email: {
                        value: '',
                        isValid: false
                    },
                    telefono: {
                        value: '',
                        isValid: false
                    }
                },
                false
            )
            // console.log("step true",formState.inputs)
        } else{
            setFormData(
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
                        value: '',
                        isValid: false
                    },
                    email: {
                        value: '',
                        isValid: false
                    },
                    telefono: {
                        value: '',
                        isValid: false
                    },
                    specialty: {
                        value: "pediatra",
                        isValid: true
                    },
                    laborDays: {
                        value: {
                            su: false,
                            mo: true,
                            tu: true,
                            we: true,
                            th: true,
                            fr: true,
                            sa: false
                        },
                        isValid: true
                    },
                    hourStart: {
                        value: "8:00",
                        isValid: true
                    },
                    hourFinish: {
                        value: "17:00",
                        isValid: true
                    },
                    location: {
                        value: {
                            lan: 23.42352,
                            lng: 43.35453,
                            address: "calle sadas santo domingo"
                        },
                        isValid: true
                    },
                },
                false
            )
            // console.log("step false",formState.inputs)
        }
    }

    const CreateDoctorOrPacienteFunction = async event => {
        event.preventDefault();
        console.log("step",step)

        if(step){
            alert("NEWWWWWW")
            try{
                await sendRequest(
                    process.env.REACT_APP_ + "paciente/createPaciente",
                    'POST',
                    JSON.stringify({
                        cedula: formState.inputs.cedula.value,
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value,
                        telefono: formState.inputs.telefono.value,
                        name: formState.inputs.name.value,
                    }),
                    {
                        'Content-Type': 'application/json'
                    },
                )
                console.log("formState.inputs",formState.inputs)
        } catch(err){}
        } else{
            try{
                await sendRequest(
                  process.env.REACT_APP_ + "doctor/createDoctor",
                  'POST',
                  JSON.stringify({
                    name: formState.inputs.name.value,
                    password: formState.inputs.password.value,
                    cedula: formState.inputs.cedula.value,
                    email: formState.inputs.email.value,
                    specialty: formState.inputs.specialty.value,
                    telefono: formState.inputs.telefono.value,
                    laborDays: formState.inputs.laborDays.value,
                    hourStart: formState.inputs.hourStart.value,
                    hourFinish: formState.inputs.hourFinish.value,
                    location: formState.inputs.location.value,
                  }),
                  {
                    'Content-Type': 'application/json'
                  },
                )
            } catch(err){}
        }

    }

    useEffect(()=>{
        switchDoctorOrPacient()
    },[step])

    useEffect(()=>{
        localStorage.removeItem("stepLS")
    },[step])

    return <>
        <ModalComponent
            headerTitle='You can not access for now'
            show={error}
            onCancel={clearError}
        >
            {error}
        </ModalComponent>
        {isLoading && <h1>Loading...</h1>}
        <form onSubmit={CreateDoctorOrPacienteFunction} className={step ? "class-CreateUser" : "class-CreateUser class-CreateDoctor"}>
            <span>
                <FormControl>
                    <label>Elige tu medico de preferencia, fecha y hora de la cita</label>
                    <BasicButtons
                        onClick={()=> setStep(true)}
                        variantName="contained"
                        buttonName="Paciente"
                        className=""
                    />
                    <BasicButtons
                        onClick={()=> setStep(false)}
                        variantName="contained"
                        buttonName="Doctor/a"
                        className=""
                    />
                </FormControl>
                <div>
                    <div>
                        <img
                            src="https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile.png"
                            alt=""
                        />
                    </div>
                    <BasicButtons
                        onClick={()=>{}}
                        variantName="contained"
                        className=""
                        iconName={faCamera}
                    />
                </div>
            </span>
            <FormUserDataCreateUser
                arrayInputs={step ? [
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
                        element:"input",
                        id:"cedula",
                        type:"text",
                        label:"Cédula",
                        validators:[],
                        errorText:"Please enter a valid Cédula.",
                        onInput:inputHandler
                    },
                    {
                        element:"input",
                        id:"telefono",
                        type:"tel",
                        label:"Teléfono",
                        validators:[],
                        errorText:"Please enter a valid Teléfono.",
                        onInput:inputHandler
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
                        element:"input",
                        id:"password",
                        type:"password",
                        label:"Contraseña",
                        validators:[],
                        errorText:"Please enter a valid Contraseña.",
                        onInput:inputHandler
                    }
                ]
                :
                [
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
                        element:"input",
                        id:"cedula",
                        type:"text",
                        label:"Cédula",
                        validators:[],
                        errorText:"Please enter a valid Cédula.",
                        onInput:inputHandler
                    },
                    {
                        element:"input",
                        id:"telefono",
                        type:"tel",
                        label:"Teléfono",
                        validators:[],
                        errorText:"Please enter a valid Teléfono.",
                        onInput:inputHandler
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
                        element:"input",
                        id:"password",
                        type:"password",
                        label:"Contraseña",
                        validators:[],
                        errorText:"Please enter a valid Contraseña.",
                        onInput:inputHandler
                    },
                    {
                        element:"select",
                        id:"specialty",
                        type:"select",
                        label:"Especialidad",
                        validators:[],
                        errorText:"Please enter a valid Especialidad.",
                        onInput:inputHandler,
                        filterArray:[
                            {
                                value:"62b15e069cb7c9046ab0aef2",
                                name:"nombre especialidad"
                            }
                        ]
                    }
                ]}
            />
            {!step && <AddDayAndTimeWork/>}
            <BasicButtons
                onClick={()=>{}}
                variantName="contained"
                buttonName="Listo"
                iconName={faCheck}
            />
            <button>
                SAVE
            </button>
        </form>
    </>
}