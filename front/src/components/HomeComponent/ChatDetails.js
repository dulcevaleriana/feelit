import React, {useContext} from "react";
import { AuthContext } from '../../shared/context/auth-context';
import Typography from '@mui/material/Typography';
import BasicButtons from "../UIElements/BasicButtons-MUI";
import { faPen } from '@fortawesome/free-solid-svg-icons';

export default function ChatDetails(props){
    const auth = useContext(AuthContext);
    return <div>
        <Typography gutterBottom variant="h6" component="div">
            Solicitar servicios
        </Typography>
        <BasicButtons
            onClick={()=>props.onClick()}
            variantName="outlined"
            buttonName={"Editar"}
            iconName={faPen}
        />
        {auth.rol === undefined ? <>
            <BasicButtons
                onClick={()=>{}}
                variantName="contained"
                buttonName={"Revisar Resultados (RD$ 800)"}
            />
            <BasicButtons
                onClick={()=>{}}
                variantName="contained"
                buttonName={"Cita Consulta (RD$ 1,500)"}
            />
            <BasicButtons
                onClick={()=>{}}
                variantName="contained"
                buttonName={"Consulta rapida (RD$ 500)"}
            />
        </>
        :
        <>
            <Typography variant="body2" color="text.secondary">
                Revisar Resultados (RD$ 800)
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Cita Consulta (RD$ 1,500)
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Consulta rapida (RD$ 500)
            </Typography>
        </>}
    </div>
}