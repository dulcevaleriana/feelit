import React from "react";
import BasicButtons from "../UIElements/BasicButtons-MUI";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faFaceSmile, faShare, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import ActionAreaCard from "../UIElements/ActionAreaCard";
import ChatDetails from "./ChatDetails";
import Input from '../../components/UIElements/InputComponent';
import ChatMessageServices from "./ChatMessageServices";
import ChatMessage from "./ChatMessage";

export default function ChatComponent(props){
    return <div>
        <div>
            <BasicButtons
                onClick={()=>props.onClick()}
                variantName="text"
                buttonName={"Volver"}
                iconName={faAnglesLeft}
            />
            <ActionAreaCard img='https://d29fhpw069ctt2.cloudfront.net/photo/thumb/23181/photo-1467051989526-23a939d703d8.jpg' onClick={()=>props.onClick()}/>
        </div>
        <ChatDetails onClick={()=>{}}/>
        <div>
            <ChatMessageServices/>
            <ChatMessage/>
        </div>
        <div>
            <FontAwesomeIcon icon={faFaceSmile} size="lg"  />
            <FontAwesomeIcon icon={faShare} size="lg"  />
            <Input
                element='input'
                id='ADD_COLUMN_NAME_HERE'
                type='text'
                label=''
                validators={[]}
                errorText=''
                onInput={()=>{}}
                placeholder='Enviar respuesta'
            />
            <FontAwesomeIcon icon={faPaperPlane} size="lg"  />
        </div>
    </div>
}