import React, {useState, useCallback} from 'react';
import BasicButtons from '../UIElements/BasicButtons-MUI';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import ModalComponent from '../UIElements/ModalComponent';
import InputComponent from '../UIElements/InputComponent';
import { VALIDATOR_REQUIRE } from '../../shared/util/validators';

const PlaceItem = (props) => {
    const [showModal, setShowModal] = useState(false);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    const titleInputHangler = useCallback((id, value, isValid) => {

    },[])

    const descriptionInputHangler = useCallback((id, value, isValid) => {

    },[])

    const selectInputHangler = useCallback((id, value, isValid) => {

    },[])

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
            <InputComponent
                id="input"
                elementType="input"
                label="inputtttt"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="error try again"
                placeholder="Input name"
                onInput={titleInputHangler}
            />
            <InputComponent
                id="select"
                elementType="select"
                label="select333333"
                selectOptions={['lala','lolo']}
                errorText="error try again"
                placeholder="Input name"
                onInput={selectInputHangler}
                validators={[VALIDATOR_REQUIRE()]}
            />
            <InputComponent
                id="textarea"
                elementType="textarea"
                label="textarea"
                errorText="error try again"
                placeholder="Input name"
                onInput={descriptionInputHangler}
                validators={[VALIDATOR_REQUIRE()]}
            />
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
                        to={`/place/${props.id}`}
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