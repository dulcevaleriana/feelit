import React from 'react';
import BasicButtons from '../UIElements/BasicButtons-MUI';
import PlaceItem from './PlaceItem';

const PlaceList = (props) => {
    if(props.items.length === 0){
        return <div className='no-component'>
            <h2>You don't have any places added</h2>
            <BasicButtons
                variantName="contained"
                buttonName="Create one"
                onClick={()=>{}}
            />
        </div>
    }
    return <ul className='class-PlaceList'>
        {props.items.map((item)=>(
            <PlaceItem
                key={item.id}
                id={item.id}
                image={item.image}
                title={item.title}
                description={item.description}
                address={item.address}
                creatorId={item.creatorId}
                location={item.location}
            />
        ))}
    </ul>
}

export default PlaceList;