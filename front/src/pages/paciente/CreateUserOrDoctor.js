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

    const switchDoctorOrPacient = (boolean) => {
        setStep(boolean)

        if(boolean){
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
            console.log("step true",formState.inputs)
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
                        value: '',
                        isValid: false
                    }
                },
                false
            )
            console.log("step false",formState.inputs)
        }
    }

    const CreateDoctorOrPacienteFunction = async event => {
        alert("HEREEEE")
        event.preventDefault();

        console.log("formState.inputs",formState.inputs)
        console.log("step",step)

        if(step){
            try{

            } catch(err){}
        } else{
            try{
                const formData = new FormData()
                formData.append('name',formState.inputs.name.value)
                formData.append('password',formState.inputs.password.value)
                formData.append('cedula',formState.inputs.cedula.value)
                formData.append('email', formState.inputs.email.value)
                formData.append('telefono', formState.inputs.telefono.value)
                formData.append('specialty', "pediatra")
                formData.append('laborDays', {
                    su: false,
                    mo: true,
                    tu: true,
                    we: true,
                    th: true,
                    fr: true,
                    sa: false
                })
                formData.append('hourStart', "8:00")
                formData.append('hourFinish', "17:00")
                formData.append('location', {
                    lan: 23.42352,
                    lng: 43.35453,
                    address: "calle sadas santo domingo"
                })

                await sendRequest(
                  process.env.REACT_APP_ + "doctor/createDoctor",
                  'POST',
                  formData
                )

                console.log("formData",formData)
            } catch(err){}
        }

    }

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
                        onClick={()=> switchDoctorOrPacient(true)}
                        variantName="contained"
                        buttonName="Paciente"
                        className=""
                    />
                    <BasicButtons
                        onClick={()=> switchDoctorOrPacient(false)}
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
                        id:"Nombre",
                        type:"text",
                        label:"Nombre",
                        validators:[],
                        errorText:"Please enter a valid Nombre.",
                        onInput:{inputHandler}
                    },
                    {
                        element:"input",
                        id:"Cédula",
                        type:"text",
                        label:"Cédula",
                        validators:[],
                        errorText:"Please enter a valid Cédula.",
                        onInput:{inputHandler}
                    },
                    {
                        element:"input",
                        id:"Teléfono",
                        type:"tel",
                        label:"Teléfono",
                        validators:[],
                        errorText:"Please enter a valid Teléfono.",
                        onInput:{inputHandler}
                    },
                    {
                        element:"input",
                        id:"Correo",
                        type:"email",
                        label:"Correo",
                        validators:[],
                        errorText:"Please enter a valid Correo.",
                        onInput:{inputHandler}
                    },
                    {
                        element:"input",
                        id:"Contraseña",
                        type:"password",
                        label:"Contraseña",
                        validators:[],
                        errorText:"Please enter a valid Contraseña.",
                        onInput:{inputHandler}
                    }
                ]
                :
                [
                    {
                        element:"input",
                        id:"Nombre",
                        type:"text",
                        label:"Nombre",
                        validators:[],
                        errorText:"Please enter a valid Nombre.",
                        onInput:{inputHandler}
                    },
                    {
                        element:"input",
                        id:"Cédula",
                        type:"text",
                        label:"Cédula",
                        validators:[],
                        errorText:"Please enter a valid Cédula.",
                        onInput:{inputHandler}
                    },
                    {
                        element:"input",
                        id:"Teléfono",
                        type:"tel",
                        label:"Teléfono",
                        validators:[],
                        errorText:"Please enter a valid Teléfono.",
                        onInput:{inputHandler}
                    },
                    {
                        element:"input",
                        id:"Correo",
                        type:"email",
                        label:"Correo",
                        validators:[],
                        errorText:"Please enter a valid Correo.",
                        onInput:{inputHandler}
                    },
                    {
                        element:"input",
                        id:"Contraseña",
                        type:"password",
                        label:"Contraseña",
                        validators:[],
                        errorText:"Please enter a valid Contraseña.",
                        onInput:{inputHandler}
                    },
                    {
                        element:"select",
                        id:"Especialidad",
                        type:"select",
                        label:"Especialidad",
                        validators:[],
                        errorText:"Please enter a valid Especialidad.",
                        onInput:{inputHandler},
                        filterArray:[
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