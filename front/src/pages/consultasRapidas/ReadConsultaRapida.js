import React from 'react';
import FilterComponent from '../../components/ConsultaRapidaComponent/FilterComponent';
import CardConsultas from '../../components/ConsultaRapidaComponent/CardConsultas';

export default function ReadConsultaRapida(){
    return(
        <div className='class-GestionarConsultas'>
            <FilterComponent/>
            <CardConsultas/>
        </div>
    )
}