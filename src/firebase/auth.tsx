import {useEffect, useState} from "react";
import firebase from "firebase";
import {initFirebaseApp} from "./config";
import {saveUserData} from "./firestore";

const auth = initFirebaseApp().auth()

// Hook providing logged in user information
export const useLoggedInUser = () => {
  // Hold user info in state
  const [user, setUser] = useState<firebase.User | null>();

  // Setup onAuthStateChanged once when component is mounted
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(u => setUser(u));

    // Call unsubscribe in the cleanup of the hook
    return () => unsubscribe();
  }, []);

  return user;
};

// Sign up handler
export const signUp = (email: string, password: string, name: string, surname: string) =>
  auth.createUserWithEmailAndPassword(email, password)
    .then((credentials) => {
      if (credentials.user?.uid) {
        return saveUserData(name, surname, credentials.user?.uid)
      }
    })

// Sign in handler
export const signIn = (email: string, password: string) =>
  auth.signInWithEmailAndPassword(email, password);

// Sign out handler
export const signOut = () => auth.signOut();