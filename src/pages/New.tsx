import React, { FC, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/styles';
import { Button, Typography } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { useLoggedInUser } from '../firebase/auth';
import { offersCollection, timestampNow, fileStorage } from '../firebase/firestore';
import { Redirect } from 'react-router';

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
  const [picture, setPicture] = useState<string>();
  const [phone, setPhone] = useState<string>();
  const [redirect, setRedirect] = useState<boolean>()

  const user = useLoggedInUser();

  const uploadImage = async (image:File | null) => {
    if(image){
      const storageRef = fileStorage.child(`images/${image.name}`);
      try {
        await storageRef.put(image);
        const imgUrl = await storageRef.getDownloadURL();
        setPicture(imgUrl);
      }
      catch (error) {
        console.error(error);
      }
    }
  }

  const submitOffer = async () => {
    if(user){
      try{
        await offersCollection.add({
          userRef: {
            uid: user.uid,
            email: user.email
          },
          imgPath: picture,
          title: title ?? "",
          description: description ?? "",
          price: price ?? "",
          created: timestampNow(),
          phone: phone ?? ""
        });
        setRedirect(true);
      }
      catch(error){
        console.error(error);
      }
    }
  }

  return(

    <Grid container spacing={2} alignContent="center" alignItems="center">
      {redirect ? <Redirect to="/"/> : <></>}

      <Grid item xs={12}>
        <Typography variant="h4">Vložit inzerát</Typography>
      </Grid>

      <Grid item xs={6} lg={6} >
        <img src={picture} alt="" width={500} />
        <input
          accept="image/*"
          className={classes.input}
          id="upload-photo"
          multiple
          type="file"
          onChange={e => uploadImage(e.target.files ? e.target.files[0] : null)}
        />
        <label htmlFor="upload-photo">
          <Button variant="contained" color="secondary" startIcon={<CloudUploadIcon/>} component="span">
            Vybrat fotografie
          </Button>
        </label>
      </Grid>

      <Grid item xs={6} lg={6}>
        <TextField
          label="Co prodáváte? (max. 60 znaků)"
          variant="outlined"
          fullWidth
          onChange={e => setTitle(e.target.value)}/>
      </Grid>

      <Grid item xs={6} lg={6}>
        <TextField
          label="Detaily (max. 1 000 znaků)"
          variant="outlined"
          fullWidth
          multiline
          onChange={e => setDescription(e.target.value)}/>
      </Grid>

      <Grid item xs={6} lg={6}>
        <TextField
          label="Cena"
          variant="outlined"
          fullWidth
          onChange={e => setPrice(e.target.value)}/>
      </Grid>

      <Grid item xs={6} lg={6}>
        <TextField
          label="E-mail"
          variant="outlined"
          fullWidth
          value={user?.email}/>
      </Grid>

      <Grid item xs={6} lg={6}>
        <TextField
          label="Telefon"
          variant="outlined"
          fullWidth
          onChange={e => setPhone(e.target.value)} />
      </Grid>

      <Grid item xs={12}>
        <Button color="secondary" variant="contained" onClick={submitOffer}>Vložit inzerát</Button>
      </Grid>
    </Grid>
  )
};

export default New;
