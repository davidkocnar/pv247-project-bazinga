import firebase from "firebase";
import { DocumentReference, Timestamp, GeoPoint } from '@firebase/firestore-types';

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

type User = Pick<firebase.User, 'uid' | 'email'>;

export type Offer = {
    user_ref: User;
    title: string;
    description: string;
    created: Timestamp,
    category_ref: DocumentReference,
    type: number,
    location: GeoPoint
};

export type Category = {
    name: string;
};

export const offersCollection = db.collection(
  'offer',
) as firebase.firestore.CollectionReference<Offer>;
