import React, { useContext, useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import ActionAreaCard from '../UIElements/ActionAreaCard';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';

export default function ListChat(props){
    const { sendRequest } = useHttpClient();
    const auth = useContext(AuthContext);
    const [getUser, setGetUser] = useState(null)
    const [getList, setGetList] = useState(null)
    const [getSecondList, setGetSecondList] = useState(null)

    useEffect(()=>{
        const getUserFunction = async () => {
            const response = await sendRequest(process.env.REACT_APP_ + 'doctor/')
            setGetList(response)

            if(auth.rol === "638f3dc51af87455b52cf7d4"){
                const response = await sendRequest(process.env.REACT_APP_ + 'doctor/'+ auth.userId);
                setGetUser(response)
                // setGetSecondList(response.)
            }

            if(auth.rol === "638f3ddd1af87455b52cf7d7"){
                const response = await sendRequest(process.env.REACT_APP_ + 'paciente/' + auth.userId);
                setGetUser(response)
                setGetSecondList([
                    ...response.getPacienteById.agendarCita ,
                    ...response.getPacienteById.consultaRapida ,
                    ...response.getPacienteById.enviarExamenes
                ])
            }
        }
        getUserFunction()
    },[sendRequest, auth.rol, auth.userId, auth.isLoggedIn])

    console.log({pacientID:auth.userId})
    console.log({isLoggedIn:auth.isLoggedIn})
    console.log({getUser})
    console.log({getList})
    console.log({getSecondList})

    return <div>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            { auth.rol === "638f3ddd1af87455b52cf7d7" ? "Mis Doctores" : auth.rol === "638f3dc51af87455b52cf7d4" ? "Mis Pacientes" : "Elige un Doctor" }
        </Typography>

        { auth.rol === "638f3ddd1af87455b52cf7d7" ? <div>
            {getSecondList && getSecondList.length === 0 ? "Ahora mismo no tienes ningun chat pendiente, inicia un chat con algun medico aqui" : "My Doctor list"}
        </div> : auth.rol === "638f3dc51af87455b52cf7d4" ? <div>
            My pacient list
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
                onClick={()=>props.onClick()}/>)}
        </div>
    </div>
}