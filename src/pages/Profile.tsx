import React, {FC, useEffect, useState} from "react";
import {useLoggedInUser} from "../firebase/auth";
import {UserData, usersCollection} from "../firebase/firestore";
import {Box, CircularProgress, Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

const Profile: FC = () => {

  const user = useLoggedInUser();
  const [userData, setUserData] = useState<UserData>();

  useEffect(() => {
    (async () => {
      if (user) {
        try {
          const snapshot = await usersCollection.doc(user?.uid).get();
          setUserData(snapshot.data());
        } catch (error) {
          console.error(error);
        }
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
            <Typography variant={"h3"}>{userData?.name} {userData?.surname? userData?.surname : ""}</Typography>
            <Typography variant={"body1"} style={{marginTop: "0.5rem"}}>{userData?.location}</Typography>
            <Typography variant={"body1"} style={{marginTop: "2rem"}}>
              E-mail: {user?.email}
            </Typography>
            <Typography variant={"body1"} style={{marginTop: "0.5rem"}}>
              Telefon: {userData?.phone? userData.phone : "nezadán"}
            </Typography>
          </Box>
        )}
      </Grid>
    </Grid>
  );
}

export default Profile;