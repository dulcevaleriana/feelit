import React from 'react';
import { faEye, faPen } from '@fortawesome/free-solid-svg-icons';
import BasicButtons from '../UIElements/BasicButtons-MUI';

export default function CardConsultas() {
    return (
        <div className='class-cardConsulta'>
            <div>
                <img src="https://cdn.pixabay.com/photo/2017/03/14/03/20/woman-2141808__480.jpg" alt="img"/>
            </div>
            <h4>Juan Ortega</h4>
            <h5>08/08/2022 <br/> 2:00pm</h5>
            <div>
                <BasicButtons
                    onClick={()=>{}}
                    variantName="outlined"
                    iconName={faEye}
                />
                <BasicButtons
                    onClick={()=>{}}
                    variantName="contained"
                    iconName={faPen}
                />
            </div>
        </div>
    )
}