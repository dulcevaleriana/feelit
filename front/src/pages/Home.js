import React, { useState, useContext, useEffect } from "react";
import ListChat from "../components/HomeComponent/listChat";
import CitasPendientes from "../components/HomeComponent/citasPendientes";
import UltimasConsultas from "../components/HomeComponent/ultimasConsultas";
import ChatComponent from "../components/HomeComponent/ChatComponent";
import { useHttpClient } from '../shared/hooks/http-hook';
import { AuthContext } from '../shared/context/auth-context';

export default function Home() {
    const auth = useContext(AuthContext)
    const { sendRequest } = useHttpClient();
    const [activeChat, setActiveChat] = useState(false)
    const [getChatData, setChatData] = useState({})
    const [getSecondList, setGetSecondList] = useState(null)

    useEffect(()=>{
        const getUserFunction = async () => {
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

    const proofFunction = (data) => {
        console.log({data})
        localStorage.setItem('servicesData', JSON.stringify({
            id:data._id,
            type: data.docUpload ? "EnviarResultados" : data.date ? "AgendarCita" : "ConsultaRapida"
        }))
        setChatData(data)
        setActiveChat(true)
    }

    const proofFunctionFalse = () => {
        localStorage.removeItem('servicesData')
        setActiveChat(false)
    }

    return <div className="class-Home">
        <ListChat onClick={(data)=>proofFunction(data)} getSecondList={getSecondList}/>
        {activeChat ? <ChatComponent onClick={proofFunctionFalse} getChatData={getChatData}/> : <>
            <CitasPendientes onClick={(data)=>proofFunction(data)} getSecondList={getSecondList}/>
            <UltimasConsultas/>
        </>}
    </div>
}