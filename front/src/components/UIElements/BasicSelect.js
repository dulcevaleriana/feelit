import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect(props) {
  console.log("props.filterArray",props.filterArray)
  console.log("typeof props.filterArray",typeof props.filterArray)
  console.log("typeof props.filterArray",typeof props.filterArray.getSpecialty)
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{props.name}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id={props.id}
          value={props.value}
          label="Age"
          onChange={props.onChange}
          disabled={props.disabled}
        >
            {props.filterArray.length > 0 && props.filterArray.map((item,key)=> <MenuItem value={item.value} key={key}>{item.name}</MenuItem>)}
            {typeof props.filterArray.getSpecialty === 'object' && props.filterArray.getSpecialty.map((item,key)=> item.status === true && <MenuItem value={item._id} key={key}>{item.specialtyName}</MenuItem>)}
        </Select>
      </FormControl>
    </Box>
  );
}