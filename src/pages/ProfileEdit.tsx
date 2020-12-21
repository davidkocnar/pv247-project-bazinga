import React, {FC, useEffect, useState} from 'react';
import {useLoggedInUser} from "../firebase/auth";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent, CircularProgress,
  Grid,
  TextField,
  Typography
} from "@material-ui/core";
import Autocomplete, {AutocompleteRenderInputParams} from "@material-ui/lab/Autocomplete";
import {useForm, Controller} from "react-hook-form";
import cities from '../data/cz-cities-csu.json';
import {UserData, usersCollection} from "../firebase/firestore";
import {Redirect} from "react-router-dom";

type ProfileData = {
  name: string,
  surname: string,
  location: string,
  phone: string;
}

const ProfileEdit: FC = () => {

  const user = useLoggedInUser();
  const [error, setError] = useState<string>();
  const [userData, setUserData] = useState<UserData>();
  const [redirectToProfile, setRedirectToProfile] = useState<boolean>(false)
  const { control, handleSubmit, errors: fieldErrors } = useForm<ProfileData>({});

  const locations: string[] = cities.cz.map((item) => {
    return item.name
  })


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

  const onSubmit = (data: ProfileData) => {
    console.log("phone:", data.phone)

    usersCollection.doc(user?.uid).set({
      phone: data.phone,
      location: data.location,
      name: data.name,
      surname: data.surname
    }).then(() => {
      setRedirectToProfile(true);
    }).catch((error) => {
      setError(error.message);
    })
  };

  if (redirectToProfile) {
    return <Redirect to="/profile"/>
  }

  return (
    <Box m="3rem">
      <Grid container direction={"row"} spacing={8} alignItems={"center"} justify={"center"}>
        <Grid item md={7} sm={10} xs={12}>
          {userData === undefined ? (
            <Box mt="5rem"><CircularProgress/></Box>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="h1">
                    Úprava údajů
                  </Typography>

                  <Controller
                    name="name"
                    defaultValue={userData?.name}
                    as={
                      <TextField
                        label="Jméno"
                        type="text"
                        name="name"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        helperText={fieldErrors.name ? fieldErrors.name.message : null}
                        error={fieldErrors.name !== undefined}
                      />
                    }
                    control={control}
                    rules={{
                      required: 'Vyplňte prosím své jméno'
                    }}
                  />

                  <Controller
                    name="surname"
                    defaultValue={userData?.surname}
                    as={
                      <TextField
                        label="Přijmení (nepovinné)"
                        type="text"
                        name="surname"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        helperText={fieldErrors.surname ? fieldErrors.surname.message : null}
                        error={fieldErrors.surname !== undefined}
                      />
                    }
                    control={control}
                    rules={{}}
                  />

                  <Controller
                    name="location"
                    defaultValue={userData?.location}
                    render={({ onChange }) => (
                      <Autocomplete
                        id="location"
                        options={locations}
                        fullWidth
                        defaultValue={userData?.location}
                        getOptionLabel={(item) => item}
                        onChange={(e, data) => onChange(data)}
                        renderInput={(params: AutocompleteRenderInputParams) =>
                          <TextField
                            {...params}
                            label="Poloha"
                            type="text"
                            name="location"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            helperText={fieldErrors.location ? fieldErrors.location.message : null}
                            error={fieldErrors.location !== undefined}
                          />
                        }
                      />
                    )}
                    onChange={([, data]: string[]) => data}
                    control={control}
                    rules={{
                      required: 'Vyberte město'
                    }}
                  />

                  <Controller
                    name="phone"
                    defaultValue={userData?.phone}
                    as={
                      <TextField
                        label="Telefon (nepovinné)"
                        type="tel"
                        name="phone"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        helperText={fieldErrors.phone ? fieldErrors.phone.message : null}
                        error={fieldErrors.phone !== undefined}
                      />
                    }
                    control={control}
                    rules={{}}
                  />

                  {error && (
                    <Typography variant="subtitle2" align="left" color="error" paragraph>
                      <b>{error}</b>
                    </Typography>
                  )}
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    type="submit">
                    Uložit
                  </Button>
                </CardActions>
              </Card>
            </form>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfileEdit;
