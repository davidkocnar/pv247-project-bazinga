import React, { FC, useContext } from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
//import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
//import { makeStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';


const OfferCard: FC = () =>{

  return (
    <Grid item xs={3}>
      <Card>
        <CardContent>
          <img src='../../public/ntb1.jpg' alt='notebook'/>
        </CardContent>

        <CardActions>
          <Typography color="textSecondary">
            15 000 Kč
          </Typography>
        </CardActions>
      </Card>
    </Grid>
  )

}

export default OfferCard