import React, { FC } from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import NtbImage from '../images/ntb1.jpg';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  link: { textDecoration: 'none' }
}));

const OfferCard: FC = () => {

  // Styles
  const classes = useStyles();

  return (
    <Grid item xs={12} lg={3}>
      <Link className={classes.link} to="detail">
        <Card>
          <CardContent>
            <img src={NtbImage} alt="NTB" width={200} />
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
      </Link>
    </Grid>
  )
}

export default OfferCard
