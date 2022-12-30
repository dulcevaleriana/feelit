import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function CardConsultas(props) {
  return (
    <Card sx={{ maxWidth: 345 }} className="class-CardConsultas">
      <CardActionArea>
        <CardMedia
          component="img"
          image={props.img}
          alt="green iguana"
        />
        <CardContent>
            <Typography variant="body2" color="text.secondary">
                Nombre Apellido
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Consulta Flash
            </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}