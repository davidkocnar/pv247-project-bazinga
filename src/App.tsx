import React from 'react';
import logo from './logo.svg';
import * as DB from './firebase/Firestore'
import './App.css';

const test = () => {
    DB.getAllOffers()
        .then(list => {console.log("Offers: " + list)})
}

test()

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
