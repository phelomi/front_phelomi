import firebase from 'firebase';
import 'firebase/database';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyC9btKLwbRf7pzcLTctFecnJ_88_MVh6og',
  authDomain: 'phelomi-bdd9a.firebaseapp.com',
  databaseURL: 'https://phelomi-bdd9a.firebaseio.com',
  projectId: 'phelomi-bdd9a',
  storageBucket: 'gs://phelomi-bdd9a.appspot.com',
  messagingSenderId: '352559738590',
  appId: '1:352559738590:web:70c24c3364eba68dd69c4f',
};

firebase.initializeApp(firebaseConfig);

export const fDatabase = firebase.database();
export const fStorage = firebase.storage();
