import React, { FC, useState, useEffect } from 'react';
import OfferCard from '../components/OfferCard';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Offer, offersCollection } from '../firebase/firestore';

const Home: FC = () => {

  const [offers, setOffers] = useState<Offer[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await offersCollection.get();
        setOffers(data.docs.map(doc => doc.data()));
      }
      catch (error) {
        console.error(error);
      }
    })()
  },[])

  return (
    <Grid container spacing={2} >
      <Grid item xs={12} lg={12}>
        <TextField id="searchOfferInp" label="Hledat..." variant="outlined" fullWidth />
      </Grid>
      <Grid item container xs={12} lg={12} spacing={2}>

        {offers.map((offer) => (
          <OfferCard
            price={offer.price}
            imgPath={offer.imgPath}
            title={offer.title}
          />
        ))}

      </Grid>
    </Grid>
  )
};

export default Home;
