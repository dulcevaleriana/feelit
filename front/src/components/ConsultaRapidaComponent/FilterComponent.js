import React from "react";
import BasicSelect from "../UIElements/BasicSelect";
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';

const filterArray = [
    {
        value:10,
        name:"Nombre"
    },
    {
        value:20,
        name:"Apellido"
    },
    {
        value:30,
        name:"Especialidad"
    }
]

export default function FilterComponent(){
    return (
        <Box>
            <h5>Mis citas</h5>
            <FormControl>
                <BasicSelect
                    name="Filtrar por"
                    filterArray={filterArray}
                />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="component-outlined">Escriba aquí</InputLabel>
                <OutlinedInput
                    id="component-outlined"
                    // value={name}
                    // onChange={handleChangeName}
                    label="Escriba aquí"
                />
            </FormControl>
        </Box>
    )
}