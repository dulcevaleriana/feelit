import React from "react";
import BasicButtons from "../UIElements/BasicButtons-MUI";
import Typography from '@mui/material/Typography';

export default function EndServices(props){
    return <div className="class-EndServices">
        <Typography gutterBottom variant="h6" component="div">
            Opciones
        </Typography>
        <BasicButtons
            onClick={()=>props.onClick()}
            variantName="outlined"
            buttonName={"Reportar"}
        />
        <div/>
        <div/>
        <BasicButtons
            onClick={()=>props.onClick()}
            variantName="contained"
            buttonName={"Terminar Servicio"}
        />
    </div>
}