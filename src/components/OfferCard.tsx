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
  link: { textDecoration: 'none' },
  boldText: {fontWeight: "bold"}
}));

const beautifyNumString = (x: string) => {
  return x.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

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
            <img src={imgPaths ? imgPaths[0] : Logo} alt="NTB" height={150}/>
            <Typography color="primary" variant="subtitle2" className={classes.boldText}>
              {title}
            </Typography>
          </CardContent>
          <CardActions>
            <Grid container>
              <Grid item xs={12}>
                <Typography color="textPrimary" align="right" className={classes.boldText}>
                  {beautifyNumString(price)} Kč
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
