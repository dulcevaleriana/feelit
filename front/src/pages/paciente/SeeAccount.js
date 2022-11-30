import React from 'react';
import FormControl from '@mui/material/FormControl';
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

    return(
        <div className='class-SeeAccount'>
            <div>
                <div>
                    <span>Mi cuenta</span>
                </div>
                <FormControl>
                    <BasicButtons
                        onClick={()=>{}}
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
                    <h5>Tipo de cita</h5>
                    <label>oooooo</label>
                </div>
                <div>
                    <h5>Tipo de cita</h5>
                    <label>oooooo</label>
                </div>
                <div>
                    <h5>Tipo de cita</h5>
                    <label>oooooo</label>
                </div>
                <div>
                    <h5>Tipo de cita</h5>
                    <label>oooooo</label>
                </div>
                <div>
                    <h5>Tipo de cita</h5>
                    <label>oooooo</label>
                </div>
            </div>
            <div>
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