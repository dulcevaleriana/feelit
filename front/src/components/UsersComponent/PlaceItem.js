import React, {useState} from 'react';
import BasicButtons from '../UIElements/BasicButtons-MUI';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import ModalComponent from '../UIElements/ModalComponent';
import InputComponent from '../UIElements/InputComponent';

const PlaceItem = (props) => {
    const [showModal, setShowModal] = useState(false);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    return <React.Fragment>
        <ModalComponent
            show={showModal}
            onCancel={closeModal}
            className="class-modalEdit"
            iconName="close"
            footer={<React.Fragment>
                <BasicButtons
                    buttonName="Cancel"
                    onClick={closeModal}
                    variantName="contained"
                />
                <BasicButtons
                    buttonName="Save"
                    onClick={()=>{}}
                    variantName="contained"
                />
            </React.Fragment>}
        >
            <InputComponent elementType="input" label="inputtttt"/>
            <InputComponent elementType="select" label="select333333" selectOptions={['lala','lolo']}/>
            <InputComponent elementType="textarea" label="textarea"/>
        </ModalComponent>
        <li className='class-PlaceItem'>
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    component="img"
                    height="140"
                    image={props.image}
                    alt={props.title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {props.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {props.address}
                    </Typography>
                </CardContent>
                <CardActions>
                    <BasicButtons
                        buttonName="View on map"
                        onClick={()=>{}}
                        variantName="contained"
                    />
                    <BasicButtons
                        // to={`/editPlace/${props.id}`}
                        buttonName="Edit"
                        onClick={openModal}
                        variantName="contained"
                    />
                    <BasicButtons
                        // to={`/deletePlace/${props.id}`}
                        buttonName="Delete"
                        onClick={()=>{}}
                        variantName="contained"
                    />
                </CardActions>
            </Card>
        </li>
    </React.Fragment>
}

export default PlaceItem;