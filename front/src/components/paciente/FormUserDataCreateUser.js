import * as React from 'react';
import Box from '@mui/material/Box';
import Input from '../../components/UIElements/InputComponent';

export default function FormUserDataCreateUser(props) {

    return <Box>
        {props.arrayInputs.map((index, key)=>(
            <Input
                key={key}
                element={index.element}
                id={index.id}
                type={index.type}
                label={index.label}
                validators={index.validators}
                errorText={index.errorText}
                onInput={index.onInput}
                filterArray={index.filterArray ?? index.filterArray}
                passData={index.passData ?? index.passData}
            />
        ))}
        <h5>* Al llenar estos campos esta de acuerdo con crear una cuenta para tener su cita</h5>
    </Box>
}