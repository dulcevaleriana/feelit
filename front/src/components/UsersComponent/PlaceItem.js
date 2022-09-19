import React from 'react';
import BasicButtons from '../UIElements/BasicButtons-MUI';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const PlaceItem = (props) => {
    return <li className='class-PlaceItem'>
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
                    buttonName="Edit"
                    onClick={()=>{}}
                    variantName="contained"
                />
                <BasicButtons
                    buttonName="Delete"
                    onClick={()=>{}}
                    variantName="contained"
                />
            </CardActions>
        </Card>
    </li>
}

export default PlaceItem;