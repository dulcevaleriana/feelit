import React from "react";
import BasicButtons from "../UIElements/BasicButtons-MUI";
import Typography from '@mui/material/Typography';
import { useHttpClient } from "../../shared/hooks/http-hook";
import ModalComponent from "../../components/UIElements/ModalComponent";

export default function EndServices(props){
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const getDataServices = JSON.parse(localStorage.getItem('servicesData'));

    const deleteServices = async () => {
        if(getDataServices.type === "ConsultaRapida"){
            await sendRequest(process.env.REACT_APP_ + 'consultas-rapidas/complete/' + getDataServices.id,
            'PATCH',
            '',
            {
                'Content-Type': 'application/json'
            },)
        }
        if(getDataServices.type === "AgendarCita"){

        }
        if(getDataServices.type === "EnviarResultados"){

        }
        localStorage.removeItem('servicesData')
    }

    return <>
        {isLoading && "Loading"}
        <ModalComponent
            headerTitle='You can not access for now'
            show={error}
            onCancel={clearError}
        >
            {error}
        </ModalComponent>
        <div className="class-EndServices">
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
    </>
}