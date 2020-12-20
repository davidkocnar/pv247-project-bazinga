import React, {FC, useEffect, useState} from "react";
import {useLoggedInUser} from "../firebase/auth";
import {Offer, offersCollection, UserData, usersCollection} from "../firebase/firestore";
import {Box, CircularProgress, Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import OfferCard from "../components/OfferCard";

const Profile: FC = () => {

  const user = useLoggedInUser();
  const [userData, setUserData] = useState<UserData>();
  const [offers, setOffers] = useState<Offer[]>([]);

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
            console.log("OFFERS", snapshot.docs.map(doc => doc.data()));
            setOffers(snapshot.docs.map(doc => doc.data()));
          })
      }
    })()
  }, [user])

  return (
    <Grid container spacing={2} justify="flex-start">
      <Grid item xs={12} lg={10}>
        {userData === undefined ? (
          <Box mt="5rem"><CircularProgress/></Box>
        ) : (
          <Box mt="3rem">
            <Typography variant={"h3"}>{userData?.name} {userData?.surname ? userData?.surname : ""}</Typography>
            <Typography variant={"body1"} style={{ marginTop: "0.5rem" }}>{userData?.location}</Typography>
            <Typography variant={"body1"} style={{ marginTop: "2rem" }}>
              E-mail: {user?.email}
            </Typography>
            <Typography variant={"body1"} style={{ marginTop: "0.5rem" }}>
              Telefon: {userData?.phone ? userData.phone : "nezadán"}
            </Typography>

            <Box mt={6}>
              <Typography variant={"h5"} style={{ marginBottom: "1rem" }}>
                Vaše nabídky
              </Typography>

              {offers.length > 0 ?
                <Grid item container xs={12} lg={12} spacing={2}>
                  {offers.map((offer) => (
                    <OfferCard
                      price={offer.price}
                      imgPath={offer.imgPath}
                      title={offer.title}
                    />
                  ))}
                </Grid>
                :
                <Typography variant={"body2"} style={{ color: "#848484" }}>
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