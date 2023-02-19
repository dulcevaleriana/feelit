import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import GetTodayDate from "../../shared/util/getTodayDate";

export default function CustomDay(props) {
  const {actualDay} = GetTodayDate();
  const [date, setDate] = useState(dayjs(actualDay));
  const [formatDoctorDate, setFormatDoctorDate] = useState([]);

  useEffect(()=>{
    const filterDayNotAvaiable = () => {
      let newArrayHorario = props.horarioDoctor.map(data => {
        let getNumberDay =
          data.dia === "Lun" ? 1 :
          data.dia === "Mar" ? 2 :
          data.dia === "Mir" ? 3 :
          data.dia === "Jue" ? 4 :
          data.dia === "Vie" ? 5 :
          data.dia === "Sab" ? 6 :
          data.dia === "Dom" ? 7 : null;

        return {
          dia: data.dia,
          number: getNumberDay
        }
      })
      setFormatDoctorDate(newArrayHorario)
    }
    filterDayNotAvaiable()
  },[])

  const filteredDates = (date) => {
    const day = date.day();
    const isDisabled = !formatDoctorDate.some((data) => data.number === day);
    return isDisabled;
  };

  const sendDateSelected = (newValue) => {
    setDate(newValue)
    props.getDate(JSON.stringify(newValue))
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticDatePicker
        displayStaticWrapperAs="desktop"
        openTo="day"
        value={date}
        shouldDisableDate={filteredDates}
        onChange={(newValue) => sendDateSelected(newValue)}
        renderInput={(params) => <TextField {...params} />}
        disablePast={true}
      />
    </LocalizationProvider>
  );
}