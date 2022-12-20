import React from "react";
import BasicButtons from "../UIElements/BasicButtons-MUI";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faPen, faFaceSmile, faShare, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import ActionAreaCard from "../UIElements/ActionAreaCard";
import Typography from '@mui/material/Typography';
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
        <div>
            <Typography gutterBottom variant="h6" component="div">
                Nombre Apellido
            </Typography>
            <BasicButtons
                onClick={()=>props.onClick()}
                variantName="outlined"
                buttonName={"Editar"}
                iconName={faPen}
            />
            <Typography variant="body2" color="text.secondary">
                Revisar Resultados (RD$ 800)
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Cita Consulta (RD$ 1,500)
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Consulta rapida (RD$ 500)
            </Typography>
        </div>
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