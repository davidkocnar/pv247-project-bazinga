import React, { FC } from 'react';
import OfferCard from '../components/OfferCard';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  marginTop: {
    marginTop: 20,
  },
});

const Home: FC = () => {
  const classes = useStyles();

  return (
    <Grid container spacing={2} className={classes.marginTop}>
      <Grid item xs={12} lg={12}>
        <TextField id="searchOfferInp" label="Hledat..." variant="outlined" fullWidth />
      </Grid>
      <Grid item container xs={12} lg={12} spacing={2}>
        <OfferCard />
        <OfferCard />
        <OfferCard />
        <OfferCard />
      </Grid>
      <Grid item container xs={12} lg={12} spacing={2}>
        <OfferCard />
        <OfferCard />
        <OfferCard />
        <OfferCard />
      </Grid>
      <Grid item container xs={12} lg={12} spacing={2}>
        <OfferCard />
        <OfferCard />
        <OfferCard />
        <OfferCard />
      </Grid>
    </Grid>
  )
};

export default Home;
