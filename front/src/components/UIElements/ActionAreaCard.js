import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function ActionAreaCard(props) {
  return (
    <Card sx={{ maxWidth: 345 }} className="class-ActionAreaCard" onClick={()=>props.onClick()}>
      <CardActionArea>
        <CardMedia
          component="img"
          image={props.img}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            Nombre Apellido
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Consulta Flash
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Mensaje mensaj...
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}