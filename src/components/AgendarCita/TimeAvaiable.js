import React, {useState, useEffect} from "react";
import BasicButtons from "../UIElements/BasicButtons-MUI";

export default function TimeAvaiable(props){
    const [formatTime, setFormatTime] = useState([])
    const [selectedTime, setSelectedTime] = useState()

    useEffect(()=>{
        const formatTime = () => {
            let newTimeFormatArray = props.horarioDoctor.map(data => {
                let getEntrada = new Date(Date.parse(JSON.parse(data.entrada)))
                let getSalida = new Date(Date.parse(JSON.parse(data.salida)))
                let newFormatEntrada = `${getEntrada.getHours()}:${getEntrada.getMinutes()}`
                let newFormatSalida = `${getSalida.getHours()}:${getSalida.getMinutes()}`
                const times = [];

                function addMinutes(time, minutes) {
                    const [hours, mins] = time.split(':').map(Number);
                    const totalMinutes = hours * 60 + mins + minutes;
                    const newHours = Math.floor(totalMinutes / 60).toString().padStart(2, '0');
                    const newMins = (totalMinutes % 60).toString().padStart(2, '0');
                    return `${newHours}:${newMins}`;
                }

                for (let time = newFormatEntrada; time <= newFormatSalida; time = addMinutes(time, 60)) {
                    times.push({ time });
                }

                return {
                    dia: data.dia,
                    entrada: newFormatEntrada,
                    salida: newFormatSalida,
                    timesBetween:times
                }
            })
            setFormatTime(newTimeFormatArray)
        }
        formatTime()
    },[])

    return <div className="class-TimeAvaiable">
        <h5>Selecciona un Tiempos Disponibles</h5>
        <div>
            {formatTime.filter(day => day.dia === "Lun").map(data => data.timesBetween.map((index,key) => <BasicButtons
                onClick={()=>{props.getTime(index.time);setSelectedTime(key)}}
                variantName={selectedTime === key ? "contained" : "outlined"}
                buttonName={index.time}
            />))}
        </div>
    </div>
}