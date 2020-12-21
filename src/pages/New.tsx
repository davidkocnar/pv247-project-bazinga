import React, {FC, useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/styles';
import {Button, Typography} from '@material-ui/core';
import {useLoggedInUser} from '../firebase/auth';
import {
  offersCollection,
  categoriesCollection,
  timestampNow,
  fileStorage,
  Category
} from '../firebase/firestore';
import {Redirect} from 'react-router';
import {DropzoneArea} from 'material-ui-dropzone';
import MenuItem from '@material-ui/core/MenuItem';
import {useForm, Controller} from "react-hook-form";

export type OfferFormData = {
  title: string;
  description: string;
  price: string,
  category: string,
  email: string;
  phone: string
}

const useStyles = makeStyles({
  offerInput: {
    marginTop: 20,
    textAlign: "left"
  },
  newOfferContainer: {
    padding: 20
  },
  offerForm: {
    width: 100
  }
});

const New: FC = () => {

  const [images, setImages] = useState<string[]>([]);
  const [redirect, setRedirect] = useState<boolean>(false);
  const [availableCategories, setAvailableCategories] = useState<Category[]>([])
  const [error, setError] = useState<string>();
  const { control, handleSubmit, errors: fieldErrors } = useForm<OfferFormData>();

  const user = useLoggedInUser();

  const onSubmit = async (data: OfferFormData) => {
    if (user) {
      const categoryDocs = await categoriesCollection
        .where("name", "==", data.category)
        .get();

      const categoryRef = categoryDocs.docs.map(doc => doc.ref)[0];

      try {
        await offersCollection.add({
          userRef: {
            uid: user.uid,
            email: user.email
          },
          imgPaths: images,
          title: data.title,
          description: data.description,
          price: data.price,
          created: timestampNow(),
          categoryRef: categoryRef
        });
        setRedirect(true);
      } catch (error) {
        setError(error);
      }
    }
  }

  useEffect(() => {
    (async () => {
      try {
        const data = await categoriesCollection.get();
        setAvailableCategories(data.docs.map(doc => doc.data()));
      } catch (error) {
        setError(error);
      }
    })()
  }, [])

  const uploadImages = async (images: File[] | null) => {
    const imagesURLs: string[] = [];
    if (images?.length) {
      images.forEach(async image => {
        const storageRef = fileStorage.child(`images/${image.name}`);
        try {
          await storageRef.put(image);
          const imgUrl = await storageRef.getDownloadURL();
          imagesURLs.push(imgUrl);
        } catch (error) {
          setError(error);
        }
      });
      setImages(imagesURLs);
    }
  }

  const classes = useStyles();

  if(redirect){
    return <Redirect to="/profile"/>
  }

  return (
    <Grid container spacing={2} className={classes.newOfferContainer}>

      <Grid item xs={12}>
        <Typography variant="h4">Vložit inzerát</Typography>
      </Grid>

      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>

        <Grid container item spacing={2} alignContent="center" justify="center">
          <Grid item xs={12} lg={7}>
            <DropzoneArea
              acceptedFiles={['image/*']}
              dropzoneText={"Přetáhněte obrázky nebo je nahrajte kliknutím"}
              filesLimit={5}
              maxFileSize={1000000}
              onChange={(files) => {
                uploadImages(files)
              }}/>
          </Grid>

          <Grid item xs={12} lg={7}>
            <Controller
              name="title"
              as={
                <TextField
                  className={classes.offerInput}
                  label="Co prodáváte? (max. 60 znaků)"
                  variant="outlined"
                  fullWidth
                  helperText={fieldErrors.title ? fieldErrors.title.message : null}
                  error={fieldErrors.title !== undefined}
                />
              }
              control={control}
              defaultValue=""
              rules={{
                required: 'Vyplňte název prodávaného produktu'
              }}
            />
          </Grid>

          <Grid item xs={12} lg={7}>
            <Controller
              name="description"
              as={
                <TextField
                  className={classes.offerInput}
                  label="Detaily (max. 1 000 znaků) (nepovinné)"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={8}
                  rowsMax={8}
                  helperText={fieldErrors.description ? fieldErrors.description.message : null}
                  error={fieldErrors.description !== undefined}
                />
              }
              control={control}
              defaultValue=""
              rules={{}}
            />
          </Grid>

          <Grid item xs={12} lg={7}>
            <Controller
              name="category"
              as={
                <TextField
                  className={classes.offerInput}
                  label="Vyberte kategorii"
                  variant="outlined"
                  fullWidth
                  select
                  helperText={fieldErrors.category ? fieldErrors.category.message : null}
                  error={fieldErrors.category !== undefined}
                >
                  {availableCategories.map((category, i) => (
                    <MenuItem key={i} value={category.name}>
                      {category.name}
                    </MenuItem>))}
                </TextField>
              }
              control={control}
              defaultValue=""
              rules={{
                required: 'Vyberte kategorii prodávaného produktu'
              }}
            />
          </Grid>

          <Grid item xs={12} lg={7}>
            <Controller
              name="price"
              as={
                <TextField
                  className={classes.offerInput}
                  label="Cena"
                  variant="outlined"
                  fullWidth
                  helperText={fieldErrors.price ? fieldErrors.price.message : null}
                  error={fieldErrors.price !== undefined}
                />
              }
              control={control}
              defaultValue=""
              rules={{
                required: 'Vyplňte cenu prodávaného produktu',
                pattern: {
                  value: /^[0-9]{1,9}$/i,
                  message: 'Špatný formát ceny'
                }
              }}
            />
          </Grid>

          <Grid item xs={12} lg={7}>
            {error && (
              <Typography variant="subtitle2" align="left" color="error" paragraph>
                <b>{error}</b>
              </Typography>
            )}
          </Grid>

          <Grid item xs={12} lg={7}>
            <Button
              color="primary"
              type="submit"
              size="large"
              variant="contained"
              style={{marginBottom: "3rem"}}>
              Vložit inzerát
            </Button>
          </Grid>
        </Grid>
      </form>
    </Grid>
  )
};

export default New;
