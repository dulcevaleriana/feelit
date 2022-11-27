import * as React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';

export default function FormUserDataCreateUser() {
    const [name, setName] = React.useState('Escriba aquí su nombre');
    const [telefono, setTelefono] = React.useState('Escriba aquí su teléfono');
    const [correo, setCorreo] = React.useState('Escriba aquí su correo');

    const handleChangeName = (event) => {
        setName(event.target.value);
    };

    const handleChangeTelefono = (event) => {
        setTelefono(event.target.value);
    };

    const handleChangeCorreo = (event) => {
        setCorreo(event.target.value);
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
        </FormControl>
        <FormControl>
            <InputLabel htmlFor="component-outlined">Teléfono</InputLabel>
            <OutlinedInput
            id="component-outlined"
            value={telefono}
            onChange={handleChangeTelefono}
            label="Telefono"
            />
        </FormControl>
        <FormControl>
            <InputLabel htmlFor="component-outlined">Correo</InputLabel>
            <OutlinedInput
            id="component-outlined"
            value={correo}
            onChange={handleChangeCorreo}
            label="Correo"
            />
        </FormControl>
        <FormControl>
            <InputLabel htmlFor="component-outlined">Contraseña</InputLabel>
            <OutlinedInput
            id="component-outlined"
            value={correo}
            onChange={handleChangeCorreo}
            label="Correo"
            />
        </FormControl>
        <FormControl>
            <InputLabel htmlFor="component-outlined">Teléfono</InputLabel>
            <OutlinedInput
            id="component-outlined"
            value={correo}
            onChange={handleChangeCorreo}
            label="Correo"
            />
        </FormControl>
        <h5>* Al llenar estos campos esta de acuerdo con crear una cuenta para tener su cita</h5>
    </Box>
}