import React, {FC, useState, useEffect} from 'react';
import OfferCard from '../components/OfferCard';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import {categoriesCollection, Category, Offer, offersCollection} from '../firebase/firestore';
import {FormControl} from '@material-ui/core';
import MenuItem from "@material-ui/core/MenuItem";
import {useStyles} from "../App";

type Offers = Record<string, Offer>;
type Categories = Record<string, Category>;

const Home: FC = () => {

  const [offers, setOffers] = useState<Offers>({});
  const [search, setSearch] = useState<string>("");
  const [categories, setCategories] = useState<Categories>({});
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const classes = useStyles();

  useEffect(() => {
    offersCollection.get().then(querySnapshot => {
      setOffers(querySnapshot.docs.reduce((previousValue, currentValue) => ({ ...previousValue, [currentValue.id]: currentValue.data() }), {}))
    }).catch(error => console.error(error));

    categoriesCollection.get().then(querySnapshot => {
      setCategories(querySnapshot.docs.reduce((previousValue, currentValue) => ({ ...previousValue, [currentValue.id]: currentValue.data() }), {}))
    })
  }, [])

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={4}>
        <FormControl fullWidth variant="outlined">
          <TextField
            label="Kategorie"
            variant="outlined"
            value={selectedCategory}
            className={classes.input}
            onChange={e => {
              setSelectedCategory(e.target.value)
            }}
            select>
            {[""].concat(Object.keys(categories)).map(id => (
              categories[id]?.name ?
                <MenuItem key={id} value={id}>
                  {categories[id].name}
                </MenuItem>
                :
                <MenuItem key={id} value={""} className={classes.disable}>
                  Zobrazit vše
                </MenuItem>
            ))}
          </TextField>
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
