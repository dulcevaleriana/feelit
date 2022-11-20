import React from 'react';
import { faEye, faPen } from '@fortawesome/free-solid-svg-icons';
import BasicButtons from '../UIElements/BasicButtons-MUI';

export default function CardConsultas(props) {
    return (
        <div className='class-cardConsulta' key={props.key}>
            <div>
                <img src={props.img} alt={props.alt}/>
            </div>
            <h4>{props.name}</h4>
            <h5>
                {props.date}
                <br/>
                {props.time}
            </h5>
            <div>
                <BasicButtons
                    onClick={props.seeDetailFunction}
                    variantName="outlined"
                    iconName={faEye}
                />
                <BasicButtons
                    onClick={props.editFunction}
                    variantName="contained"
                    iconName={faPen}
                />
            </div>
        </div>
    )
}