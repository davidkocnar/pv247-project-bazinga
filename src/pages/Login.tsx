import React, {FC, useState} from 'react';
import {signIn, useLoggedInUser} from "../firebase/auth";
import {Link, Redirect} from 'react-router-dom';
import {Box, Button, Card, CardActions, CardContent, Grid, TextField, Typography} from "@material-ui/core";

const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState<string>();

  const isLoggedIn = useLoggedInUser();

  if (isLoggedIn) {
    return <Redirect to="/"/>;
  }

  return (
    <Grid container direction={"column"} spacing={4} alignItems={"center"} justify={"center"}>
      <Grid item md={5} sm={10}>
        <Box mt="3rem">
          <Card>
            <CardContent>
              <Typography variant="h5" component="h1">
                Přihlášení
              </Typography>
              <TextField
                label="E-mail"
                type="email"
                name="email"
                fullWidth
                autoComplete="email"
                margin="normal"
                variant="outlined"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <TextField
                label="Heslo"
                type="password"
                name="password"
                fullWidth
                margin="normal"
                variant="outlined"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              {error && (
                <Typography variant="subtitle2" align="left" color="error" paragraph>
                  <b>{error}</b>
                </Typography>
              )}
              <Typography variant="subtitle2" align="left" paragraph>
                <Link to="/">
                  <b>Zapomenuté heslo</b>
                </Link>
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                size="large"
                color="primary"
                // Handling promise with chained handlers
                onClick={() =>
                  signIn(email, password).catch(err => setError(err.message))
                }
              >
                Přihlásit
              </Button>
            </CardActions>
          </Card>
        </Box>
      </Grid>
      <Grid item md={5} sm={10}>
        <Card>
          <CardContent>
            <Typography variant="h6">Nemáte ještě účet?</Typography>
            <Typography variant="body1">Přidejte se k ostatním a sdílejte věci s příběhem.</Typography>
            <Link to="/register" style={{textDecoration: "none"}}>
              <Button
                variant="contained"
                size="large"
                color="primary"
                style={{marginTop: "1rem"}}>
                Vytvořit účet
              </Button>
            </Link>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Login;
