import React, {FC, useEffect, useState} from "react";
import {useLoggedInUser} from "../firebase/auth";
import {Offer, offersCollection, UserData, usersCollection} from "../firebase/firestore";
import {Box, Button, CircularProgress, Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import OfferCard from "../components/OfferCard";
import {Link} from "react-router-dom";
import {useStyles} from "../App";

type Offers = Record<string, Offer>;

const Profile: FC = () => {

  const user = useLoggedInUser();
  const [userData, setUserData] = useState<UserData>();
  const [offers, setOffers] = useState<Offers>({});

  useEffect(() => {
    (async () => {
      if (user) {
        try {
          const snapshot = await usersCollection.doc(user?.uid).get();
          setUserData(snapshot.data());
        } catch (error) {
          console.error(error);
        }

        offersCollection
          .where("userRef", "==", { uid: user.uid, email: user.email })
          .get()
          .then((snapshot) => {
            setOffers(snapshot.docs.reduce((previousValue, currentValue) => ({
              ...previousValue,
              [currentValue.id]: currentValue.data()
            }), {}))
          })
      }
    })()
  }, [user])

  const classes = useStyles();

  return (
    <Grid container spacing={2} justify="center">
      <Grid item xs={12}>
        {userData === undefined && offers === undefined ? (
          <Box mt="5rem"><CircularProgress/></Box>
        ) : (
          <Box mt="3rem">
            <Typography variant={"h3"}>{userData?.name} {userData?.surname ? userData?.surname : ""}</Typography>
            <Typography variant={"body1"}>{userData?.location}</Typography>
            <Typography variant={"body1"} className={classes.marginTop}>
              E-mail: {user?.email}
            </Typography>
            <Typography variant={"body1"}>
              Telefon: {userData?.phone ? userData.phone : "nezadán"}
            </Typography>
            <Link to="/profileedit" className={classes.link}>
              <Button
                variant="contained"
                size="large"
                color="primary"
                style={{ marginTop: "1rem" }}>
                Upravit profil
              </Button>
            </Link>

            <Box mt={8}>
              <Typography variant={"h5"} style={{ marginBottom: "1rem" }}>
                Vaše nabídky
              </Typography>
              {Object.keys(offers).length > 0 ?
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
                :
                <Typography variant={"body2"} color={"textSecondary"}>
                  Nemáte zatím žádné vytvořené nabídky
                </Typography>
              }
            </Box>
          </Box>
        )}
      </Grid>
    </Grid>
  );
}

export default Profile;