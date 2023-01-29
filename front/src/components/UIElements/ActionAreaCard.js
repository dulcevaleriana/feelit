import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useHttpClient } from '../../shared/hooks/http-hook';

export default function ActionAreaCard(props) {
  const [getSpecialty, setSpecialty] = useState('');
  const { sendRequest } = useHttpClient();

  useEffect(()=>{
    const getSpecialtyFunction = async () => {
        try{
            const specialty = await sendRequest(process.env.REACT_APP_ + 'specialty/' + props.specialty)
            setSpecialty(specialty.getSpecialtyId.specialtyName)
        } catch(err){
        }
    }
    getSpecialtyFunction()
  },[sendRequest, props.specialty])

  return (
    <Card sx={{ maxWidth: 345 }} className="class-ActionAreaCard" onClick={()=>props.onClick()}>
      <CardActionArea>
        <CardMedia
          component="img"
          image={props.img ? props.img : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {props.name ? props.name : "N/A"}
          </Typography>
          {props.specialty && <Typography variant="body2" color="text.secondary">
            {props.specialty ? getSpecialty : "N/A"}
          </Typography>}
          {props.isLoggedIn && props.messagePaciente && <Typography variant="body2" color="text.secondary">
            {props.messagePaciente && props.messagePaciente}
          </Typography>}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}