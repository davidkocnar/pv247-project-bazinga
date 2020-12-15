import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    Switch,
} from 'react-router-dom';
import './App.css';
import {offersCollection} from "./firebase/firestore";
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import {
    CircularProgress,
    createMuiTheme,
    MuiThemeProvider,
} from '@material-ui/core';
import {signOut, useLoggedInUser} from "./firebase/auth";

const test = () => {
    offersCollection.get()
      .then(snapshot => {
          console.log("Offers: ")
          snapshot.docs.forEach(doc => {
              console.log(doc.data())
          })
      })
}

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

const useStyles = makeStyles(theme => ({
    toolbar: { display: 'flex', justifyContent: 'space-between' },
    menuButton: { marginRight: theme.spacing(2) },
    link: { textDecoration: 'none' },
}));

function App() {
    // Styles
    const classes = useStyles();

    // Login state
    const user = useLoggedInUser();

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

              {user === null && <Redirect to="/login"/>}

              <main className="App">
                  <Container maxWidth="sm">
                      {/* Wait for user session */}
                      {user === undefined ? (
                        <CircularProgress/>
                      ) : (
                        <Switch>
                            {/*<Route path="/" exact component={Home}/>
                            <Route path="/login" exact component={Login}/>
                            <Route path="/about" exact component={About}/>
                            <Route path="/users" exact component={Users}/>
                            <Route path="/review" exact component={ReviewForm}/>
                            <Route component={Notfound}/>*/}
                        </Switch>
                      )}
                  </Container>
              </main>
          </Router>
      </MuiThemeProvider>
    );
}

export default App;
