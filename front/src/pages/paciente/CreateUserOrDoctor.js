import React, { useEffect, useState } from "react";
import BasicButtons from "../../components/UIElements/BasicButtons-MUI";
import { faCamera, faCheck } from '@fortawesome/free-solid-svg-icons';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormUserDataCreateUser from "../../components/paciente/FormUserDataCreateUser";
import AddDayAndTimeWork from "../../components/paciente/AddDayAndTimeWork";
import { useForm } from "../../shared/hooks/form-hook";

export default function CreateUserOrDoctor() {
    const [step, setStep] = useState(true);
    const [name ] = useState("")
    // setName

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

    console.log("formState",formState)

    const switchDoctorOrPacient = (boolean) => {
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
                    },
                    specialty: {
                        value: '',
                        isValid: false
                    }
                },
                false
            )
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
                    }
                },
                false
            )
        }
        setStep(boolean)
    }

    useEffect(()=>{
        localStorage.removeItem("stepLS")
    },[step])

    return <form className={step ? "class-CreateUser" : "class-CreateUser class-CreateDoctor"}>
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
            <FormControl>
                <InputLabel htmlFor="component-outlined">Nombre</InputLabel>
                <OutlinedInput
                id="component-outlined"
                value={name}
                onChange={()=>{}}
                label="Nombre"
                />
            </FormControl>
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
                    type:"number",
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
                    type:"number",
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
    </form>
}