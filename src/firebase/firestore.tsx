import firebase from "firebase";
import {DocumentReference, Timestamp} from '@firebase/firestore-types';
import {initFirebaseApp} from "./config";

const db = initFirebaseApp().firestore();

type UserRef = Pick<firebase.User, 'uid' | 'email'>;

export type UserData = {
  name: string,
  surname: string | undefined,
  location: string,
  phone: string | undefined
}

export type Offer = {
  userRef: UserRef;
  imgPaths: string[];
  title: string;
  description: string;
  price: string,
  created: Timestamp,
  categoryRef?: DocumentReference,
};

export type Category = {
  name: string;
};

export const timestampNow = firebase.firestore.Timestamp.now;

export const offersCollection = db.collection(
  'offer',
) as firebase.firestore.CollectionReference<Offer>;

export const usersCollection = db.collection(
  'user',
) as firebase.firestore.CollectionReference<UserData>;

export const categoriesCollection = db.collection(
  'category',
) as firebase.firestore.CollectionReference<Category>;

export const fileStorage = firebase.storage().ref()

export const saveUserData = (name: string, surname: string | undefined, location: string, phone: string | undefined, uid: string) =>
  usersCollection.doc(uid).set({
    name,
    surname,
    location,
    phone
  })
