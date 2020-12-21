import React, {FC, useState} from 'react';
import {resetPassword, signIn, useLoggedInUser} from "../firebase/auth";
import {Link, Redirect} from 'react-router-dom';
import {Button, Card, CardContent, Grid, TextField, Typography, Link as MuiLink} from "@material-ui/core";
import {useStyles} from "../App";

const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string>();
  const [msg, setMsg] = useState<string>();
  const isLoggedIn = useLoggedInUser();
  const classes = useStyles();

  if (isLoggedIn) {
    return <Redirect to="/"/>;
  }

  const onForgotPassword = () => {
    resetPassword(email)
      .then(() => {
        setMsg("E-mail pro resetování hesla vám byl zaslán.");
        setError(undefined);
      }).catch(() => {
        setError("Zadejte e-mail existujícího účtu.");
        setMsg(undefined);
    });
  }

  return (
    <Grid container direction={"row"} spacing={8} alignItems={"center"} justify={"center"} className={classes.margin}>
      <Grid item md={5} sm={10} xs={12}>
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
            {msg && (
              <Typography variant="subtitle2" align="left" color="secondary" paragraph>
                <b>{msg}</b>
              </Typography>
            )}
            <Typography variant="subtitle2" align="left" paragraph>
              <MuiLink href="#" onClick={onForgotPassword} color={"secondary"}>
                Zapomenuté heslo
              </MuiLink>
            </Typography>

            <Button
              variant="contained"
              size="large"
              color="primary"
              onClick={() =>
                signIn(email, password).catch(err => setError(err.message))
              }>
              Přihlásit
            </Button>
          </CardContent>
        </Card>
      </Grid>
      <Grid item md={5} sm={10} xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h5">Nemáte ještě účet?</Typography>
            <Typography variant="body1">Přidejte se k ostatním a sdílejte věci s příběhem.</Typography>
            <Link to="/register" className={classes.link}>
              <Button
                variant="contained"
                size="large"
                color="primary"
                style={{ marginTop: "1rem" }}>
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
