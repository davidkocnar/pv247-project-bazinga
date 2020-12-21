import { Button, CircularProgress, Grid, GridList, GridListTile, makeStyles, Typography } from '@material-ui/core';
import React, { FC, useMemo, useState } from 'react';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { Offer, offersCollection, UserData, usersCollection } from '../firebase/firestore';
import Logo from '../images/logo.png';
import { useLoggedInUser } from '../firebase/auth';
import BasicInfoRow from '../components/BasicInfoRow';
import OfferEdit from '../components/OfferEdit';
import OfferInfo from '../components/OfferInfo';

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
              {loggedInUser &&
                <>
                  <BasicInfoRow title={"e-mail:"} content={offer?.userRef.email ? offer.userRef.email : 'Nespecifikován'} />
                  <BasicInfoRow title={"tel:"} content={user?.phone ? user.phone : 'Nespecifikován'} />
                </>}
              <BasicInfoRow title={"místo:"} content={user ? user.location : 'Nespecifikováno'} />
            </Grid>
            <Grid container alignItems="center" justify="center" className={classes.margin}>
              {offer?.userRef.email && loggedInUser &&
                <Grid item xs={4}>
                  <Button href={`mailto:${offer?.userRef.email}`}
                    color="secondary" variant="contained">Kontaktovat</Button>
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

export default Detail;