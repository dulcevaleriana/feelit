import React, { useContext, useState} from "react";
import { AuthContext } from '../../shared/context/auth-context';
import Typography from '@mui/material/Typography';
import BasicButtons from "../UIElements/BasicButtons-MUI";
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from "react-router-dom";
import PopUpConsultaRapida from "../../pages/consultasRapidas/PopUpConsultaRapida";
import PopUpAgendarCita from "../../pages/agendarCita/PopUpAgendarCita";
import PopUpEnviarResultados from "../../pages/EnviarResultados/PopUpEnviarResultados";

export default function ChatDetails(props){
    const auth = useContext(AuthContext);
    const history = useHistory();
    const [consultaRapidaBoolean, setConsultaRapidaBoolean] = useState(false)
    const [agendarCita, setAgendarCita] = useState(false)
    const [enviarResultados, setEnviarResultados] = useState(false)

    return <div>
        <Typography gutterBottom variant="h6" component="div">
            Solicitar servicios
        </Typography>
        {auth.rol === "638f3dc51af87455b52cf7d4" ? <>
            <BasicButtons
                onClick={()=>props.onClick()}
                variantName="outlined"
                buttonName={"Editar"}
                iconName={faPen}
            />
        </> : <div/>}
        {!(auth.isLoggedIn) ? <>
            <BasicButtons
                onClick={()=>{history.push("/EnviarResultados/create")}}
                variantName="contained"
                buttonName={`Revisar Resultados (RD$ ${props.getChatData.enviarExamenesPrice})`}
                disabled={props.getChatData.enviarExamenesPrice === 0}
            />
            <BasicButtons
                onClick={()=>{history.push("/AgendarCita/create")}}
                variantName="contained"
                buttonName={`Cita Consulta (RD$ ${props.getChatData.agendarCitaPrice})`}
                disabled={props.getChatData.agendarCitaPrice === 0}
            />
            <BasicButtons
                onClick={()=>{history.push("/consultaRapida/Create")}}
                variantName="contained"
                buttonName={`Consulta rapida (RD$ ${props.getChatData.consultaRapidaPrice})`}
                disabled={props.getChatData.consultaRapidaPrice === 0}
            />
        </>
        : auth.rol === "638f3ddd1af87455b52cf7d7" ? <>
            <PopUpEnviarResultados
                handleClose={()=>setEnviarResultados(!enviarResultados)}
                buttonName={`Revisar Resultados (RD$ ${props.getChatData.enviarExamenesPrice})`}
                variantName="contained"
                closeNow={enviarResultados}
                disabled={props.getChatData.enviarExamenesPrice === 0}
            />
            <PopUpAgendarCita
                handleClose={()=>setAgendarCita(!agendarCita)}
                buttonName={`Cita Consulta (RD$ ${props.getChatData.agendarCitaPrice})`}
                variantName="contained"
                closeNow={agendarCita}
                disabled={props.getChatData.agendarCitaPrice === 0}
            />
            <PopUpConsultaRapida
                handleClose={()=>setConsultaRapidaBoolean(!consultaRapidaBoolean)}
                buttonName={`Consulta rapida (RD$ ${props.getChatData.consultaRapidaPrice})`}
                variantName="contained"
                closeNow={consultaRapidaBoolean}
                disabled={props.getChatData.enviarExamenesPrice === 0}
            />
        </>
        : auth.rol === "638f3dc51af87455b52cf7d4" ? <>
            <Typography variant="body2" color="text.secondary">
                Revisar Resultados (RD$ {props.getChatData.enviarExamenesPrice})
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Cita Consulta (RD$ {props.getChatData.agendarCitaPrice})
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Consulta rapida (RD$ {props.getChatData.consultaRapidaPrice})
            </Typography>
        </>
        : null}
    </div>
}