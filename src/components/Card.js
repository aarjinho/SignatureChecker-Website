import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function ActionAreaCard(props) {
  return (
    <Card sx={{ "&:hover": {transform : 'scale(1.05)' , transition : '0.3s'}, maxWidth: 345,  mt : 3, borderRadius : "20px", transition : '0.2s' }} elevation={6}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image= {require('../images/' + props.img)}
          alt={props.titre}
          sx={{objectFit : "contain", borderRadius : "15px 15px 0 0"}}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card >
  );
}
