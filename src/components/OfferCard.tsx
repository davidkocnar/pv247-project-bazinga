import React, { FC } from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import {Offer} from '../firebase/firestore';
import Logo from '../images/logo.png';

const useStyles = makeStyles(theme => ({
  link: { textDecoration: 'none' }
}));

interface OfferCardProps extends Pick<Offer, "price" | "imgPaths" | "title"> {
  id: string
}

const OfferCard: FC<OfferCardProps> = ({price, imgPaths, title, id}) => {
  const classes = useStyles();

  return (
    <Grid item xs={12} lg={3}>
      <Link className={classes.link} to={`/detail/${id}`}>
        <Card>
          <CardContent>
            <img src={imgPaths ? imgPaths[0] : Logo} alt="NTB" height={170} />
            <Typography variant="subtitle2">{title}</Typography>
          </CardContent>
          <CardActions>
            <Grid container>
              <Grid item xs={6}>
                <Typography color="textSecondary" align="left">
                  {/*location*/}
              </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography color="textPrimary" align="right">
                  {price} Kč
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
