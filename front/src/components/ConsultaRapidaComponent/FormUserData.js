import * as React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextareaAutosize from '@mui/material/TextareaAutosize';

export default function FormUserData() {
    const [name, setName] = React.useState('Escriba aquí su nombre');
    const [telefono, setTelefono] = React.useState('Escriba aquí su teléfono');
    const [correo, setCorreo] = React.useState('Escriba aquí su correo');
    const [textarea, setTextarea] = React.useState('Si quieres, puedes dejar un mensaje');

    const handleChangeName = (event) => {
        setName(event.target.value);
    };

    const handleChangeTelefono = (event) => {
        setTelefono(event.target.value);
    };

    const handleChangeCorreo = (event) => {
        setCorreo(event.target.value);
    };

    const handleChangeTextarea = (event) => {
        setTextarea(event.target.value);
    };
    return <Box>
        <FormControl>
            <InputLabel htmlFor="component-outlined">Nombre</InputLabel>
            <OutlinedInput
            id="component-outlined"
            value={name}
            onChange={handleChangeName}
            label="Nombre"
            />
            <InputLabel htmlFor="component-outlined">Teléfono</InputLabel>
            <OutlinedInput
            id="component-outlined"
            value={telefono}
            onChange={handleChangeTelefono}
            label="Telefono"
            />
            <InputLabel htmlFor="component-outlined">Correo</InputLabel>
            <OutlinedInput
            id="component-outlined"
            value={correo}
            onChange={handleChangeCorreo}
            label="Correo"
            />
            <TextareaAutosize
                aria-label="Mensaje"
                minRows={6}
                placeholder="Si quieres, puedes dejar un mensaje"
                value={textarea}
                onChange={handleChangeTextarea}
            />
        </FormControl>
        <h5>* Al llenar estos campos esta de acuerdo con crear una cuenta para tener su cita</h5>
    </Box>
}