import React, { FC, useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/styles';
import { Button, Typography } from '@material-ui/core';
import { useLoggedInUser } from '../firebase/auth';
import { offersCollection, categoriesCollection, timestampNow, fileStorage, Category } from '../firebase/firestore';
import { Redirect } from 'react-router';
import { DropzoneArea } from 'material-ui-dropzone';
import MenuItem from '@material-ui/core/MenuItem';


const useStyles = makeStyles({
  offerInput: {
    marginTop: 20,
    textAlign: "left"
  },
  newOfferContainer: {
    padding: 20
  }
});

const New: FC = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);
  const [phone, setPhone] = useState<string>("");
  const [redirect, setRedirect] = useState<boolean>(false);
  const [availableCategories, setAvailableCategories] = useState<Category[]>([])
  const [selectedCategory, setCategory] = useState<string>("")

  const user = useLoggedInUser();

  useEffect(() => {
    (async () => {
      try {
        const data = await categoriesCollection.get();
        console.log(data.docs.map(doc => doc.data()))
        setAvailableCategories(data.docs.map(doc => doc.data()));
      }
      catch (error) {
        console.error(error);
      }
    })()
  },[])

  const uploadImages = async (images:File[] | null) => {
    const imagesURLs: string[] = [];
    if(images?.length){
      images.forEach(async image => {
        const storageRef = fileStorage.child(`images/${image.name}`);
        try {
          await storageRef.put(image);
          const imgUrl = await storageRef.getDownloadURL();
          imagesURLs.push(imgUrl);
        }
        catch (error) {
          console.error(error);
        }
      });
      setImages(imagesURLs);
    }
  }


  const submitOffer = async () => {
    if(user){
      const categoryDocs = await categoriesCollection
        .where("name", "==", selectedCategory)
        .get();

      const categoryRef = categoryDocs.docs.map(doc => doc.ref)[0];

      try{
        await offersCollection.add({
          userRef: {
            uid: user.uid,
            email: user.email
          },
          imgPaths: images,
          title,
          description,
          price,
          created: timestampNow(),
          phone,
          categoryRef: categoryRef
        });
        setRedirect(true);
      }
      catch(error){
        console.error(error);
      }
    }
  }

  const classes = useStyles();

  if(redirect){
    return <Redirect to="/" />
  }

  return(
    <Grid container spacing={2} className={classes.newOfferContainer}>

      <Grid item xs={12}>
        <Typography variant="h4">Vložit inzerát</Typography>
      </Grid>

      <Grid container item spacing={2} alignContent="center" justify="center">
        <Grid item xs={12} lg={7}>
          <DropzoneArea
            acceptedFiles={['image/*']}
            dropzoneText={"Přetáhněte obrázky nebo je nahrajte kliknutím"}
            filesLimit={5}
            maxFileSize={1000000}
            onChange={(files) => { uploadImages(files) }} />
        </Grid>

        <Grid item xs={12} lg={7}>
          <TextField className={classes.offerInput}
            label="Co prodáváte? (max. 60 znaků)"
            variant="outlined"
            fullWidth
            onChange={e => setTitle(e.target.value)} />
        </Grid>

        <Grid item xs={12} lg={7}>
          <TextField className={classes.offerInput}
            label="Detaily (max. 1 000 znaků)"
            variant="outlined"
            fullWidth
            multiline
            rows={8}
            rowsMax={8}
            onChange={e => setDescription(e.target.value)} />
        </Grid>

        <Grid item xs={12} lg={7}>
          <TextField className={classes.offerInput}
            label="Vyberte kategorii"
            variant="outlined"
            fullWidth
            select
            onChange={e => setCategory(e.target.value)}>
            {availableCategories.map((category, i) => (
              <MenuItem key={i} value={category.name}>
                {category.name}</MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} lg={7}>
          <TextField className={classes.offerInput}
            label="Cena"
            variant="outlined"
            fullWidth
            onChange={e => setPrice(e.target.value)} />
        </Grid>

        <Grid item xs={12} lg={7}>
          <TextField className={classes.offerInput}
            label="E-mail"
            variant="outlined"
            fullWidth
            value={user?.email ?? ""} />
        </Grid>

        <Grid item xs={12} lg={7}>
          <TextField className={classes.offerInput}
            label="Telefon"
            variant="outlined"
            fullWidth
            onChange={e => setPhone(e.target.value)} />
        </Grid>

        <Grid item xs={12} lg={7} className={classes.offerInput}>
          <Button size="large" color="secondary" variant="contained"
            onClick={submitOffer}>Vložit inzerát</Button>
        </Grid>
      </Grid>
    </Grid>
  )
};

export default New;
