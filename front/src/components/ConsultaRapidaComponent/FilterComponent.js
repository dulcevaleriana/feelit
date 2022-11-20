import React from "react";
import BasicSelect from "../UIElements/BasicSelect";
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import BasicButtons from "../../components/UIElements/BasicButtons-MUI";
import { faList, faTableCellsLarge } from '@fortawesome/free-solid-svg-icons';
import CheckBox from "../UIElements/CheckBox";
import DateTimeComponent from "../UIElements/DateTimeComponent";

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
        <Box className="class-filterComponent">
            <div>
                <h5>Mis citas</h5>
                <div>
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
                </div>
                <FormControl>
                    <BasicButtons
                        onClick={()=>{}}
                        variantName="contained"
                        buttonName={""}
                        className=""
                        iconName={faTableCellsLarge}
                    />
                    <BasicButtons
                        onClick={()=>{}}
                        variantName="contained"
                        buttonName={""}
                        iconName={faList}
                        className="class-notSelected"
                    />
                </FormControl>
            </div>
            <div>
                <FormControl>
                    <CheckBox
                        name="Solo consultas flash"
                    />
                    <CheckBox
                        name="Solo citas"
                    />
                    <CheckBox
                        name="Solo Resultados Enviados"
                    />
                </FormControl>
                <FormControl>
                    <DateTimeComponent/>
                </FormControl>
                <FormControl>
                    <BasicButtons
                        onClick={()=>{}}
                        variantName="contained"
                        buttonName={"Activo"}
                    />
                    <BasicButtons
                        onClick={()=>{}}
                        variantName="contained"
                        buttonName={"Inactivo"}
                    />
                </FormControl>
            </div>
        </Box>
    )
}