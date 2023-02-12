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
import { useForm } from "../../shared/hooks/form-hook";
import EndServices from "./EndServices";

export default function ChatComponent(props){
    const auth = useContext(AuthContext)
    const { sendRequest } = useHttpClient();
    const [getUser, setGetUser] = useState(null)
    let chatCondition = typeof props.getChatData.status === "string" ? props.getChatData.paymentStatus === false || props.getChatData.status === "Completado" : true

    const [formState, inputHandler] = useForm(
        {
            messageChat: {
                value: '',
                isValid: false
            }
        },
        false
    );

    const pathChat = async () => {
        let pathObject;
        if(auth.rol === "638f3ddd1af87455b52cf7d7"){
            pathObject = {
                idDoctor: props.getChatData.idDoctor,
                idPaciente: auth.userId,
                chat:{
                    idOwner: auth.userId,
                    model_type: 'Paciente',
                    messageChat: formState.inputs.messageChat.value,
                    dateChat:"00/00/0000",
                    timeChat:'0:00'
                }
            }
        }
        if(auth.rol === "638f3dc51af87455b52cf7d4"){
            pathObject = {
                idDoctor: auth.userId,
                idPaciente: props.getChatData.idPaciente,
                chat:{
                    idOwner: auth.userId,
                    model_type: 'Doctor',
                    messageChat: formState.inputs.messageChat.value,
                    dateChat:"00/00/0000",
                    timeChat:'0:00'
                }
            }
        }
        try{
            await sendRequest(
                process.env.REACT_APP_ + `consultas-rapidas/${props.getChatData._id}`,
                'PATCH',
                JSON.stringify(pathObject),
                {
                    'Content-Type': 'application/json'
                },
            )
        } catch(err){
            console.log({err})
        }
    }

    useEffect(()=>{
        const getUserFunction = async () => {
            if(auth.rol === "638f3ddd1af87455b52cf7d7"){
                const response = await sendRequest(process.env.REACT_APP_ + 'doctor/'+ props.getChatData.idDoctor);
                setGetUser(response.getDoctorById);
            }
            if(auth.rol === "638f3dc51af87455b52cf7d4"){
                const response = await sendRequest(process.env.REACT_APP_ + 'paciente/' + props.getChatData.idPaciente);
                setGetUser(response.getPacienteById)
            }
        }
        getUserFunction()
        // eslint-disable-next-line
    },[props.getChatData.idPaciente])

    return <div className="class-ChatComponent">
        <div>
            <BasicButtons
                onClick={()=>props.onClick()}
                variantName="text"
                buttonName={"Volver"}
                iconName={faAnglesLeft}
            />
            <ActionAreaCard
                img={props.getChatData.img ? props.getChatData.img : getUser?.img}
                name={props.getChatData.name ? props.getChatData.name : getUser?.name}
                specialty={props.getChatData.specialty}
                isLoggedIn={auth.isLoggedIn}
                isPacienteLogged={auth.rol === "638f3ddd1af87455b52cf7d7"}
                onClick={()=>props.onClick()}
            />
        </div>
        {auth.rol === "638f3ddd1af87455b52cf7d7" ? <ChatDetails
            getChatData={props.getChatData}
            onClick={()=>{}}
        /> : <EndServices/>}
        <div className={props.getChatData?.chat?.length > 0 && "class-chatActive"}>
            <ChatMessageServices
                data={props.getChatData}
                serviceActive={props.getChatData?.agendarCita?.length === 0 && props.getChatData?.consultaRapida?.length === 0 && props.getChatData?.enviarExamenes?.length === 0}
            />
            <ChatMessage messagesArray={props.getChatData.chat}/>
        </div>
        <form className={ chatCondition ? "class-disabled" : ""} onSubmit={pathChat}>
            <FontAwesomeIcon icon={faFaceSmile} size="lg"  />
            <FontAwesomeIcon icon={faShare} size="lg"  />
            <Input
                element='input'
                id='messageChat'
                type='text'
                label='Enviar respuesta'
                validators={[]}
                errorText=''
                onInput={inputHandler}
                placeholder='Enviar respuesta'
                disabled={chatCondition}
            />
            <FontAwesomeIcon icon={faPaperPlane} size="lg" onClick={pathChat}/>
        </form>
    </div>
}