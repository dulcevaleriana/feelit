import React, { useState } from "react";
import ListChat from "../components/HomeComponent/listChat";
import CitasPendientes from "../components/HomeComponent/citasPendientes";
import UltimasConsultas from "../components/HomeComponent/ultimasConsultas";
import ChatComponent from "../components/HomeComponent/ChatComponent";

export default function Home() {
    const [activeChat, setActiveChat] = useState(false)
    const [getChatData, setChatData] = useState({})

    const proofFunction = (data) => {
        setChatData(data)
        setActiveChat(true)
    }

    const proofFunctionFalse = () => {
        setActiveChat(false)
    }

    return <div className="class-Home">
        <ListChat onClick={(data)=>proofFunction(data)}/>
        {activeChat ? <ChatComponent onClick={proofFunctionFalse} getChatData={getChatData}/> : <>
            <CitasPendientes onClick={(data)=>proofFunction(data)}/>
            <UltimasConsultas/>
        </>}
    </div>
}