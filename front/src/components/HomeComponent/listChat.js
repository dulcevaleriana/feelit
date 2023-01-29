import React, { useContext, useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import ActionAreaCard from '../UIElements/ActionAreaCard';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';

export default function ListChat(props){
    const { sendRequest } = useHttpClient();
    const auth = useContext(AuthContext);
    const [getList, setGetList] = useState(null)
    const [getSecondList, setGetSecondList] = useState(null)

    const GetChatDataFunction = (props) => {
        const [getResponse, setGetResponse] = useState(null)

        useEffect(()=>{
            const fetchData = async () => {
                let response;
                if(auth.rol === "638f3ddd1af87455b52cf7d7"){
                    response = await sendRequest(process.env.REACT_APP_ + 'doctor/' + props.id)
                }
                if(auth.rol === "638f3dc51af87455b52cf7d4"){
                    response = await sendRequest(process.env.REACT_APP_ + 'paciente/' + props.id)
                }
                setGetResponse(response)
            }
            fetchData()
        },[props.id])

        console.log({props})
        console.log({getResponse})

        return auth.rol === "638f3ddd1af87455b52cf7d7" ? <ActionAreaCard
            key={props.key}
            img={getResponse?.getDoctorById?.img}
            name={getResponse?.getDoctorById?.name}
            specialty={getResponse?.getDoctorById?.specialty}
            isLoggedIn={auth.isLoggedIn}
            messagePaciente={props.data.messagePaciente}
            onClick={()=>props.onClick()}
        /> : <ActionAreaCard
            key={props.key}
            img={getResponse?.getPacienteById?.img}
            name={getResponse?.getPacienteById?.name}
            specialty={null}
            isLoggedIn={auth.isLoggedIn}
            messagePaciente={props.data.messagePaciente}
            onClick={()=>props.onClick()}
        />
    }

    useEffect(()=>{
        const getUserFunction = async () => {
            const response = await sendRequest(process.env.REACT_APP_ + 'doctor/')
            setGetList(response)

            if(auth.rol === "638f3ddd1af87455b52cf7d7"){
                const response = await sendRequest(process.env.REACT_APP_ + 'paciente/getAllPacienteServices/' + auth.userId);
                setGetSecondList(response)
            }

            if(auth.rol === "638f3dc51af87455b52cf7d4"){
                const response = await sendRequest(process.env.REACT_APP_ + 'doctor/getAllDoctorServices/' + auth.userId);
                setGetSecondList(response)
            }
        }
        getUserFunction()
        // eslint-disable-next-line
    },[sendRequest, auth.rol, auth.userId, auth.isLoggedIn])

    console.log({getSecondList})

    return <div>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            { auth.rol === "638f3ddd1af87455b52cf7d7" ? "Mis Doctores" : auth.rol === "638f3dc51af87455b52cf7d4" ? "Mis Pacientes" : "Elige un Doctor" }
        </Typography>

        { auth.rol === "638f3ddd1af87455b52cf7d7" ? <div>
            {getSecondList &&
                getSecondList.length === 0 ?
                "Ahora mismo no tienes ningun chat pendiente, inicia un chat con algun medico aqui"
                :
                getSecondList?.getAllServices?.map((index, key) => <GetChatDataFunction idDoctor={index.idDoctor} key={key} data={index} onClick={props.onClick(index)}/>)}
        </div> : auth.rol === "638f3dc51af87455b52cf7d4" ? <div>
            My pacient list
            {getSecondList &&
                getSecondList.length === 0 ?
                "Ahora mismo no tienes ningun chat pendiente, espere a que un paciente lo solicite"
                :
                getSecondList?.getAllServices?.map((index, key) => <GetChatDataFunction id={index.idPaciente} key={key} data={index} onClick={props.onClick(index)}/>)}
        </div> : null}

        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Chatea con mas doctores
        </Typography>

        <div>
            {getList?.getAllDoctor?.map((index, key) => <ActionAreaCard
                key={key}
                img={index.img}
                name={index.name}
                specialty={index.specialty}
                isLoggedIn={auth.isLoggedIn}
                onClick={()=>props.onClick(index)}/>)}
        </div>
    </div>
}