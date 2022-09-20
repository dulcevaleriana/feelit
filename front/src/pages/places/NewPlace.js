import React from "react";
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';

const NewPlace = () => {
    return <form className="class-NewPlaces">
        <Box>
            <FormControl>
                <InputLabel htmlFor="component-outlined">Nombre</InputLabel>
                <OutlinedInput
                id="component-outlined"
                // value={}
                // onChange={}
                label="Nombre"
                />
            </FormControl>
        </Box>
    </form>;
}

export default NewPlace