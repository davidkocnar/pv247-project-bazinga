import React, { FC, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/styles';
import { Button, Typography } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { useLoggedInUser } from '../firebase/auth';
import { offersCollection } from '../firebase/firestore'

const useStyles = makeStyles({
  input: {
    display: 'none',
  },
});

const New: FC = () => {
  const classes = useStyles();
  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [price, setPrice] = useState<string>();

  const user = useLoggedInUser();

  const submitOffer = async () => {
    try{
      await offersCollection.add({
        userRef: user?.uid,
        title,
        description,
        price
      });
    }
    catch(error){
      console.error(error);
    }
  }

  return(
    <Grid container spacing={2} alignContent="center" alignItems="center">
      <Grid item xs={12}>
        <Typography variant="h4">Vložit inzerát</Typography>
      </Grid>

      <Grid item xs={6} lg={6} >
        <input
          accept="image/*"
          className={classes.input}
          id="upload-photo"
          multiple
          type="file"
        />
        <label htmlFor="upload-photo">
          <Button variant="contained" color="secondary" startIcon={<CloudUploadIcon/>} component="span">
            Vybrat fotografie
          </Button>
        </label>
      </Grid>

      <Grid item xs={6} lg={6}>
        <TextField id="searchOfferInp"
          label="Co prodáváte? (max. 60 znaků)"
          variant="outlined"
          fullWidth
          onChange={e => setTitle(e.target.value)}/>
      </Grid>

      <Grid item xs={6} lg={6}>
        <TextField id="searchOfferInp"
          label="Detaily (max. 1 000 znaků)"
          variant="outlined"
          fullWidth
          multiline
          onChange={e => setDescription(e.target.value)}/>
      </Grid>

      <Grid item xs={6} lg={6}>
        <TextField id="searchOfferInp"
          label="Cena"
          variant="outlined"
          fullWidth
          onChange={e => setPrice(e.target.value)}/>
      </Grid>

      <Grid item xs={6} lg={6}>
        <TextField id="searchOfferInp"
          label="E-mail"
          variant="outlined"
          fullWidth
          value={user?.email}/>
      </Grid>

      <Grid item className={classes.marginTop}>
        <Button onClick={submitOffer}>Vložit inzerát</Button>
      </Grid>
    </Grid>
  )
};

export default New;
