import firebase from "firebase";
import { DocumentReference, Timestamp, GeoPoint } from '@firebase/firestore-types';
import {firebaseConfig} from "./config";

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
