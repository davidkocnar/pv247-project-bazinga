import React, { FC } from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import NtbImage from '../images/ntb1.jpg';

const OfferCard: FC = () =>{

  return (
    <Grid item xs={12} lg={3}>
      <Card>
        <CardContent>
          <img src={NtbImage} alt="NTB" width={200}/>
          <Typography variant="subtitle2">Notebook Lenovo</Typography>
        </CardContent>
        <CardActions>
          <Grid container>
            <Grid item xs={6}>
              <Typography color="textSecondary" align="left">
                Brno
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography color="textPrimary" align="right">
                15 000 Kč
              </Typography>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </Grid>
  )
}

export default OfferCard
