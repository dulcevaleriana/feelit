import React from "react";
import BasicButtons from "../UIElements/BasicButtons-MUI";
import Typography from '@mui/material/Typography';

export default function EndServices(props){
    const getDataServices = JSON.parse(localStorage.getItem('servicesData'));
    console.log({getDataServices})

    const deleteServices = () => {
        if(getDataServices.type === "ConsultaRapida"){

        }
        if(getDataServices.type === "AgendarCita"){

        }
        if(getDataServices.type === "EnviarResultados"){

        }
        localStorage.removeItem('servicesData')
    }

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
            onClick={deleteServices}
            variantName="contained"
            buttonName={"Terminar Servicio"}
        />
    </div>
}