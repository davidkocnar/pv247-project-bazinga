import React from 'react';
import './App.css';
import { AppBar, Button, CircularProgress, Container, createMuiTheme, makeStyles, MuiThemeProvider, Toolbar } from '@material-ui/core';
import { Link, Redirect, Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import { signOut, useLoggedInUser } from './firebase/auth';

const useStyles = makeStyles(theme => ({
  toolbar: { display: 'flex', justifyContent: 'space-between' },
  menuButton: { marginRight: theme.spacing(2) },
  link: { textDecoration: 'none' },
}));

// MUI theme override
const ourTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#4ca235',
    },
    secondary: {
      main: '#FFF861',
    },
  },
});

function App() {

  // Styles
  const classes = useStyles();

  // Login state
  const user = null;

  return (
    <MuiThemeProvider theme={ourTheme}>
      <Router>
        <AppBar color="primary" position="static" variant="outlined">
          {/* Navigation rendered on all pages */}
          <Toolbar className={classes.toolbar}>
            <div>
              <Link className={classes.link} to="/">
                <Button className={classes.menuButton}>Přehled nabídek</Button>
              </Link>
              <Link className={classes.link} to="/about">
                <Button className={classes.menuButton}>O službě</Button>
              </Link>
              {user === null && (
                <Link className={classes.link} to="/login">
                  <Button className={classes.menuButton}>Přihlásit</Button>
                </Link>
              )}
              {user && (
                <>
                  <Link className={classes.link} to="/new">
                    <Button className={classes.menuButton}>Vytvořit nabídku</Button>
                  </Link>
                  <Button className={classes.menuButton} onClick={signOut}>
                    Odhlásit
                                </Button>
                </>
              )}
            </div>
          </Toolbar>
        </AppBar>

        {user === null && <Redirect to="/login" />}

        <main className="App">
          <Container maxWidth="sm">
            {/* Wait for user session */}
            {user === undefined ? (
              <CircularProgress />
            ) : (
                <Switch>
                  <Route path="/" exact component={Home} />
                  <Route path="/login" exact component={Login} />
                  {/* <Route path="/about" exact component={About}/>
                            <Route path="/users" exact component={Users}/>
                            <Route path="/review" exact component={ReviewForm}/>
                            <Route component={Notfound}/> */}
                </Switch>
              )}
          </Container>
        </main>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
