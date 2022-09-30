import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import BasicButtons from './BasicButtons-MUI';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";

export default function UsersItem(props) {
  return (
    <Link to={`/${props.id}/places`}>
        <Card sx={{ minWidth: 275 }} key={props.id} id={props.id}>
        <CardContent>
            <div>
                <img src={props.image} alt={props.image} />
            </div>
            <Typography variant="h5" component="div">
            {props.name}
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {props.email}
            </Typography>
            <Box component="span">
                Places: {props.places.length}
            </Box>
            <CardActions>
            <Link to={`/editUser/${props.id}`}>
                <BasicButtons
                    spacing={2}
                    variantName="contained"
                    buttonName="Edit Account"
                />
            </Link>
            <Link to={`/${props.id}/places`}>
                <BasicButtons
                    spacing={2}
                    variantName="outlined"
                    buttonName="See places"
                />
            </Link>
        </CardActions>
        </CardContent>
        </Card>
    </Link>
  );
}
