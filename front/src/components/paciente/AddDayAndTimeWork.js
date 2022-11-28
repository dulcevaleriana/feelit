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
        value:10,
        name:"LU"
    },
    {
        value:20,
        name:"MA"
    },
    {
        value:30,
        name:"MI"
    },
    {
        value:40,
        name:"JU"
    },
    {
        value:50,
        name:"VI"
    },
    {
        value:60,
        name:"SA"
    },
    {
        value:60,
        name:"DO"
    },
]

export default function AddDayAndTimeWork(){
    const [timeStart, setTimeStart] = useState(dayjs('2014-08-18T21:11:54'));
    const [timeEnds, setTimeEnds] = useState(dayjs('2014-08-18T21:11:54'));
    const [mapTimeCreated, setMapTimeCreated] = useState([]);

    console.log("timeStart",timeStart)
    console.log("timeEnds",timeEnds)

    const AddDayAndTimeWorkFuntion = () => {
        setMapTimeCreated([
            ...mapTimeCreated,
            {
                day:"LU",
                timeStart:"0:00",
                timeEnds:"0:00"
            }
        ])
    }

    return(
        <div className='class-AddDayAndTimeWork'>
            <form>
                <FormControl>
                    <BasicSelect
                        name="Día"
                        filterArray={DUMfilterArray}
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
                    onClick={AddDayAndTimeWorkFuntion}
                    variantName="contained"
                    className=""
                    iconName={faAdd}
                />
            </form>
            {mapTimeCreated.map((index,key)=>(
                <div>
                    <h4>{index.day}</h4>
                    <h4>{index.timeStart}</h4>
                    <h4>{index.timeEnds}</h4>
                    <BasicButtons
                        onClick={()=>{}}
                        variantName="contained"
                        className=""
                        iconName={faX}
                    />
                </div>
            ))}
        </div>
    )
}