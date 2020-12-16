import React, {FC, useState} from 'react';
import {signUp, useLoggedInUser} from "../firebase/auth";
import {Redirect} from 'react-router-dom';
import {Box, Button, Card, CardActions, CardContent, TextField, Typography} from "@material-ui/core";

const Register: FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState<string>();

  const isLoggedIn = useLoggedInUser();

  if (isLoggedIn) {
    return <Redirect to="/"/>;
  }

  return (
    <Box mt="3rem">
      <Card>
        <CardContent>
          <Typography variant="h5" component="h1">
            Registrace
          </Typography>
          <Typography variant="subtitle1">Vytvořte si nový účet a užívejte si Bazingu s námi.</Typography>
          <TextField
            label="Jméno"
            type="name"
            name="name"
            fullWidth
            margin="normal"
            variant="outlined"
            value={name}
            onChange={e => setName(e.target.value)}
          />
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
        </CardContent>
        <CardActions>
          <Button
            variant="text"
            size="large"
            color="primary"
            // Handling promise with async/await
            onClick={async () => {
              try {
                await signUp(email, password);
              } catch (err) {
                setError(err.message);
              }
            }}
          >
            Vytvořit účet
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default Register;
