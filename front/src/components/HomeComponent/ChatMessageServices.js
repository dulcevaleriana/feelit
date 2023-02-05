import React, {useContext, useEffect, useState} from "react";
import { AuthContext } from '../../shared/context/auth-context';
import ImageServices from '../../Image/undraw_vr_chat_re_s80u.png';
import Typography from '@mui/material/Typography';
import BasicButtons from "../UIElements/BasicButtons-MUI";
import { useHttpClient } from '../../shared/hooks/http-hook';

export default function ChatMessageServices(props){
    const { sendRequest } = useHttpClient();
    const auth = useContext(AuthContext);
    // const [getagendarCitaService, setGetagendarCitaService] = useState(null)
    const [getconsultaRapidaService, setGetconsultaRapidaService] = useState(null)
    // const [getenviarExamenesService, setGetenviarExamenesService] = useState(null)

    const acceptConsultaRapidaServices = async (id) => {
        console.log({id, idTypeof:typeof id})
        try{
            await sendRequest(
                process.env.REACT_APP_ + `consultas-rapidas/active/${id}`,
                'PATCH',
                JSON.stringify({
                    messageDoctor: "Consulta rapida aprobada, empecemos a chatear",
                }),
                {
                    'Content-Type': 'application/json'
                },
            )
        } catch(err){
            console.log({err})
        }
    }

    const declineConsultaRapidaServices = async (id) => {
        console.log({id, idTypeof:typeof id})
        try{
            await sendRequest(
                process.env.REACT_APP_ + `consultas-rapidas/desactive/${id}`,
                'PATCH',
                JSON.stringify({
                    messageDoctor: "Consulta rapida rechazada, para mas informacion contactar a info@feelit.com",
                }),
                {
                    'Content-Type': 'application/json'
                },
            )
        } catch(err){
            console.log({err})
        }
    }

    useEffect(()=>{
        const getChatData = async () => {
            if(props.data.agendarCita.length !== 0){

            }
            if(props.data.consultaRapida.length !== 0){
                const response = await sendRequest(process.env.REACT_APP_ + 'consultas-rapidas/doctorAndPaciente/' + props.data.id + '/' + auth.userId)
                setGetconsultaRapidaService(response)
            }
            if(props.data.enviarExamenes.length !== 0){

            }
        }
        getChatData()
    },[props.data, sendRequest, auth.userId])

    console.log({DATA:props.data})

    let element = props.serviceActive ? <div>
        <img src={ImageServices} alt={ImageServices}/>
        <Typography variant="h6" color="text.secondary">
            Mensaje de bienvenida
        </Typography>
        <Typography variant="body2" color="text.secondary">
            Contenido Contenido Contenido Contenido Contenido Contenido Contenido
        </Typography>
    </div>
    :
    <div className="class-ChatMessageServices">
        {props.data?.agendarCita && props.data?.agendarCita?.length !== 0 && <>
            <div>
                <Typography variant="h6" color="text.secondary">
                    Detalle solicitud:
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Consulta rapida <br/>
                    0:00 PM <br/>
                    RD$500 || Estado: Pagado
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Mensaje: <br/>
                    Hola Dr. atiendame porfa, Hola Dr. atiendame porfa,
                    Hola Dr. atiendame porfa, Hola Dr. atiendame porfa,
                    Hola Dr. atiendame porfa, Hola Dr. atiendame por...
                </Typography>
            </div>
            {auth.rol === "638f3ddd1af87455b52cf7d7" ? <Typography variant="body2" color="text.secondary">
                Pending
            </Typography>
            : auth.rol === "638f3dc51af87455b52cf7d4" ? <div>
                <BasicButtons
                    onClick={()=>{}}
                    variantName="outlined"
                    buttonName={"Declinar"}
                />
                <BasicButtons
                    onClick={()=>{}}
                    variantName="contained"
                    buttonName={"Aceptar"}
                />
            </div>
            : null}
        </>}
        {props.data?.consultaRapida && props.data?.consultaRapida?.length !== 0 && getconsultaRapidaService?.getConsultasRapidasPaciente?.map(data => <>
            <div>
                <Typography variant="h6" color="text.secondary">
                    Detalle solicitud:
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Consulta rapida <br/>
                    {data.time} <br/>
                    RD${data.doctorPrice} || Estado: {data.status}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Link: <br/>
                    {data.link}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Mensaje: <br/>
                    {data.messagePaciente}
                </Typography>
            </div>
            {auth.rol === "638f3ddd1af87455b52cf7d7" ? <Typography variant="body2" color="text.secondary">
                {data.status}
            </Typography>
            : auth.rol === "638f3dc51af87455b52cf7d4" ? <div>
                <BasicButtons
                    onClick={()=>{}}
                    variantName="outlined"
                    buttonName={"Declinar"}
                />
                <BasicButtons
                    onClick={()=>{}}
                    variantName="contained"
                    buttonName={"Aceptar"}
                />
            </div>
            : null}
        </>)}
        {props.data?.enviarExamenes && props.data?.enviarExamenes?.length !== 0 && <>
            <div>
                <Typography variant="h6" color="text.secondary">
                    Detalle solicitud:
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Consulta rapida <br/>
                    0:00 PM <br/>
                    RD$500 || Estado: Pagado
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Mensaje: <br/>
                    Hola Dr. atiendame porfa, Hola Dr. atiendame porfa,
                    Hola Dr. atiendame porfa, Hola Dr. atiendame porfa,
                    Hola Dr. atiendame porfa, Hola Dr. atiendame por...
                </Typography>
            </div>
            {auth.rol === "638f3ddd1af87455b52cf7d7" ? <Typography variant="body2" color="text.secondary">
                Pending
            </Typography>
            : auth.rol === "638f3dc51af87455b52cf7d4" ? <div>
                <BasicButtons
                    onClick={()=>{}}
                    variantName="outlined"
                    buttonName={"Declinar"}
                />
                <BasicButtons
                    onClick={()=>{}}
                    variantName="contained"
                    buttonName={"Aceptar"}
                />
            </div>
            : null}
        </>}
        {props.data && !(props.data.id) && <>
            <div>
                <Typography variant="h6" color="text.secondary">
                    Detalle solicitud:00
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {!(props.data.date) ? "Consulta rapida" : "agendar cita"}<br/>
                    {props.data.time} <br/>
                    RD${props.data.doctorPrice} || Estado: {props.data.status} / {props.data.paymentStatus === true ? "pagado" : "no pagado"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Mensaje: <br/>
                    {props.data.messagePaciente}
                </Typography>
            </div>
            {auth.rol === "638f3ddd1af87455b52cf7d7" ? <Typography variant="body2" color="text.secondary">
                status
            </Typography>
            : auth.rol === "638f3dc51af87455b52cf7d4" ? <div className="class-buttonOptions">
                {props.data.status === "Pendiente" ? <>
                    <BasicButtons
                        onClick={()=>declineConsultaRapidaServices(props.data._id)}
                        variantName="outlined"
                        buttonName={"Declinar"}
                    />
                    <BasicButtons
                        onClick={()=>acceptConsultaRapidaServices(props.data._id)}
                        variantName="contained"
                        buttonName={"Aceptar"}
                    />
                </> : props.data.messageDoctor }
            </div>
            : null}
        </>}
    </div>

    return element;
}