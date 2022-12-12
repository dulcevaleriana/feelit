import React, { useEffect, useState, useContext } from "react";
import BasicButtons from "../../components/UIElements/BasicButtons-MUI";
import { faCamera, faCheck } from '@fortawesome/free-solid-svg-icons';
import FormControl from '@mui/material/FormControl';
import FormUserDataCreateUser from "../../components/paciente/FormUserDataCreateUser";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from '../../shared/hooks/http-hook';
import ModalComponent from '../../components/UIElements/ModalComponent';
import AddDayAndTimeWork from "../../components/paciente/AddDayAndTimeWork";
import { AuthContext } from "../../shared/context/auth-context";

export default function CreateUserOrDoctor() {
    const auth = useContext(AuthContext);
    const [step, setStep] = useState(true);
    const [getHorario, setGetHorario] = useState([]);
    const [getSpecialty, setSpecialty] = useState([]);

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    useEffect(()=>{
        const getSpecialtyFunction = async () => {
            try{
                const specialty = await sendRequest(process.env.REACT_APP_ + 'specialty/')
                setSpecialty(specialty)
            } catch(err){
                console.log(err)
            }
        }
        getSpecialtyFunction()
    },[sendRequest])


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
                    address: {
                        value: '',
                        isValid: true
                    },
                    googleMapsLink: {
                        value: '',
                        isValid: true
                    },
                    specialty: {
                        value: '',
                        isValid: true
                    },
                    horario: {
                        value: getHorario,
                        isValid: true
                    },
                },
                false
            )
        }
    }

    const CreateDoctorOrPacienteFunction = async event => {
        event.preventDefault();

        if(step){
            try{
                const responseData = await sendRequest(
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

                auth.login(responseData.userId, responseData.token, responseData.rol);

        } catch(err){}
        } else{
            try{
                const responseData = await sendRequest(
                  process.env.REACT_APP_ + "doctor/createDoctor",
                  'POST',
                  JSON.stringify({
                    name: formState.inputs.name.value,
                    password: formState.inputs.password.value,
                    cedula: formState.inputs.cedula.value,
                    email: formState.inputs.email.value,
                    specialty: formState.inputs.specialty.value,
                    telefono: formState.inputs.telefono.value,
                    address: formState.inputs.address.value,
                    googleMapsLink: formState.inputs.googleMapsLink.value,
                    horario: getHorario,
                  }),
                  {
                    'Content-Type': 'application/json'
                  },
                )

                auth.login(responseData.userId, responseData.token, responseData.rol);
            } catch(err){}
        }

    }

    useEffect(()=>{
        switchDoctorOrPacient()
        localStorage.removeItem("stepLS")
        // eslint-disable-next-line
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
                        element:'password',
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
                        element:'password',
                        id:'password',
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
                        filterArray:getSpecialty
                    }
                ]}
            />
            {!step && <AddDayAndTimeWork sendTimeCreated={getHorario} passDataFunction={(time)=>setGetHorario(time)}/>}
            <BasicButtons
                onClick={()=>{}}
                variantName="contained"
                buttonName="Crear cuenta"
                iconName={faCheck}
                type="submit"
            />
        </form>
    </>
}