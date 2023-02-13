import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';

export default function StaticTimePickerDemo(props) {
  const [value, setValue] = React.useState(new Date());

  const getTimeFunction = (newValue) => {
    props.getTimeFunctionOut(JSON.stringify(newValue))
  }

  return (
    <div className="class-StaticTimePickerDemo">
      <LocalizationProvider dateAdapter={AdapterDateFns} >
        <StaticTimePicker
          id={props.id}
          displayStaticWrapperAs="mobile"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
            getTimeFunction(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </div>
  );
}
