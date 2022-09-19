import React from 'react';
import BasicButtons from '../UIElements/BasicButtons-MUI';

const PlaceItem = (props) => {
    return <li className='class-PlaceItem'>
        <div>
            <img src={props.image} alt={props.title}/>
            <div>
                <h2>{props.title}</h2>
                <h3>{props.description}</h3>
                <p>{props.address}</p>
            </div>
            <div>
                <BasicButtons
                    buttonName="View on map"
                    onClick={()=>{}}
                    variantName="contained"
                />
                <BasicButtons
                    buttonName="Edit"
                    onClick={()=>{}}
                    variantName="contained"
                />
                <BasicButtons
                    buttonName="Delete"
                    onClick={()=>{}}
                    variantName="contained"
                />
            </div>
        </div>
    </li>
}

export default PlaceItem;