import React, {useContext, useState, useEffect} from "react";
import BasicButtons from "../UIElements/BasicButtons-MUI";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faFaceSmile, faShare, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import ActionAreaCard from "../UIElements/ActionAreaCard";
import ChatDetails from "./ChatDetails";
import Input from '../../components/UIElements/InputComponent';
import ChatMessageServices from "./ChatMessageServices";
import ChatMessage from "./ChatMessage";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from '../../shared/hooks/http-hook';

export default function ChatComponent(props){
    const auth = useContext(AuthContext)
    const { sendRequest } = useHttpClient();
    const [getPaciente, setGetPaciente] = useState(null)

    useEffect(()=>{
        const getPacienteFunction = async () => {
            const response = await sendRequest(process.env.REACT_APP_ + 'paciente/' + props.getChatData.idPaciente);
            setGetPaciente(response)
        }
        getPacienteFunction()
        // eslint-disable-next-line
    },[props.getChatData.idPaciente])

    console.log({getChatData:props.getChatData})
    console.log({getPaciente})

    return <div className="class-ChatComponent">
        <div>
            <BasicButtons
                onClick={()=>props.onClick()}
                variantName="text"
                buttonName={"Volver"}
                iconName={faAnglesLeft}
            />
            <ActionAreaCard
                img={props.getChatData.img ? props.getChatData.img : getPaciente.getPacienteById.img}
                name={props.getChatData.name ? props.getChatData.name : getPaciente.getPacienteById.name}
                specialty={props.getChatData.specialty}
                isLoggedIn={auth.isLoggedIn}
                onClick={()=>props.onClick()}
            />
        </div>
        {auth.rol === "638f3ddd1af87455b52cf7d7" ? <ChatDetails
            getChatData={props.getChatData}
            onClick={()=>{}}
        /> : <div/>}
        <div>
            <ChatMessageServices
                data={props.getChatData}
                serviceActive={props.getChatData?.agendarCita?.length === 0 && props.getChatData?.consultaRapida?.length === 0 && props.getChatData?.enviarExamenes?.length === 0}
            />
            <ChatMessage/>
        </div>
        <div>
            <FontAwesomeIcon icon={faFaceSmile} size="lg"  />
            <FontAwesomeIcon icon={faShare} size="lg"  />
            <Input
                element='input'
                id='ADD_COLUMN_NAME_HERE'
                type='text'
                label='Enviar respuesta'
                validators={[]}
                errorText=''
                onInput={()=>{}}
                placeholder='Enviar respuesta'
            />
            <FontAwesomeIcon icon={faPaperPlane} size="lg"  />
        </div>
    </div>
}