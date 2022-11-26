import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import FormControl from '@mui/material/FormControl';
import BasicButtons from "../../components/UIElements/BasicButtons-MUI";
import { faFloppyDisk, faTrash, faCopy, faPen, faPlay, faDownload, faMoneyBillTransfer, faFileImport, faFile } from '@fortawesome/free-solid-svg-icons';
import BasicSelect from "../../components/UIElements/BasicSelect";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { AuthContext } from "../../shared/context/auth-context";
import NestedModal from "../../components/UIElements/NestedModal";

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

const statusArray = [
    {
        value:10,
        name:"En espera"
    },
    {
        value:20,
        name:"Aprovada"
    },
    {
        value:30,
        name:"Cancelada"
    },
    {
        value:40,
        name:"Terminada"
    }
]

const arrayFileUpload = [
    { cardFileElement: "ADD-FILE-WORK.pdf"},
    { cardFileElement: "ADD-FILE-WORK.pdf"},
    { cardFileElement: "ADD-FILE-WORK.pdf"},
    { cardFileElement: "ADD-FILE-WORK.pdf"},
    { cardFileElement: "ADD-FILE-WORK.pdf"},
    { cardFileElement: "ADD-FILE-WORK.pdf"},
    { cardFileElement: "ADD-FILE-WORK.pdf"},
    { cardFileElement: "ADD-FILE-WORK.pdf"},
    { cardFileElement: "ADD-FILE-WORK.pdf"},
    { cardFileElement: "ADD-FILE-WORK.pdf"}
]

export default function EditOrSeeEnviarResultados(props){
    const History = useHistory()
    const SeeOrEditData = useContext(AuthContext);

    const boolean = false;

    const cleanAllSet = () => {
        SeeOrEditData.setEditConsultaRapida(false)
        SeeOrEditData.setSeeDetailConsultaRapida(false)
        localStorage.setItem("modalDeleteCita",true)
        History.push('/consultaRapida/ReadConsultaRapida')
    }

    const paymentFunction = () => {
        localStorage.setItem("stepLS",true)
        History.push('/AgendarCita/create')
    }

    return(
        <div className={`class-EditOrSeeDetailsComponent class-EditOrSeeEnviarResultados ${SeeOrEditData.seeDetailConsultaRapida === true ? "class-seeDetailConsultaRapida" : SeeOrEditData.editConsultaRapida === true ? "class-editConsultaRapida" : ""}`}>
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
                        onClick={paymentFunction}
                        variantName="contained"
                        buttonName={"Pagar ahora"}
                        iconName={faMoneyBillTransfer}
                    />
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
                    <NestedModal
                        withButton={true}
                        name="Eliminar"
                        icon={faTrash}
                        variantName="contained"
                        title="Eliminar Cita"
                        message="Dulce, estas segura que quieres eliminar esta cita?"
                        cancelButton={true}
                        buttonOptions={
                            <BasicButtons
                                onClick={cleanAllSet}
                                variantName="contained"
                                buttonName={"Eliminar"}
                            />
                        }
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
                { SeeOrEditData.seeDetailConsultaRapida === true ? (
                    <div>
                        <h5>Tipo de cita</h5>
                        <label>{filterArray[0].name}</label>
                    </div>
                )
                : SeeOrEditData.editConsultaRapida === true ? (
                    <FormControl>
                        <BasicSelect
                            name="Tipo de cita"
                            filterArray={filterArray}
                            disabled={SeeOrEditData.seeDetailConsultaRapida}
                        />
                    </FormControl>
                )
                : null }
                { SeeOrEditData.seeDetailConsultaRapida === true ? (
                    <div>
                        <h5>Estatus Cita</h5>
                        <label>Activo</label>
                    </div>
                )
                : SeeOrEditData.editConsultaRapida === true ? (
                    <FormControl>
                        <BasicSelect
                            name="Estatus Cita"
                            filterArray={statusArray}
                            disabled={SeeOrEditData.seeDetailConsultaRapida}
                        />
                    </FormControl>
                )
                : null }
                <FormControl>
                    <label>Mi mensaje</label>
                    <TextareaAutosize
                        minRows={3}
                        aria-label="maximum height"
                        placeholder="Maximum 4 rows"
                        defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                            ut labore et dolore magna aliqua."
                        style={{ }}
                        disabled={SeeOrEditData.seeDetailConsultaRapida}
                    />
                </FormControl>
                <FormControl>
                    <label>Mensaje Doctor</label>
                    <TextareaAutosize
                        minRows={3}
                        aria-label="maximum height"
                        placeholder="Maximum 4 rows"
                        defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                            ut labore et dolore magna aliqua."
                        style={{ }}
                        disabled={SeeOrEditData.seeDetailConsultaRapida}
                    />
                </FormControl>
            </form>
            <div>
                <h4>Documentos enviados</h4>
                {arrayFileUpload.map((index, key)=>(
                    <div key={key} style={{height:'10%'}} className="class-cardUploaded">
                        <FontAwesomeIcon icon={faFile} size="lg"  />
                        <h4>{index.cardFileElement}</h4>
                    </div>
                ))}
            </div>
        </div>
    )
}