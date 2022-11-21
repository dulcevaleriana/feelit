import React from "react";
import { Link } from "react-router-dom";
import FormControl from '@mui/material/FormControl';
import BasicButtons from "../../components/UIElements/BasicButtons-MUI";
import { faFloppyDisk, faTrash } from '@fortawesome/free-solid-svg-icons';
import BasicSelect from "../../components/UIElements/BasicSelect";
import DateTimeComponent from "../../components/UIElements/DateTimeComponent";
import TimeInputComponent from "../../components/UIElements/TimeInputComponent";
import TextareaAutosize from '@mui/material/TextareaAutosize';

const filterArray = [
    {
        value:10,
        name:"Consulta flash"
    },
    {
        value:20,
        name:"Cita medica"
    },
    {
        value:30,
        name:"Enviar resultados"
    }
]

export default function EditOrSeeDetailsComponent(props){
    return(
        <div>
            <div>
                <div>
                    <Link to="/consultaRapida/ReadConsultaRapida">
                        Mis citas
                    </Link>
                    <span>/</span>
                    <span>Mi cita con: "Juan Ortega"</span>
                </div>
                <FormControl>
                    <BasicButtons
                        onClick={()=>{}}
                        variantName="contained"
                        buttonName={"Guardar"}
                        className={""}
                        iconName={faFloppyDisk}
                    />
                    <BasicButtons
                        onClick={()=>{}}
                        variantName="contained"
                        buttonName={"Eliminar"}
                        iconName={faTrash}
                        className={""}
                    />
                </FormControl>
            </div>
            <div>
                <div>
                    <img src="https://cdn.pixabay.com/photo/2017/03/14/03/20/woman-2141808__480.jpg" alt="img"/>
                </div>
                <h4>Dr. Juan Ortega</h4>
                <h5>Pediatra</h5>
                <h5>* Si quiere cambiar de medico, debe crear otra cita </h5>
            </div>
            <form>
                <FormControl>
                    <DateTimeComponent/>
                </FormControl>
                <FormControl>
                    <BasicSelect
                        name="Tipo de cita"
                        filterArray={filterArray}
                    />
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
                        className="class-notSelected"
                    />
                </FormControl>
                <FormControl>
                    <TimeInputComponent />
                </FormControl>
                <div>
                    <label>Enlace de la cita (video cita)</label>
                    <h5>* Este enlace es auto generado, no se puede editar</h5>
                </div>
                <FormControl>
                    <label>Mi mensaje</label>
                    <TextareaAutosize
                        maxRows={4}
                        aria-label="maximum height"
                        placeholder="Maximum 4 rows"
                        defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                            ut labore et dolore magna aliqua."
                        style={{ width: 200 }}
                    />
                </FormControl>
            </form>
        </div>
    )
}