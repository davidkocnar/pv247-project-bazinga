import firebase from "firebase";
import { DocumentReference, Timestamp, GeoPoint } from '@firebase/firestore-types';
import {initFirebaseApp} from "./config";

const db = initFirebaseApp().firestore();

type UserRef = Pick<firebase.User, 'uid' | 'email'>;

export type User = {
    name: string,
    surname: string
}

export type Offer = {
    user_ref: UserRef;
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

export const usersCollection = db.collection(
  'user',
) as firebase.firestore.CollectionReference<User>;

export const saveUserData = (name: string, surname: string, uid: string) =>
  usersCollection.doc(uid).set({
      name,
      surname
  })
