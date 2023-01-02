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

export default function EditUserOrDoctor() {
    const auth = useContext(AuthContext);
    const { sendRequest } = useHttpClient();
    const history = useHistory();

    const [getUser, setGetUser] = useState(null)
    const [getTelephone, setGetTelephone] = useState("");
    const [getCedula, setGetCedula] = useState("");
    const [getSpecialty, setSpecialty] = useState([]);
    const [getHorario, setGetHorario] = useState([]);

    const boolean = auth.rol === "638f3ddd1af87455b52cf7d7" ? true : false

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

    useEffect(()=>{
        const getUserFunction = async () => {
          if(auth.rol === "638f3dc51af87455b52cf7d4"){
            const response = await sendRequest(process.env.REACT_APP_ + 'doctor/'+ auth.userId);
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
            )
            setGetUser(response)
          }
          if(auth.rol === "638f3ddd1af87455b52cf7d7"){
            const response = await sendRequest(process.env.REACT_APP_ + 'paciente/' + auth.userId);
            setFormData(
                {
                    name: {
                        value: response.getPacienteById.name,
                        isValid: true
                    },
                    password: {
                        value: response.getPacienteById.password,
                        isValid: true
                    },
                    cedula: {
                        value: response.getPacienteById.cedula,
                        isValid: true
                    },
                    email: {
                        value: response.getPacienteById.email,
                        isValid: true
                    },
                    telefono: {
                        value: response.getPacienteById.telefono,
                        isValid: true
                    }
                },
                true
            )
            setGetUser(response)
          }
        }
        getUserFunction()
      },[sendRequest,auth.rol,auth.userId])

      console.log({getUser})

    const EditDoctorOrPacienteFunction = async event => {
        event.preventDefault();

        if(boolean){
            try{
                await sendRequest(
                    process.env.REACT_APP_ + "paciente/" + auth.userId,
                    'PATCH',
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

        } catch(err){}
        } else{
            try{
                await sendRequest(
                  process.env.REACT_APP_ + "doctor/" + auth.userId,
                  'PATCH',
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
            } catch(err){}
        }

    }

    console.log({formState, inputHandler, setFormData})

    return <form onSubmit={EditDoctorOrPacienteFunction} className={boolean ? "class-CreateUser class-editUser" : "class-CreateUser class-CreateDoctor class-editUser"}>
        <span>
            <FormControl>
                <label>Este es tu tipo de usuario:</label>
                <h5>{boolean === true ? "paciente" : "Doctor"}</h5>
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
        <FormUserDataCreateUser arrayInputs={boolean ? [
                    {
                        element:"input",
                        id:"name",
                        type:"text",
                        label:"Nombre",
                        validators:[],
                        errorText:"Please enter a valid Nombre.",
                        onInput:inputHandler,
                        valueEdited:getUser?.getPacienteById?.name
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
                ]}/>
        {boolean !== true && <AddDayAndTimeWork/>}
        <BasicButtons
            onClick={()=>history.push("/SeeAccount/:pacienteId")}
            variantName="contained"
            buttonName="Listo"
            iconName={faCheck}
        />
    </form>
}