import React, { useContext, useState, useEffect } from 'react';
import FormControl from '@mui/material/FormControl';
import { useHistory } from 'react-router-dom';
import BasicButtons from "../../components/UIElements/BasicButtons-MUI";
import { faTrash, faPen, faEye } from '@fortawesome/free-solid-svg-icons';
import NestedModal from "../../components/UIElements/NestedModal";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from '../../shared/hooks/http-hook';

export default function SeeAccount(){
    const history = useHistory();
    const auth = useContext(AuthContext);
    const { sendRequest } = useHttpClient();
    const [getUser, setGetUser] = useState(null)
    const [getAgendarCita, setGetAgendarCita] = useState([])

    useEffect(()=>{
      const getUserFunction = async () => {
        if(auth.rol === "638f3dc51af87455b52cf7d4"){
          const response = await sendRequest(process.env.REACT_APP_ + 'doctor/'+ auth.userId);
          setGetUser(response);
        }
        if(auth.rol === "638f3ddd1af87455b52cf7d7"){
          const response = await sendRequest(process.env.REACT_APP_ + 'paciente/' + auth.userId);
          setGetUser(response);
        }
      }
      getUserFunction()
    },[sendRequest,auth.rol,auth.userId])

    useEffect(()=>{
        const getAgendarCitaDetails = () => {
            if(getUser !== null && getUser.getPacienteById.agendarCita.length > 0){
                getUser.getPacienteById.agendarCita.map(async data => {
                    const response = await sendRequest(process.env.REACT_APP_ + 'agendar-cita/'+ data);
                    setGetAgendarCita([...getAgendarCita,response]);
                })
            }
        }
        getAgendarCitaDetails()
        // eslint-disable-next-line
    },[getUser])

    const GetDoctorData = (idDoctor) => {
        const [getResponse, setGetResponse] = useState(null)
        let id = idDoctor.idDoctor;

        useEffect(()=>{
            const fetchData = async () => {
                let response = await sendRequest(process.env.REACT_APP_ + 'doctor/'+ id);
                setGetResponse(response)
            }
            fetchData()
        },[id])

        console.log({getResponse})
        console.log({idDoctor: idDoctor.idDoctor})
        return <div>
            <h5>{getResponse?.getDoctorById?.name}</h5>
            <h5>{getResponse?.getDoctorById?.telefono}</h5>
        </div>
    }

    console.log({getUser})
    console.log({getAgendarCita})

    const deleteAccount = () => {
        localStorage.setItem("popUpAccountDeleted",true);
        auth.logout();
        history.push("/auth");
    }

    return(
        <div className='class-SeeAccount'>
            <div>
                <div>
                    <span>Mi cuenta</span>
                </div>
                <FormControl>
                    <BasicButtons
                        onClick={()=>history.push(`/EditUserOrDoctor/${false}`)}
                        variantName="contained"
                        buttonName={"Editar"}
                        className={""}
                        iconName={faPen}
                    />
                    <NestedModal
                        withButton={true}
                        name="Eliminar Cuenta"
                        icon={faTrash}
                        variantName="contained"
                        title="Eliminar Cuenta"
                        message="Dulce, estas segura que quieres eliminar tu cuenta?"
                        cancelButton={true}
                        buttonOptions={
                            <BasicButtons
                                onClick={deleteAccount}
                                variantName="contained"
                                buttonName={"Eliminar"}
                            />
                        }
                    />
                </FormControl>
            </div>
            <div>
                <div>
                    <img src="https://cdn.pixabay.com/photo/2017/03/14/03/20/woman-2141808__480.jpg" alt="img"/>
                </div>
                <div>
                    <h5>Nombre</h5>
                    <label>{getUser && getUser.getPacienteById.name ? getUser.getPacienteById.name : "N/A"}</label>
                </div>
                <div>
                    <h5>Cédula</h5>
                    <label>{getUser && getUser.getPacienteById.cedula ? getUser.getPacienteById.cedula : "N/A"}</label>
                </div>
                <div>
                    <h5>Teléfono</h5>
                    <label>{getUser && getUser.getPacienteById.telefono ? getUser.getPacienteById.telefono : "N/A"}</label>
                </div>
                <div>
                    <h5>Rol</h5>
                    <label>{getUser && getUser.getPacienteById.rol ? getUser.getPacienteById.rol : "N/A"}</label>
                </div>
                <div>
                    <h5>Correo</h5>
                    <label>{getUser && getUser.getPacienteById.email ? getUser.getPacienteById.email : "N/A"}</label>
                </div>
                {auth.rol === "638f3dc51af87455b52cf7d4" ?? <>
                    <div>
                        <h5>Horario laboral</h5>
                        <label>M - T - T || 2:00 pm - 6:00 pm</label>
                    </div>
                </>}
            </div>
            <div>
                <h4>Gestionar mis citas Recientes</h4>
                <BasicButtons
                    onClick={()=>{}}
                    variantName="contained"
                    buttonName={"Ver más"}
                    className={""}
                    iconName={faEye}
                />
            </div>
            <div>
                {getAgendarCita && getAgendarCita.length > 0 ? getAgendarCita.map((data,key) => (
                    <div key={key}>
                        <div>
                            <img src="https://cdn.pixabay.com/photo/2017/03/14/03/20/woman-2141808__480.jpg" alt="img"/>
                        </div>
                        <h4>{data.getAgendarCitaId.date}</h4>
                        <GetDoctorData idDoctor={data.getAgendarCitaId.idDoctor}/>
                        <h5>Agendar Cita</h5>
                        <h5>{data.getAgendarCitaId.status}</h5>
                        <h5>{data.getAgendarCitaId.link}</h5>
                    </div>
                )) : <></>}
            </div>
        </div>
    )
}