import React from 'react';
import { faEye, faPen } from '@fortawesome/free-solid-svg-icons';
import BasicButtons from '../UIElements/BasicButtons-MUI';
import { Link } from "react-router-dom";

export default function CardConsultas(props) {
    return (
        <div className={props.className} key={props.key}>
            <div>
                <div>
                    <img src={props.img} alt={props.alt}/>
                </div>
                <h4>{props.name}</h4>
                <h5>{props.date}</h5>
                <h5>{props.time}</h5>
                {props.className === 'class-cardConsulta-table' ? <>
                <h5>{props.tipo}</h5>
                <h5>{props.especialidad}</h5>
                <h5>{props.estado}</h5>
                </> : null}
            </div>
            <div>
                <Link to="/consultaRapida/EditOrSeeDetails">
                    <BasicButtons
                        onClick={props.seeDetailFunction}
                        variantName="outlined"
                        iconName={faEye}
                        buttonName={props.className === 'class-cardConsulta-table' ? "Ver detalle" : ""}
                    />
                </Link>
                <Link to="/consultaRapida/EditOrSeeDetails">
                    <BasicButtons
                        onClick={props.editFunction}
                        variantName="contained"
                        iconName={faPen}
                        buttonName={props.className === 'class-cardConsulta-table' ? "Editar" : ""}
                    />
                </Link>
            </div>
        </div>
    )
}