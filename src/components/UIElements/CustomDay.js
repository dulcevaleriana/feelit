import React, { useEffect } from 'react';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import GetTodayDate from "../../shared/util/getTodayDate";

export default function CustomDay(props) {
  const {actualDay} = GetTodayDate();
  const [date, setDate] = React.useState(dayjs(actualDay));

  useEffect(()=>{
    const filterDayNotAvaiable = (day) => {
      console.log({horarioDoctor:props.horarioDoctor})

      let newArrayHorario = props.horarioDoctor.map(data => {
        return {
          // entrada: new Date(Date.parse(JSON.parse(data.entrada))),
          // salida: new Date(Date.parse(JSON.parse(data.salida)))
          entrada: Date.parse(JSON.parse(data.entrada)),
          salida: Date.parse(JSON.parse(data.salida))
        }
      })
      console.log({newArrayHorario})
      console.log({day})
      return true
    }
    filterDayNotAvaiable()
  },[])

  const isWeekend = (date) => {
    const day = date.day();
    return day === 0 || day === 6;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticDatePicker
        displayStaticWrapperAs="desktop"
        openTo="day"
        value={date}
        shouldDisableDate={isWeekend}
        onChange={(newValue) => setDate(newValue)}
        renderInput={(params) => <TextField {...params} />}
        disablePast={true}
      />
    </LocalizationProvider>
  );
}