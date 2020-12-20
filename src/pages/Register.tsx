import React, {FC, useState} from 'react';
import {signUp, useLoggedInUser} from "../firebase/auth";
import {Redirect} from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  TextField,
  Typography
} from "@material-ui/core";
import {useForm, Controller} from "react-hook-form";

export type RegisterData = {
  name: string,
  surname: string | undefined,
  location: string,
  phone: string | undefined,
  email: string,
  password: string
}

const Register: FC = () => {

  const { control, handleSubmit, errors: fieldErrors } = useForm<RegisterData>();

  const onSubmit = (data: RegisterData) => {
    console.log(data);
    signUp(data.email, data.password, data.name, data.surname, data.location, data.phone)
      .catch((error) => {
        setError(error.message);
      })
  };

  const [error, setError] = useState<string>();

  const isLoggedIn = useLoggedInUser();

  if (isLoggedIn) {
    return <Redirect to="/"/>;
  }

  return (
    <Box m="3rem">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="h1">
              Registrace
            </Typography>
            <Typography variant="subtitle1" style={{marginBottom: "1rem"}}>
              Vytvořte si nový účet a užívejte si Bazingu s námi.
            </Typography>

            <Controller
              name="name"
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
              defaultValue=""
              rules={{
                required: 'Vyplňte prosím své jméno'
              }}
            />

            <Controller
              name="surname"
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
              defaultValue=""
              rules={{}}
            />

            <Controller
              name="location"
              as={
                <TextField
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
              control={control}
              defaultValue=""
              rules={{
                required: 'Vyberte město'
              }}
            />

            <Controller
              name="phone"
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
              defaultValue=""
              rules={{}}
            />

            <Divider style={{margin: "1.5rem 1rem 1rem 1rem"}}/>

            <Controller
              name="email"
              as={
                <TextField
                  label="E-mail"
                  type="email"
                  name="email"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  helperText={fieldErrors.email ? fieldErrors.email.message : null}
                  error={fieldErrors.email !== undefined}
                />
              }
              control={control}
              defaultValue=""
              rules={{
                required: 'Vyplňte svůj e-mail',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: 'Špatný formát e-mailové adresy'
                }
              }}
            />

            <Controller
              name="password"
              as={
                <TextField
                  label="Heslo"
                  type="password"
                  name="password"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  helperText={fieldErrors.password ? fieldErrors.password.message : null}
                  error={fieldErrors.password !== undefined}
                />
              }
              control={control}
              defaultValue=""
              rules={{
                required: 'Zadejte heslo'
              }}
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
              Vytvořit účet
            </Button>
          </CardActions>
        </Card>
      </form>
    </Box>
  );
};

export default Register;
