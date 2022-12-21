import React from "react";
import Typography from '@mui/material/Typography';
import BasicButtons from "../UIElements/BasicButtons-MUI";
import { faPen } from '@fortawesome/free-solid-svg-icons';

export default function ChatDetails(props){
    return <div>
        <Typography gutterBottom variant="h6" component="div">
            Precios
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
}