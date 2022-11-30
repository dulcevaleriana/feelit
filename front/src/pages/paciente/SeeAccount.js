import React from 'react';
import FormControl from '@mui/material/FormControl';
import { useHistory } from 'react-router-dom';
import BasicButtons from "../../components/UIElements/BasicButtons-MUI";
import { faTrash, faPen, faEye } from '@fortawesome/free-solid-svg-icons';
import NestedModal from "../../components/UIElements/NestedModal";

const DUMMY_DATA = [
    {
        image:'https://cdn.pixabay.com/photo/2017/03/14/03/20/woman-2141808__480.jpg',
        name:'Dr. Juan Ortega',
        especialidad:'Pediatra',
        proceso:'enviar archivos'
    },
    {
        image:'https://cdn.pixabay.com/photo/2017/03/14/03/20/woman-2141808__480.jpg',
        name:'Dr. Juan Ortega',
        especialidad:'Pediatra',
        proceso:'enviar archivos'
    },
    {
        image:'https://cdn.pixabay.com/photo/2017/03/14/03/20/woman-2141808__480.jpg',
        name:'Dr. Juan Ortega',
        especialidad:'Pediatra',
        proceso:'enviar archivos'
    },
    {
        image:'https://cdn.pixabay.com/photo/2017/03/14/03/20/woman-2141808__480.jpg',
        name:'Dr. Juan Ortega',
        especialidad:'Pediatra',
        proceso:'enviar archivos'
    },
    {
        image:'https://cdn.pixabay.com/photo/2017/03/14/03/20/woman-2141808__480.jpg',
        name:'Dr. Juan Ortega',
        especialidad:'Pediatra',
        proceso:'enviar archivos'
    },
    {
        image:'https://cdn.pixabay.com/photo/2017/03/14/03/20/woman-2141808__480.jpg',
        name:'Dr. Juan Ortega',
        especialidad:'Pediatra',
        proceso:'enviar archivos'
    },
    {
        image:'https://cdn.pixabay.com/photo/2017/03/14/03/20/woman-2141808__480.jpg',
        name:'Dr. Juan Ortega',
        especialidad:'Pediatra',
        proceso:'enviar archivos'
    },
    {
        image:'https://cdn.pixabay.com/photo/2017/03/14/03/20/woman-2141808__480.jpg',
        name:'Dr. Juan Ortega',
        especialidad:'Pediatra',
        proceso:'enviar archivos'
    },
    {
        image:'https://cdn.pixabay.com/photo/2017/03/14/03/20/woman-2141808__480.jpg',
        name:'Dr. Juan Ortega',
        especialidad:'Pediatra',
        proceso:'enviar archivos'
    },
    {
        image:'https://cdn.pixabay.com/photo/2017/03/14/03/20/woman-2141808__480.jpg',
        name:'Dr. Juan Ortega',
        especialidad:'Pediatra',
        proceso:'enviar archivos'
    },
    {
        image:'https://cdn.pixabay.com/photo/2017/03/14/03/20/woman-2141808__480.jpg',
        name:'Dr. Juan Ortega',
        especialidad:'Pediatra',
        proceso:'enviar archivos'
    },
    {
        image:'https://cdn.pixabay.com/photo/2017/03/14/03/20/woman-2141808__480.jpg',
        name:'Dr. Juan Ortega',
        especialidad:'Pediatra',
        proceso:'enviar archivos'
    },
    {
        image:'https://cdn.pixabay.com/photo/2017/03/14/03/20/woman-2141808__480.jpg',
        name:'Dr. Juan Ortega',
        especialidad:'Pediatra',
        proceso:'enviar archivos'
    },
    {
        image:'https://cdn.pixabay.com/photo/2017/03/14/03/20/woman-2141808__480.jpg',
        name:'Dr. Juan Ortega',
        especialidad:'Pediatra',
        proceso:'enviar archivos'
    },
    {
        image:'https://cdn.pixabay.com/photo/2017/03/14/03/20/woman-2141808__480.jpg',
        name:'Dr. Juan Ortega',
        especialidad:'Pediatra',
        proceso:'enviar archivos'
    },
    {
        image:'https://cdn.pixabay.com/photo/2017/03/14/03/20/woman-2141808__480.jpg',
        name:'Dr. Juan Ortega',
        especialidad:'Pediatra',
        proceso:'enviar archivos'
    }
]

export default function SeeAccount(){
    const history = useHistory();

    return(
        <div className='class-SeeAccount'>
            <div>
                <div>
                    <span>Mi cuenta</span>
                </div>
                <FormControl>
                    <BasicButtons
                        onClick={()=>history.push(`/EditUserOrDoctor/${false}`)}
                        variantName="contained"
                        buttonName={"Editar"}
                        className={""}
                        iconName={faPen}
                    />
                    <NestedModal
                        withButton={true}
                        name="Eliminar Cuenta"
                        icon={faTrash}
                        variantName="contained"
                        title="Eliminar Cuenta"
                        message="Dulce, estas segura que quieres eliminar esta cita?"
                        cancelButton={true}
                        buttonOptions={
                            <BasicButtons
                                onClick={()=>{}}
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
                <div>
                    <h5>Nombre</h5>
                    <label>Dulce Guzman</label>
                </div>
                <div>
                    <h5>Cédula</h5>
                    <label>000-0000000-0</label>
                </div>
                <div>
                    <h5>Teléfono</h5>
                    <label>849-000-0000</label>
                </div>
                <div>
                    <h5>Rol</h5>
                    <label>Paciente</label>
                </div>
                <div>
                    <h5>Correo</h5>
                    <label>Paciente@paciente.com</label>
                </div>
                <div>
                    <h5>Horario laboral</h5>
                    <label>M - T - T || 2:00 pm - 6:00 pm</label>
                </div>
            </div>
            <div>
                <h4>Gestionar mis citas Recientes</h4>
                <BasicButtons
                    onClick={()=>{}}
                    variantName="contained"
                    buttonName={"Ver más"}
                    className={""}
                    iconName={faEye}
                />
            </div>
            <div>
                {DUMMY_DATA.map((index, key)=>(
                    <div key={key}>
                        <div>
                            <img src={index.image} alt="img"/>
                        </div>
                        <h4>{index.name}</h4>
                        <h5>{index.especialidad}</h5>
                        <h5>{index.proceso}</h5>
                    </div>
                ))}
            </div>
        </div>
    )
}