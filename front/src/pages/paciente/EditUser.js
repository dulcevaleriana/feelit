import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import BasicButtons from "../../components/UIElements/BasicButtons-MUI";
import { faCamera, faCheck } from '@fortawesome/free-solid-svg-icons';
import FormControl from '@mui/material/FormControl';
import FormUserDataCreateUser from "../../components/paciente/FormUserDataCreateUser";
import { AuthContext } from "../../shared/context/auth-context";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from '../../shared/hooks/http-hook';

export default function EditUser() {
    const auth = useContext(AuthContext);
    const { sendRequest } = useHttpClient();
    const history = useHistory();

    const [getUser, setGetUser] = useState(null)
    const [getTelephone, setGetTelephone] = useState("");
    const [getCedula, setGetCedula] = useState("");

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
            try{
                const response = await sendRequest(process.env.REACT_APP_ + 'paciente/' + auth.userId);
                setGetUser(response.getPacienteById)
                setGetCedula(response.getPacienteById.cedula)
                setGetTelephone(response.getPacienteById.telefono)
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
            }catch(err){}
        }
        getUserFunction()
      },[sendRequest,auth.userId,setFormData])

    const EditDoctorOrPacienteFunction = async event => {
        event.preventDefault();

        try{
            await sendRequest(
                process.env.REACT_APP_ + `paciente/${auth.userId}`,
                'PATCH',
                JSON.stringify({
                    cedula: getCedula,
                    email: formState.inputs.email.value,
                    password: "123456789",
                    // password: formState.inputs.password.value,
                    telefono: getTelephone,
                    name: formState.inputs.name.value,
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
    console.log({formState})

    return <form onSubmit={EditDoctorOrPacienteFunction} className={"class-CreateUser class-editUser"}>
        <span>
            <FormControl>
                <label>Este es tu tipo de usuario:</label>
                <h5>paciente</h5>
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
                //     onInput:inputHandler,
                //     value:getUser?.email
                // },
                // {
                //     element:'password',
                //     id:"password",
                //     type:"password",
                //     label:"Contraseña",
                //     validators:[],
                //     errorText:"Please enter a valid Contraseña.",
                //     onInput:inputHandler,
                //     value:getUser?.password
                // }
            ]}/>
        <BasicButtons
            variantName="contained"
            buttonName="Guardar"
            iconName={faCheck}
            type="submit"
        />
    </form>
}