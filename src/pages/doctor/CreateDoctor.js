// CreateDoctor
import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import BasicButtons from "../../components/UIElements/BasicButtons-MUI";
import { faCamera, faCheck } from '@fortawesome/free-solid-svg-icons';
import FormControl from '@mui/material/FormControl';
import FormUserDataCreateUser from "../../components/paciente/FormUserDataCreateUser";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from '../../shared/hooks/http-hook';
import ModalComponent from '../../components/UIElements/ModalComponent';
import AddDayAndTimeWork from "../../components/paciente/AddDayAndTimeWork";
import { AuthContext } from "../../shared/context/auth-context";

export default function CreatePaciente() {
    const History = useHistory()
    const auth = useContext(AuthContext);
    const [getHorario, setGetHorario] = useState([]);
    const [getTelephone, setGetTelephone] = useState("");
    const [getCedula, setGetCedula] = useState("");
    const [getSpecialty, setSpecialty] = useState([]);

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    useEffect(()=>{
        const getSpecialtyFunction = async () => {
            try{
                const specialty = await sendRequest(process.env.REACT_APP_ + 'specialty/')
                setSpecialty(specialty)
            } catch(err){
            }
        }
        getSpecialtyFunction()
    },[sendRequest])


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
                isValid: true
            },
            email: {
                value: '',
                isValid: false
            },
            telefono: {
                value: getTelephone,
                isValid: true
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
    );

    const CreateDoctorOrPacienteFunction = async event => {
        event.preventDefault();
        try{
            const responseData = await sendRequest(
              process.env.REACT_APP_ + "doctor/createDoctor",
              'POST',
              JSON.stringify({
                name: formState.inputs.name.value,
                password: formState.inputs.password.value,
                cedula: getCedula,
                email: formState.inputs.email.value,
                specialty: formState.inputs.specialty.value,
                telefono: getTelephone,
                address: formState.inputs.address.value,
                googleMapsLink: formState.inputs.googleMapsLink.value,
                horario: getHorario,
              }),
              {
                'Content-Type': 'application/json'
              },
            )
            auth.login(responseData.doctorId, responseData.token, responseData.rol);
        } catch(err){
            alert(err)
        }
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
        {isLoading && <h1>Loading...</h1>}
        <form onSubmit={CreateDoctorOrPacienteFunction} className={"class-CreateUser class-CreateDoctor"}>
            <span>
                <FormControl>
                    <label>Elige el tipo de cuenta que vas a crear</label>
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
            <AddDayAndTimeWork sendTimeCreated={getHorario} passDataFunction={(time)=>setGetHorario(time)}/>
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