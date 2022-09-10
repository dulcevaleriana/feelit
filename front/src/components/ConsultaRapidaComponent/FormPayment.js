import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ComboBox from '../UIElements/ComboBox';

export default function FormPayment(){

  const top100Films = [
    { label: 'ARS Humano' },
    { label: 'ARS Siembra'},
    { label: 'Seguro X' },
  ];

    return  <Box
        component="form"
        sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
    >
        <h5>Realiza el pago:</h5>
        <div>
          <ComboBox 
            name="Tipo de seguro"
            top100Films={top100Films}
          />
        </div>
        <TextField 
            id="outlined-basic" 
            label="Número de seguro" 
            placeholder='0000-0000-0000-0000'
            variant="outlined" 
        />
        <TextField 
            id="outlined-basic" 
            label="Outlined" 
            variant="outlined" 
        />
        <TextField
          id="filled-number"
          label="Number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="filled"
        />
        <TextField
          id="filled-number"
          label="Number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="filled"
        />
        <TextField
          id="filled-number"
          label="Number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="filled"
        />
    </Box>
}