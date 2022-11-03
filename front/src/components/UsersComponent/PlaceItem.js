import React, { useState, useContext } from 'react';
import BasicButtons from '../UIElements/BasicButtons-MUI';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import ModalComponent from '../UIElements/ModalComponent';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from "../../shared/hooks/http-hook";

const PlaceItem = (props) => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [showModal, setShowModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const auth = useContext(AuthContext);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    const confirmDeleteHandler = async () => {
        setShowConfirmModal(false);
        try{
            await sendRequest(
                `http://localhost:5000/api/places/${props.id}`,
                'DELETE',
                null,
                {
                    Authorization: 'Bearer ' + auth.token
                }
            );
            props.onDelete(props.id);
        }catch(err){}
    };

    console.log("auth.userId",auth.userId)
    console.log("props.creatorId",props.creatorId)

    return <React.Fragment>
        <ModalComponent
            headerTitle='You can not access for now'
            show={error}
            onCancel={clearError}
        >
            {error}
        </ModalComponent>
        {isLoading && <h1>Loading...</h1>}
        <ModalComponent
            show={showModal}
            onCancel={closeModal}
            className="class-modalEdit"
            iconName="close"
            footer={<React.Fragment>
                <BasicButtons
                    buttonName="Ok"
                    onClick={closeModal}
                    variantName="contained"
                />
            </React.Fragment>}
        >
            <h1>Map is not avaiable</h1>
        </ModalComponent>
        <ModalComponent
            show={showConfirmModal}
            onCancel={()=>setShowConfirmModal(false)}
            className="class-modalEdit"
            iconName="close"
            footer={<React.Fragment>
                <BasicButtons
                    buttonName="Cancel"
                    onClick={()=>setShowConfirmModal(false)}
                    variantName="contained"
                />
                <BasicButtons
                    buttonName="Delete"
                    onClick={confirmDeleteHandler}
                    variantName="contained"
                />
            </React.Fragment>}
        >
            <p>
                Do you want to proceed and delete this place? Please note that it
                can't be undone thereafter.
            </p>
        </ModalComponent>
        <li className='class-PlaceItem'>
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    component="img"
                    height="140"
                    image={`http://localhost:5000/${props.image}`}
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
                        onClick={openModal}
                        variantName="contained"
                    />
                    {auth.userId === props.creator && (
                        <>
                            <BasicButtons
                                to={`/place/${props.id}`}
                                buttonName="Edit"
                                variantName="contained"
                            />
                            <BasicButtons
                                buttonName="Delete"
                                onClick={()=>setShowConfirmModal(true)}
                                variantName="contained"
                            />
                        </>
                    )}
                </CardActions>
            </Card>
        </li>
    </React.Fragment>
}

export default PlaceItem;