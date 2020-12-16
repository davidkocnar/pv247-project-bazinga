import React from 'react';
import './App.css';
import {
  AppBar,
  Button,
  CircularProgress,
  Container,
  createMuiTheme,
  makeStyles,
  MuiThemeProvider,
  Toolbar
} from '@material-ui/core';
import {Link, Route, Switch, BrowserRouter as Router} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import {signOut, useLoggedInUser} from './firebase/auth';
import Logo from './images/logo.png';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import PersonIcon from '@material-ui/icons/Person';
import Register from "./pages/Register";

const useStyles = makeStyles(theme => ({
  toolbar: { display: 'flex', justifyContent: 'space-between' },
  menuButton: { marginRight: theme.spacing(2) },
  link: { textDecoration: 'none' },
  logo: { verticalAlign: 'middle', marginRight: theme.spacing(2) }
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
  const user = useLoggedInUser();

  return (
    <MuiThemeProvider theme={ourTheme}>
      <Router>
        <AppBar color="transparent" position="static" variant="outlined">
          {/* Navigation rendered on all pages */}
          <Toolbar className={classes.toolbar}>
            <div>
              <Link className={classes.link} to="/">
                <img src={Logo} alt="logo" width={50} className={classes.logo}/>
              </Link>
              <Link className={classes.link} to="/">
                <Button className={classes.menuButton}>Přehled nabídek</Button>
              </Link>
              <Link className={classes.link} to="/about">
                <Button className={classes.menuButton}>O službě</Button>
              </Link>
            </div>
            <div>
              {user === null && (
                <Link className={classes.link} to="/login">
                  <Button className={classes.menuButton} startIcon={<PersonIcon/>}>Přihlásit</Button>
                </Link>
              )}
              {user && (
                <>
                  <Link className={classes.link} to="/new">
                    <Button variant="contained" color="secondary" startIcon={<AddCircleIcon/>}
                            className={classes.menuButton}>Vložit inzerát</Button>
                  </Link>
                  <Button className={classes.menuButton} onClick={signOut}>Odhlásit</Button>
                </>
              )}
            </div>
          </Toolbar>
        </AppBar>

        <main className="App">
          <Container maxWidth="lg">
            {/* Wait for user session */}
            {user === undefined ? (
              <CircularProgress/>
            ) : (
              <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/login" exact component={Login}/>
                <Route path="/register" exact component={Register}/>
              </Switch>
            )}
          </Container>
        </main>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
