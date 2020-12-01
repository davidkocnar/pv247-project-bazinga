import React from 'react';
import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyAUQTxAhZgBWLa7PX_Tj3oOvXoKTEU7-_8",
    authDomain: "bazinga-project.firebaseapp.com",
    databaseURL: "https://bazinga-project.firebaseio.com",
    projectId: "bazinga-project",
    storageBucket: "bazinga-project.appspot.com",
    messagingSenderId: "734746462679",
    appId: "1:734746462679:web:3d00ed5574dc5598396392"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// TODO: needs return type of document so function will return typed collection
export const getAllOffers = () => {
    return db.collection('offer').get();
};