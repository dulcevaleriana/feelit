import React, {useContext} from "react";
import BasicButtons from "../UIElements/BasicButtons-MUI";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faFaceSmile, faShare, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import ActionAreaCard from "../UIElements/ActionAreaCard";
import ChatDetails from "./ChatDetails";
import Input from '../../components/UIElements/InputComponent';
import ChatMessageServices from "./ChatMessageServices";
import ChatMessage from "./ChatMessage";
import { AuthContext } from "../../shared/context/auth-context";

export default function ChatComponent(props){
    const auth = useContext(AuthContext)
    console.log({getChatData:props.getChatData})
    console.log({status1: props.getChatData.agendarCita.length === 0 })
    console.log({status2: props.getChatData.consultaRapida.length === 0 })
    console.log({status3: props.getChatData.consultaRapida.length  === 0 })

    return <div className="class-ChatComponent">
        <div>
            <BasicButtons
                onClick={()=>props.onClick()}
                variantName="text"
                buttonName={"Volver"}
                iconName={faAnglesLeft}
            />
            <ActionAreaCard
                img={props.getChatData.img}
                name={props.getChatData.name}
                specialty={props.getChatData.specialty}
                isLoggedIn={auth.isLoggedIn}
                onClick={()=>props.onClick()}
            />
        </div>
        <ChatDetails
            getChatData={props.getChatData}
            onClick={()=>{}}
        />
        <div>
            <ChatMessageServices
                data={props.getChatData}
                serviceActive={props.getChatData.agendarCita.length === 0 && props.getChatData.consultaRapida.length === 0 && props.getChatData.consultaRapida.length === 0}
            />
            <ChatMessage/>
        </div>
        <div disabled={true}>
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