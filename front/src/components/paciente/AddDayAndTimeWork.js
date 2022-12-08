import React, {useState} from 'react';
import FormControl from '@mui/material/FormControl';
import BasicSelect from '../UIElements/BasicSelect';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import BasicButtons from "../../components/UIElements/BasicButtons-MUI";
import { faAdd, faX } from '@fortawesome/free-solid-svg-icons';

const DUMfilterArray = [
    {
        value:"Lun",
        name:"Lun"
    },
    {
        value:"Mar",
        name:"Mar"
    },
    {
        value:"Mir",
        name:"Mir"
    },
    {
        value:"Jue",
        name:"Jue"
    },
    {
        value:"Vie",
        name:"Vie"
    },
    {
        value:"Sab",
        name:"Sab"
    },
    {
        value:"Dom",
        name:"Dom"
    },
]

export default function AddDayAndTimeWork(props){
    const [timeStart, setTimeStart] = useState(dayjs(''));
    const [timeEnds, setTimeEnds] = useState(dayjs(''));
    const [day, setDay] = useState('');
    const [mapTimeCreated, setMapTimeCreated] = useState([]);
    const [sendTimeCreated, setSendTimeCreated] = useState([]);

    const AddDayAndTimeWorkFuntion = (value) => {
        let mapTimeConditional = mapTimeCreated.filter(e => e.dia === value)
        let sendTimeConditional = mapTimeCreated.filter(e => e.dia === value)
        if(mapTimeConditional.length <= 0 || sendTimeConditional.length <= 0){
            setMapTimeCreated([
                ...mapTimeCreated,
                {
                    dia:day,
                    entrada:timeStart,
                    salida:timeEnds
                }
            ])
            setSendTimeCreated([
                ...sendTimeCreated,
                {
                    dia:day,
                    entrada:JSON.stringify(timeStart),
                    salida:JSON.stringify(timeEnds)
                }
            ])
            props.passDataFunction(sendTimeCreated)
        } else {
            return alert("Este día ya esta agregado")
        }
    }

    return(
        <div className='class-AddDayAndTimeWork'>
            <form>
                <FormControl>
                    <BasicSelect
                        name="Día"
                        filterArray={DUMfilterArray}
                        onChange={(e)=>setDay(e.target.value)}
                    />
                </FormControl>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                        label="Entrada"
                        value={timeStart}
                        onChange={(newValue)=> setTimeStart(newValue)}
                        renderInput={(params) => <TextField {...params} />}
                        minTime={dayjs('2018-01-01T08:00')}
                        maxTime={dayjs('2018-01-01T18:45')}
                    />
                    <TimePicker
                        label="Salida"
                        value={timeEnds}
                        onChange={(newValue)=> setTimeEnds(newValue)}
                        renderInput={(params) => <TextField {...params} />}
                        minTime={dayjs('2018-01-01T08:00')}
                        maxTime={dayjs('2018-01-01T18:45')}
                    />
                </LocalizationProvider>
                <BasicButtons
                    onClick={()=> AddDayAndTimeWorkFuntion(day)}
                    variantName="contained"
                    className=""
                    iconName={faAdd}
                    disabled={mapTimeCreated.length >= 7}
                />
            </form>
            <div>
            {mapTimeCreated.map((index,key)=>(
                <div key={key}>
                    <span>
                        <h4>{index.dia}</h4>
                        <h4>{`${index.entrada.$H}:${index.entrada.$m}`}</h4>
                        <h4>{`${index.salida.$H}:${index.salida.$m}`}</h4>
                    </span>
                    <BasicButtons
                        onClick={() => {
                            setMapTimeCreated((item)=> item.filter((elem)=> elem.dia === mapTimeCreated.dia));
                            setSendTimeCreated((item)=> item.filter((elem)=> elem.dia === sendTimeCreated.dia));
                        }}
                        variantName="contained"
                        className=""
                        iconName={faX}
                    />
                </div>
            ))}
            </div>
        </div>
    )
}