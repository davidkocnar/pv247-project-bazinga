import React, { FC, useState, useEffect } from 'react';
import OfferCard from '../components/OfferCard';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Offer, offersCollection } from '../firebase/firestore';

type Offers = Record<string, Offer>;

const Home: FC = () => {

  const [offers, setOffers] = useState<Offers>({});

  useEffect(() => {
    offersCollection.get().then(querySnapshot => {
      setOffers(querySnapshot.docs.reduce((previousValue, currentValue) => ({ ...previousValue, [currentValue.id]: currentValue.data() }), {}))
    }).catch(error => console.error(error));
  }, [])

  return (
    <Grid container spacing={2} >
      <Grid item xs={12} lg={12}>
        <TextField id="searchOfferInp" label="Hledat..." variant="outlined" fullWidth />
      </Grid>
      <Grid item container xs={12} lg={12} spacing={2}>
        {Object.keys(offers).map(key => {
          const offer = offers[key];
          return (<OfferCard
            price={offer.price}
            imgPaths={offer.imgPaths}
            title={offer.title}
            id={key}
            key={key}
          />);
        })}
      </Grid>
    </Grid>
  )
};

export default Home;
