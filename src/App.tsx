import React from 'react';
import './App.css';
import { AppBar, Button, CircularProgress, Container, createMuiTheme, makeStyles, MuiThemeProvider, Toolbar } from '@material-ui/core';
import { Link, Redirect, Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import { signOut, useLoggedInUser } from './firebase/auth';
import Logo from './images/logo.png';

const useStyles = makeStyles(theme => ({
  toolbar: { display: 'flex', justifyContent: 'space-between' },
  menuButton: { marginRight: theme.spacing(2) },
  link: { textDecoration: 'none' },
  logo: {verticalAlign: 'middle'}
}));

// MUI theme override
const ourTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#A7BF96',
    },
    secondary: {
      main: '#2B2D40',
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
        <AppBar color="transparent" position="static" variant="outlined">
          {/* Navigation rendered on all pages */}
          <Toolbar className={classes.toolbar}>
            <div>
              <img src={Logo} alt="logo" width={50} className={classes.logo}/>
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
                  <Button className={classes.menuButton} onClick={signOut}>Odhlásit</Button>
                </>
              )}
            </div>
          </Toolbar>
        </AppBar>

        {user === null && <Redirect to="/login" />}

        <main className="App">
          <Container maxWidth="lg">
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
