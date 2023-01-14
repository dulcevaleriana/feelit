import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import BasicButtons from "../../components/UIElements/BasicButtons-MUI";
import { faCamera, faCheck } from '@fortawesome/free-solid-svg-icons';
import FormControl from '@mui/material/FormControl';
import FormUserDataCreateUser from "../../components/paciente/FormUserDataCreateUser";
import AddDayAndTimeWork from "../../components/paciente/AddDayAndTimeWork";
import { AuthContext } from "../../shared/context/auth-context";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from '../../shared/hooks/http-hook';

export default function EditDoctor() {
    const auth = useContext(AuthContext);
    const { sendRequest } = useHttpClient();
    const history = useHistory();

    const [getUser, setGetUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [getTelephone, setGetTelephone] = useState("");
    const [getCedula, setGetCedula] = useState("");
    const [getSpecialty, setSpecialty] = useState([]);
    const [getHorario, setGetHorario] = useState([]);

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
            },
            address: {
                value: '',
                isValid: false
            },
            googleMapsLink: {
                value: '',
                isValid: false
            },
            specialty: {
                value: '',
                isValid: false
            },
            horario: {
                value: '',
                isValid: false
            },
        },
        false
    );

    useEffect(()=>{
        const getUserFunction = async () => {
            setLoading(true);
            try {
                const response = await sendRequest(process.env.REACT_APP_ + 'doctor/'+ auth.userId);
                setGetUser(response.getDoctorById)
                setGetCedula(response.getDoctorById.cedula)
                setGetTelephone(response.getDoctorById.telefono)
                setGetHorario(response.getDoctorById.horario)
                setFormData(
                    {
                        name: {
                            value: response.getDoctorById.name,
                            isValid: true
                        },
                        password: {
                            value: response.getDoctorById.password
                            ,
                            isValid: true
                        },
                        cedula: {
                            value: response.getDoctorById.cedula,
                            isValid: true
                        },
                        email: {
                            value: response.getDoctorById.email,
                            isValid: true
                        },
                        telefono: {
                            value: response.getDoctorById.telefono,
                            isValid: true
                        },
                        address: {
                            value: response.getDoctorById.address,
                            isValid: true
                        },
                        googleMapsLink: {
                            value: response.getDoctorById.googleMapsLink,
                            isValid: true
                        },
                        specialty: {
                            value: response.getDoctorById.specialty,
                            isValid: true
                        },
                        horario: {
                            value: response.getDoctorById.horario,
                            isValid: true
                        },
                    },
                    true
                )
            } catch(err){
                console.log({err})
                setError(error);
                setLoading(false);
            } finally {
                setLoading(false);
            }
        }
        getUserFunction()
      },[ sendRequest, auth.userId, setFormData, error ])

    const EditDoctorOrPacienteFunction = async event => {
        event.preventDefault();

        try{
            await sendRequest(
                process.env.REACT_APP_ + `doctor/${auth.userId}`,
                'PATCH',
                JSON.stringify({
                    name: formState.inputs.name.value,
                    password: "123456789",
                    // password: formState.inputs.password.value,
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
            history.push(`/SeeAccount/${auth.userId}`)
        } catch(err){
            if (err instanceof DOMException && err.code === DOMException.ABORT_ERR) {
                alert(err)
            } else {
                alert(err)
                throw err;
            }
        }
    }

    console.log({getUser})
    console.log({formState, inputHandler, setFormData})

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>{error.message}</div>;
    }

    return <form onSubmit={EditDoctorOrPacienteFunction} className={"class-CreateUser class-CreateDoctor class-editUser"}>
        <span>
            <FormControl>
                <label>Este es tu tipo de usuario:</label>
                <h5>Doctor</h5>
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
            editVersion={true}
            arrayInputs={[
                    {
                        element:"input",
                        id:"name",
                        type:"text",
                        label:"Nombre",
                        validators:[],
                        errorText:"Please enter a valid Nombre.",
                        onInput:inputHandler,
                        value:getUser?.name
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
                        mask:"000-0000000-0",
                        value:getUser?.cedula
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
                        mask:"000-000-0000",
                        value:getUser?.telefono
                    },
                    // {
                    //     element:"input",
                    //     id:"email",
                    //     type:"email",
                    //     label:"Correo",
                    //     validators:[],
                    //     errorText:"Please enter a valid Correo.",
                    //     onInput:inputHandler
                    // },
                    // {
                    //     element:'password',
                    //     id:'password',
                    //     type:"password",
                    //     label:"Contraseña",
                    //     validators:[],
                    //     errorText:"Please enter a valid Contraseña.",
                    //     onInput:inputHandler
                    // },
                    {
                        element:"select",
                        id:"specialty",
                        type:"select",
                        label:"Especialidad",
                        validators:[],
                        errorText:"Please enter a valid Especialidad.",
                        onInput:inputHandler,
                        filterArray:getSpecialty,
                        value:getUser?.specialty
                    }
                ]}/>
        <AddDayAndTimeWork editVersion={true} sendTimeCreated={getHorario} passDataFunction={(time)=>setGetHorario(time)}/>
        <BasicButtons
            variantName="contained"
            buttonName="Guardar"
            iconName={faCheck}
            type="submit"
        />
    </form>
}