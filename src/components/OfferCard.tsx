import React, { FC } from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import {Offer} from '../firebase/firestore';
import Logo from '../images/logo.png';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  link: { textDecoration: 'none' },
  boldText: {fontWeight: "bold"},
  offerImg: {height: 160, objectFit:"scale-down"}
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
    <Grid item xs={12} md={6} lg={3}>
      <Link className={classes.link} to={`/detail/${id}`}>
        <Card>
          <CardActionArea>
            <CardMedia
              component="img"
              image={imgPaths ? imgPaths[0] : Logo}
              className={classes.offerImg}
              title={"Detail nabídky"}
            />
            <CardContent>
              <Typography color="primary" variant="subtitle2" className={classes.boldText}>
                {title}
              </Typography>
            </CardContent>
          </CardActionArea>
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
