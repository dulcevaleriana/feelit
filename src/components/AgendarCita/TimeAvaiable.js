import React, {useState, useEffect} from "react";
import BasicButtons from "../UIElements/BasicButtons-MUI";

export default function TimeAvaiable(props){
    const [formatTime, setFormatTime] = useState([])

    useEffect(()=>{
        const formatTime = () => {
            let newTimeFormatArray = props.horarioDoctor.map(data => {
                let getEntrada = new Date(Date.parse(JSON.parse(data.entrada)))
                let getSalida = new Date(Date.parse(JSON.parse(data.salida)))

                return {
                    dia: data.dia,
                    entrada: `${getEntrada.getHours()}:${getEntrada.getMinutes()}`,
                    salida: `${getSalida.getHours()}:${getSalida.getMinutes()}`
                }
            })
            setFormatTime(newTimeFormatArray)
        }
        formatTime()
    },[])

    console.log({formatTime})

    return <div>
        <h5>Selecciona un Tiempos Disponibles</h5>
        {formatTime.filter(day => day.dia === "Lun").map(data => <>
            <BasicButtons
                onClick={()=>{}}
                variantName="outlined"
                buttonName={data.entrada}
            />
            <BasicButtons
                onClick={()=>{}}
                variantName="outlined"
                buttonName={data.salida}
            />
        </>)}
    </div>
}