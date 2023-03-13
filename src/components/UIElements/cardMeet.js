import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Link } from "react-router-dom";

export default function CardMeet(props) {
  return (
    <Card sx={{ maxWidth: 345 }} className="class-cardMeet">
      <CardActionArea>
        <CardMedia
          component="img"
          image={props.img}
          alt="green iguana"
        />
        <CardContent>
            <Typography variant="body2" color="text.secondary">
                Consulta Flash
            </Typography>
            <Typography variant="body2" color="text.secondary">
                00:00 PM
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Nombre Apellido
            </Typography>
            <Link to="/">Ver más</Link>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}