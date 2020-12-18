import firebase from "firebase";

export const firebaseConfig = {
  apiKey: "AIzaSyAUQTxAhZgBWLa7PX_Tj3oOvXoKTEU7-_8",
  authDomain: "bazinga-project.firebaseapp.com",
  databaseURL: "https://bazinga-project.firebaseio.com",
  projectId: "bazinga-project",
  storageBucket: "bazinga-project.appspot.com",
  messagingSenderId: "734746462679",
  appId: "1:734746462679:web:3d00ed5574dc5598396392"
};

export const initFirebaseApp = () => {
  if (!firebase.apps.length) {
    return firebase.initializeApp(firebaseConfig);
  } else {
    return firebase.app();
  }
}