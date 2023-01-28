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

    const GetDoctorDataFunction = (idDoctor,data,key) => {
        const [getResponse, setGetResponse] = useState(null)

        useEffect(()=>{
            const fetchData = async () => {
                let response = await sendRequest(process.env.REACT_APP_ + 'doctor/' + idDoctor)
                setGetResponse(response)
            }
            fetchData()

            
        },[idDoctor])

        console.log({idDoctor})
        console.log({getResponse})

        return <ActionAreaCard
            key={key}
            img={getResponse?.img}
            name={getResponse?.name}
            specialty={getResponse?.specialty}
            isLoggedIn={auth.isLoggedIn}
            onClick={()=>props.onClick(data)}
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
                getSecondList?.getAllServices?.map((index, key) => <GetDoctorDataFunction idDoctor={index.idDoctor} key={key} data={index}/>)}
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
                onClick={()=>props.onClick(index)}/>)}
        </div>
    </div>
}