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

    useEffect(()=>{
        const getUserFunction = async () => {
            if(auth.isLoggedIn === false){
                const response = await sendRequest(process.env.REACT_APP_ + 'doctor/')
                setGetList(response)
            } else {
                if(auth.rol === "638f3dc51af87455b52cf7d4"){
                    const response = await sendRequest(process.env.REACT_APP_ + 'doctor/'+ auth.userId);
                    setGetUser(response)
                    // setGetList(response.)
                }
                if(auth.rol === "638f3ddd1af87455b52cf7d7"){
                    const response = await sendRequest(process.env.REACT_APP_ + 'paciente/' + auth.userId);
                    setGetUser(response)
                    // setGetList(response.)
                }
            }
        }
        getUserFunction()
    },[sendRequest, auth.rol, auth.userId, auth.isLoggedIn])

    console.log({pacientID:auth.userId})
    console.log({isLoggedIn:auth.isLoggedIn})
    console.log({getUser})
    console.log({getList})

    return <div>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            { auth.rol === "638f3ddd1af87455b52cf7d7" ? "Mis Doctores" : auth.rol === "638f3dc51af87455b52cf7d4" ? "Mis Pacientes" : "Elige un Doctor" }
        </Typography>
        { auth.rol === "638f3ddd1af87455b52cf7d7" ? <div>
            My Doctor list
        </div> : auth.rol === "638f3dc51af87455b52cf7d4" ? <div>
            My pacient list
        </div> : <div>
            {getList?.getAllDoctor?.map((index, key) => <ActionAreaCard
                key={key}
                img={index.img}
                name={index.name}
                specialty={index.specialty}
                isLoggedIn={auth.isLoggedIn}
                onClick={()=>props.onClick()}/>)}
        </div> }
    </div>
}