import React from 'react';

export default function PacienteData(props){
    return <div>
        <h5>Estos son tus datos:</h5>
        {props.DATATEMPORAL.map((index,key)=><span key={key}>
            <h4>{index.title}</h4>
            {typeof index.data === 'object' ? index.data.map(index => <h5>{index}</h5>) : <h5>{index.data}</h5>}
        </span>)}
    </div>
}