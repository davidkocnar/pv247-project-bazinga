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
import New from "./pages/New";
import Detail from './pages/Detail';
import Profile from './pages/Profile';
import About from "./pages/About";
import ProfileEdit from "./pages/ProfileEdit";
import CssBaseline from "@material-ui/core/CssBaseline";

export const useStyles = makeStyles(theme => ({
  toolbar: { display: 'flex', justifyContent: 'space-between', backgroundColor: "#fff" },
  margin: { marginBottom: theme.spacing(2), marginTop: theme.spacing(2) },
  marginTop: { marginTop: theme.spacing(4) },
  menuButton: { marginRight: theme.spacing(2), marginTop: "0" },
  link: { textDecoration: 'none' },
  divider: { margin: "1.5rem 1rem 1rem 1rem" },
  logo: { verticalAlign: 'middle', marginRight: theme.spacing(2) },
  disable: { color: "#888888" },
  input: { textAlign: "left" },
  toolbarSub: {
    display: 'flex',
    flex: '1 0 360',
    alignContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap'
  }
}));

// MUI theme override
const ourTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#5b921c',
    },
    secondary: {
      main: '#2b2d40',
    },
    background: {
      default: '#fafafa',
      paper: '#fff'
    },
  },
  typography: {
    h3: {
      marginBottom: "1rem"
    },
    h4: {
      marginBottom: "0.8rem"
    },
    h5: {
      marginBottom: "0.5rem"
    },
    subtitle1: {
      marginBottom: "1rem"
    },
    body1: {
      marginTop: "0.2rem",
      marginBottom: "0.2rem"
    },
    button: {
      marginTop: "1rem"
    }
  }
});

function App() {

  // Styles
  const classes = useStyles();

  // Login state
  const user = useLoggedInUser();

  return (
    <MuiThemeProvider theme={ourTheme}>
      <CssBaseline>
        <Router>
          <AppBar color="transparent" position="static" variant="outlined">
            {/* Navigation rendered on all pages */}
            <Toolbar className={classes.toolbar}>
              <div className={classes.toolbarSub}>
                <Link className={classes.link} to="/">
                  <img src={Logo} alt="logo" width={80} className={classes.logo}/>
                </Link>
                <Link className={classes.link} to="/">
                  <Button className={classes.menuButton}>Přehled nabídek</Button>
                </Link>
                <Link className={classes.link} to="/about">
                  <Button className={classes.menuButton}>O službě</Button>
                </Link>
              </div>
              <div className={classes.toolbarSub}>
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
                    <Link className={classes.link} to="/profile">
                      <Button className={classes.menuButton}>Můj profil</Button>
                    </Link>
                    <Link className={classes.link} to="/">
                      <Button className={classes.menuButton} onClick={signOut}>Odhlásit</Button>
                    </Link>
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
                  <Route path="/about" exact component={About}/>
                  <Route path="/profileedit" exact component={ProfileEdit}/>
                  <Route path="/register" exact component={Register}/>
                  <Route path="/new" exact component={New}/>
                  <Route path="/detail/:itemId" component={Detail}/>
                  <Route path="/profile" component={Profile}/>
                </Switch>
              )}
            </Container>
          </main>
        </Router>
      </CssBaseline>
    </MuiThemeProvider>
  );
}

export default App;
