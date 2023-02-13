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
    const [consultaRapida, setConsultaRapida] = useState([])
    const [enviarExamenes, setEnviarExamenes] = useState([])

    useEffect(()=>{
      const getUserFunction = async () => {
        if(auth.rol === "638f3dc51af87455b52cf7d4"){
          const response = await sendRequest(process.env.REACT_APP_ + 'doctor/'+ auth.userId);
          setGetUser(response.getDoctorById);
        }
        if(auth.rol === "638f3ddd1af87455b52cf7d7"){
          const response = await sendRequest(process.env.REACT_APP_ + 'paciente/' + auth.userId);
          setGetUser(response.getPacienteById);
        }
      }
      getUserFunction()
    },[sendRequest,auth.rol,auth.userId])

    useEffect(()=>{
        const getAgendarCitaDetails = () => {
            if(getUser !== null && getUser.agendarCita.length > 0){
                getUser.agendarCita.map(async data => {
                    const response = await sendRequest(process.env.REACT_APP_ + 'agendar-cita/'+ data);
                    setGetAgendarCita([...getAgendarCita,response]);
                })
            }
        }
        const getConsultaRapidaDetails = () => {
            if(getUser !== null && getUser.consultaRapida.length > 0){
                getUser.consultaRapida.map(async data => {
                    const response = await sendRequest(process.env.REACT_APP_ + 'consultas-rapidas/'+ data);
                    setConsultaRapida([...consultaRapida,response]);
                })
            }
        }
        const getEnviarExamenesDetails = () => {
            if(getUser !== null && getUser.enviarExamenes.length > 0){
                getUser.enviarExamenes.map(async data => {
                    const response = await sendRequest(process.env.REACT_APP_ + 'enviar-examenes/'+ data);
                    setEnviarExamenes([...enviarExamenes,response]);
                })
            }
        }
        if(getUser !== null && getUser.agendarCita.length > 0) getAgendarCitaDetails()
        if(getUser !== null && getUser.consultaRapida.length > 0) getConsultaRapidaDetails()
        if(getUser !== null && getUser.enviarExamenes.length > 0) getEnviarExamenesDetails()
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

        return <div>
            <h5>{getResponse?.getDoctorById?.name}</h5>
            <h5>{getResponse?.getDoctorById?.telefono}</h5>
        </div>
    }

    const deleteAccount = async () => {
        try {
            if(auth.rol === "638f3dc51af87455b52cf7d4"){
                await sendRequest(
                    process.env.REACT_APP_ + 'doctor/' + auth.userId,
                    'DELETE'
                );
            }
            if(auth.rol === "638f3ddd1af87455b52cf7d7"){
                await sendRequest(
                    process.env.REACT_APP_ + 'paciente/' + auth.userId,
                    'DELETE'
                );
            }
        } catch(err){

        } finally {
            localStorage.setItem("popUpAccountDeleted",true);
            auth.logout();
            history.push("/");
        }
    }

    return(
        <div className='class-SeeAccount'>
            <div>
                <div>
                    <span>Mi cuenta</span>
                </div>
                <FormControl>
                    <BasicButtons
                        onClick={()=>history.push(auth.rol === "638f3ddd1af87455b52cf7d7" ? `/EditUser` : `/EditDoctor`)}
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
                    <div>
                        <h5>Nombre</h5>
                        <label>{getUser && getUser.name ? getUser.name : "N/A"}</label>
                    </div>
                    <div>
                        <h5>Cédula</h5>
                        <label>{getUser && getUser.cedula ? getUser.cedula : "N/A"}</label>
                    </div>
                    <div>
                        <h5>Teléfono</h5>
                        <label>{getUser && getUser.telefono ? getUser.telefono : "N/A"}</label>
                    </div>
                    <div>
                        <h5>Rol</h5>
                        <label>{getUser && getUser.rol ? auth.rol === "638f3dc51af87455b52cf7d4" ? "Doctor" : auth.rol === "638f3ddd1af87455b52cf7d7" ? "Paciente" : "No Idea" : "N/A"}</label>
                    </div>
                    <div>
                        <h5>Correo</h5>
                        <label>{getUser && getUser.email ? getUser.email : "N/A"}</label>
                    </div>
                    {auth.rol === "638f3dc51af87455b52cf7d4" ? <div>
                        <h5>Horario laboral</h5>
                        <div>
                            {getUser?.horario.map(data => <div>
                                <h6>{data.dia}</h6>
                                <label>Entrada: {data.entrada}</label>
                                <label>Salida: {data.salida}</label>
                            </div>)}
                        </div>
                    </div> : null}
                </div>
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
                { getAgendarCita && getAgendarCita.length > 0 ? getAgendarCita.map((data,key) => (
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
                )) : <></> }
                { consultaRapida && consultaRapida.length > 0 ? consultaRapida.map((data,key) => (
                    <div key={key}>
                        <div>
                            <img src="https://cdn.pixabay.com/photo/2017/03/14/03/20/woman-2141808__480.jpg" alt="img"/>
                        </div>
                        <h4>{data.getConsultasRapidasId.dateCreated}</h4>
                        <GetDoctorData idDoctor={data.getConsultasRapidasId.idDoctor}/>
                        <h5>Consultas Rapidas</h5>
                        <h5>{data.getConsultasRapidasId.status}</h5>
                        <h5>{data.getConsultasRapidasId.link}</h5>
                    </div>
                )) : <></> }
                { enviarExamenes && enviarExamenes.length > 0 ? enviarExamenes.map((data,key) => (
                    <div key={key}>
                        <div>
                            <img src="https://cdn.pixabay.com/photo/2017/03/14/03/20/woman-2141808__480.jpg" alt="img"/>
                        </div>
                        <h4>{data.getEnviarExamenesId.dateCreated}</h4>
                        <GetDoctorData idDoctor={data.getEnviarExamenesId.idDoctor}/>
                        <h5>Enviar Examenes</h5>
                        <h5>{data.getEnviarExamenesId.status}</h5>
                        <h5>{data.getEnviarExamenesId.link}</h5>
                    </div>
                )) : <></> }
            </div>
        </div>
    )
}