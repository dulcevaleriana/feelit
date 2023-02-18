import * as React from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { CalendarPicker } from '@mui/x-date-pickers/CalendarPicker';
import GetTodayDate from "../../shared/util/getTodayDate";

export default function CustomDay(props) {
  const {actualDay} = GetTodayDate();
  const [date, setDate] = React.useState(dayjs(actualDay));

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
    // console.log({date})
    return true
  }

  return <LocalizationProvider dateAdapter={AdapterDayjs}>
    <div>
      <h5>Selecciona una fecha</h5>
      <CalendarPicker
        date={date}
        onChange={(newDate) => setDate(newDate)}
        disablePast={true}
        shouldDisableDate={(day) => filterDayNotAvaiable(day)}
      />
    </div>
  </LocalizationProvider>
}