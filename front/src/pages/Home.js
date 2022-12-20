import React, { useContext, useState} from "react";
// import { Link } from "react-router-dom";
import { AuthContext } from "../shared/context/auth-context";
import ListChat from "../components/HomeComponent/listChat";
import CitasPendientes from "../components/HomeComponent/citasPendientes";
import UltimasConsultas from "../components/HomeComponent/ultimasConsultas";
import ChatComponent from "../components/HomeComponent/ChatComponent";

export default function Home() {
    const auth = useContext(AuthContext);
    const [activeChat, setActiveChat] = useState(false)
    console.log("auth",auth)

    const proofFunction = () => {
        setActiveChat(true)
    }

    const proofFunctionFalse = () => {
        setActiveChat(false)
    }

    return <div className="class-Home">
        <ListChat onClick={proofFunction}/>
        {activeChat ? <ChatComponent onClick={proofFunctionFalse}/> : <>
            <CitasPendientes/>
            <UltimasConsultas/>
        </>}
    </div>
}