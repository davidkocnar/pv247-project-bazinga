import { Button, CircularProgress, Grid, GridList, GridListTile, makeStyles, TextField, Typography } from '@material-ui/core';
import React, { FC, useMemo, useState } from 'react';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { Offer, offersCollection, UserData, usersCollection } from '../firebase/firestore';
import Logo from '../images/logo.png';
import { useLoggedInUser } from '../firebase/auth';
import { Controller, useForm } from 'react-hook-form';
import { OfferFormData } from './New';

const useStyles = makeStyles(theme => ({
  margin: { marginBottom: theme.spacing(2), marginTop: theme.spacing(2) },
  link: { textDecoration: 'none' },
  gridList: {
    height: 100,
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
  },
  gridListTile: {
    height: '100% !important',
    cursor: 'pointer'
  },
  img: { height: "100%", width: 'auto' }
}));

const numberWithSpaces = (x: number) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

interface DetailParamProps {
  itemId: string
}

const Detail: FC<RouteComponentProps<DetailParamProps>> = (props: RouteComponentProps<DetailParamProps>) => {

  const loggedInUser = useLoggedInUser();
  const [offer, setOffer] = useState<Offer>();
  const [user, setUser] = useState<UserData>();
  const [mainImage, setMainImage] = useState<string>();
  const [editing, setEditing] = useState<boolean>(false);

  const classes = useStyles();
  const history = useHistory();

  useMemo(() => {
    offersCollection.doc(props.match.params.itemId).get().then(querySnapshot => {
      const data = querySnapshot.data();
      setOffer(data);
      if (data?.imgPaths !== undefined && data?.imgPaths.length > 0) {
        setMainImage(querySnapshot.data()?.imgPaths[0])
      }
    })
  }, [props.match.params.itemId])

  useMemo(() => {
    usersCollection.doc(offer?.userRef.uid).get().then(querySnapshot => {
      setUser(querySnapshot.data());
    })
  }, [offer])

  const deleteOffer = async () => {
    if (loggedInUser && loggedInUser.uid === offer?.userRef.uid) {
      try {
        await offersCollection.doc(props.match.params.itemId).delete();
        history.goBack();
      }
      catch (error) {
        console.error(error);
      }
    }
  }

  if (offer && user) {
    return (
      <>
        <Grid container justify="flex-start">
          <Button onClick={() => history.goBack()} startIcon={<ArrowBackIosIcon />}>Zpět na přehled</Button>
        </Grid>
        <Grid className={classes.margin} container justify="center" spacing={3}>
          <Grid item xs={10}>
            <Typography variant="h4" align="left">{offer?.title}</Typography>
          </Grid>
          <Grid item className={classes.margin} xs={10} md={5}>
            <img src={mainImage || Logo} alt="NTB" width={350} />
            {offer.imgPaths?.length > 1 &&
              <GridList className={classes.gridList} cols={3}>
                {offer.imgPaths.map(img => (
                  <GridListTile onClick={() => { setMainImage(img) }} className={classes.gridListTile} key={img}>
                    <img src={img} alt="NTB" className={classes.img} />
                  </GridListTile>
                ))}
              </GridList>}

            <Grid className={classes.margin} container alignItems="flex-start" spacing={2}>
              <BasicInfoRow title={"Prodávající:"} content={user ? user.name + ' ' + user.surname : 'Nespecifikován'} />
              <BasicInfoRow title={"e-mail:"} content={offer?.userRef.email ? offer.userRef.email : 'Nespecifikován'} />
              <BasicInfoRow title={"tel:"} content={user?.phone ? user.phone : 'Nespecifikován'} />
              <BasicInfoRow title={"místo:"} content={user ? user.location : 'Nespecifikováno'} />
            </Grid>
            <Grid container alignItems="center" justify="center">
              {offer?.userRef.email &&
                <Grid item xs={4}>
                  <a className={classes.link} href={`mailto:${offer?.userRef.email}`}>
                    <Button className={classes.margin} color="secondary" variant="contained">Kontaktovat</Button>
                  </a>
                </Grid>}
              {loggedInUser && offer.userRef.uid === loggedInUser.uid &&
                <>
                  <Grid item xs={4}>
                    <Button onClick={() => setEditing(true)} color="primary" variant="contained">Editovat</Button>
                  </Grid>
                  <Grid item xs={4}>
                    <Button onClick={deleteOffer} variant="contained">Smazat</Button>
                  </Grid>
                </>}
            </Grid>
          </Grid>
          {editing ? <OfferEdit itemId={props.match.params.itemId} closeUpdate={(newOffer) => { setEditing(false); setOffer(newOffer) }} offer={offer} /> : <OfferInfo offer={offer} />}
        </Grid >
      </>
    );
  } else {
    return (<CircularProgress color="secondary" />);
  }
}

const OfferInfo: FC<{ offer: Offer }> = ({ offer }) => {
  return (
    <Grid item xs={10} md={5} >
      <Typography variant="h5" align="left">Cena: {numberWithSpaces(parseFloat(offer.price || '0'))} Kč</Typography>
      <Typography variant="h6" align="left" style={{ marginTop: "1rem" }}>Vloženo: {offer.created.toDate().toLocaleDateString('cs')}</Typography>
      <Typography variant="subtitle2" align="left" style={{ marginTop: "3rem" }}>{offer.description}</Typography>
    </Grid>
  );
}

const OfferEdit: FC<{ offer: Offer, closeUpdate: (newOffer: Offer) => void, itemId: string }> = ({ offer, closeUpdate, itemId }) => {
  const { control, handleSubmit, errors: fieldErrors } = useForm<OfferFormData>();

  const onSubmit = async (data: OfferFormData) => {
    const newOffer = {
      ...offer,
      price: data.price,
      description: data.description
    }
    offersCollection.doc(itemId).update(newOffer).then(() => closeUpdate(newOffer));
  }

  return (
    <Grid item xs={10} md={5}>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
        <Grid container justify="center" spacing={2}>
          <Grid item xs={12}>
            <Controller
              name="price"
              as={<TextField label="Cena" variant="outlined" fullWidth helperText={fieldErrors.title ? fieldErrors.title.message : null} error={fieldErrors.title !== undefined} />}
              control={control}
              defaultValue={offer.price}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="description"
              as={
                <TextField label="Detaily" variant="outlined" fullWidth multiline rows={8} rowsMax={8} helperText={fieldErrors.description ? fieldErrors.description.message : null} error={fieldErrors.description !== undefined} />
              }
              control={control}
              defaultValue={offer.description}
              rules={{}}
            />
          </Grid>
          <Grid item xs={5}>
            <Button color="default" fullWidth onClick={() => closeUpdate(offer)} size="large" variant="contained" style={{ marginBottom: "3rem" }}>
              Zrušit
            </Button>
          </Grid>
          <Grid item xs={5}>
            <Button color="primary" fullWidth type="submit" size="large" variant="contained" style={{ marginBottom: "3rem" }}>
              Aktualizovat inzerát
            </Button>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
}

const BasicInfoRow: FC<{ title: string, content: string }> = ({ title, content }) => {

  const variant = "subtitle2";

  return (
    <>
      <Grid item xs={12} sm={4} md={3}>
        <Typography variant={variant} align="right">{title}</Typography>
      </Grid>
      <Grid item xs={12} sm={8} md={9}>
        <Typography variant={variant} align="left">{content}</Typography>
      </Grid>
    </>
  );
}

export default Detail;