import React, { FC, useState, useEffect } from 'react';
import OfferCard from '../components/OfferCard';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { categoriesCollection, Category, Offer, offersCollection } from '../firebase/firestore';
import { FormControl, InputLabel, Select } from '@material-ui/core';

type Offers = Record<string, Offer>;
type Categories = Record<string, Category>;

const Home: FC = () => {

  const [offers, setOffers] = useState<Offers>({});
  const [search, setSearch] = useState<string>("");
  const [categories, setCategories] = useState<Categories>({});
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useEffect(() => {
    offersCollection.get().then(querySnapshot => {
      setOffers(querySnapshot.docs.reduce((previousValue, currentValue) => ({ ...previousValue, [currentValue.id]: currentValue.data() }), {}))
    }).catch(error => console.error(error));

    categoriesCollection.get().then(querySnapshot => {
      setCategories(querySnapshot.docs.reduce((previousValue, currentValue) => ({ ...previousValue, [currentValue.id]: currentValue.data() }), {}))
    })
  }, [])

  return (
    <Grid container spacing={2} >
      <Grid item xs={12} sm={4}>
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="outlined-age-native-simple">Kategorie</InputLabel>
          <Select
            native
            value={selectedCategory}
            onChange={e => {if (typeof e.target.value === 'string') {setSelectedCategory(e.target.value)}}}
            label="Kategorie"
            inputProps={{
              name: "Kategorie",
              id: "outlined-age-native-simple"
            }}
          >
            <option aria-label="None" value="" />
            {Object.keys(categories).map(id => (<option key={id} value={id}>{categories[id].name}</option>))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={8}>
        <TextField
          id="searchOfferInp"
          label="Hledat..."
          variant="outlined"
          value={search}
          onChange={e => setSearch(e.target.value)}
          fullWidth />
      </Grid>

      <Grid item container xs={12} lg={12} spacing={2}>
        {Object.keys(offers).filter(key => offers[key]
          .categoryRef?.id.includes(selectedCategory))
          .filter(key => offers[key].title.toLowerCase()
          .includes(search?.toLowerCase() || "")).map(key => {

          const offer = offers[key];
          return (
            <OfferCard
              price={offer.price}
              imgPaths={offer.imgPaths}
              title={offer.title}
              id={key}
              key={key}
            />
          );
        })}
      </Grid>
    </Grid>
  )
};

export default Home;
