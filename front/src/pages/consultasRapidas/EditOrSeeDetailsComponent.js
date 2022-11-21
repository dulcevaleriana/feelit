import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import FormControl from '@mui/material/FormControl';
import BasicButtons from "../../components/UIElements/BasicButtons-MUI";
import { faFloppyDisk, faTrash, faCopy, faPen } from '@fortawesome/free-solid-svg-icons';
import BasicSelect from "../../components/UIElements/BasicSelect";
import DateTimeComponent from "../../components/UIElements/DateTimeComponent";
import TimeInputComponent from "../../components/UIElements/TimeInputComponent";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { AuthContext } from "../../shared/context/auth-context";

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
    const History = useHistory()
    const SeeOrEditData = useContext(AuthContext);

    const cleanAllSet = () => {
        SeeOrEditData.setEditConsultaRapida(false)
        SeeOrEditData.setSeeDetailConsultaRapida(false)
        History.push('/consultaRapida/ReadConsultaRapida')
    }

    return(
        <div className={`class-EditOrSeeDetailsComponent ${SeeOrEditData.seeDetailConsultaRapida === true ? "class-seeDetailConsultaRapida" : SeeOrEditData.editConsultaRapida === true ? "class-editConsultaRapida" : ""}`}>
            <div>
                <div>
                    <Link to="/consultaRapida/ReadConsultaRapida">
                        Mis citas
                    </Link>
                    <span>/</span>
                    <span>Mi cita con: "Juan Ortega"</span>
                </div>
                <FormControl>
                    { SeeOrEditData.seeDetailConsultaRapida === true ? (
                        <BasicButtons
                            onClick={()=>{SeeOrEditData.setEditConsultaRapida(true) ; SeeOrEditData.setSeeDetailConsultaRapida(false)}}
                            variantName="contained"
                            buttonName={"Editar"}
                            className={""}
                            iconName={faPen}
                        />
                    )
                    : SeeOrEditData.editConsultaRapida === true ? (
                        <BasicButtons
                            onClick={()=>{SeeOrEditData.setEditConsultaRapida(false) ; SeeOrEditData.setSeeDetailConsultaRapida(true)}}
                            variantName="contained"
                            buttonName={"Guardar"}
                            className={""}
                            iconName={faFloppyDisk}
                        />
                    )
                    : null }
                    <BasicButtons
                        onClick={cleanAllSet}
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
                    <DateTimeComponent disabled={SeeOrEditData.seeDetailConsultaRapida}/>
                </FormControl>
                <FormControl>
                    <BasicSelect
                        name="Tipo de cita"
                        filterArray={filterArray}
                        disabled={SeeOrEditData.seeDetailConsultaRapida}
                    />
                </FormControl>
                <FormControl>
                    <TimeInputComponent
                        disabled={SeeOrEditData.seeDetailConsultaRapida}
                    />
                </FormControl>
                { SeeOrEditData.seeDetailConsultaRapida === true ? (
                    <div>
                        <h5>Estatus Cita </h5>
                        <label>Activo</label>
                    </div>
                )
                : SeeOrEditData.editConsultaRapida === true ? (
                    <FormControl>
                        <BasicButtons
                            onClick={()=>{}}
                            variantName="contained"
                            buttonName={"Activo"}
                            disabled={SeeOrEditData.seeDetailConsultaRapida}
                        />
                        <BasicButtons
                            onClick={()=>{}}
                            variantName="contained"
                            buttonName={"Inactivo"}
                            className="class-notSelected"
                            disabled={SeeOrEditData.seeDetailConsultaRapida}
                        />
                    </FormControl>
                )
                : null }
                { SeeOrEditData.seeDetailConsultaRapida === true ? (
                    <div>
                        <h5>Enlace de la cita (video cita)</h5>
                        <label>https://github.com/dulcevaleriana/blog-practice/43466436467767</label>
                        <BasicButtons
                            onClick={()=>{}}
                            variantName="contained"
                            iconName={faCopy}
                            className={""}
                        />
                    </div>
                )
                : SeeOrEditData.editConsultaRapida === true ? (
                    <div>
                        <label>Enlace de la cita (video cita)</label>
                        <h5>* Este enlace es auto generado, no se puede editar</h5>
                    </div>
                )
                : null }
                <FormControl>
                    <label>Mi mensaje</label>
                    <TextareaAutosize
                        minRows={6}
                        aria-label="maximum height"
                        placeholder="Maximum 4 rows"
                        defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                            ut labore et dolore magna aliqua."
                        style={{ }}
                        disabled={SeeOrEditData.seeDetailConsultaRapida}
                    />
                </FormControl>
            </form>
        </div>
    )
}