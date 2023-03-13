import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function BasicCardMUI(props) {
  return (
    <Card sx={{ minWidth: 275 }} className={props.className ? props.className : " "}>
      <CardContent>
        {props.data.map((data,key) => (
            <Typography key={key} variant={data.variant} component={data.component}>
                {data.info}
            </Typography>
        ))}
      </CardContent>
      {props.cardAction && (
        <CardActions>
            {props.cardAction}
        </CardActions>
      )}
    </Card>
  );
}
