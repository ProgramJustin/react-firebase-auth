import * as Firebase from 'firebase';

const firebase = Firebase;

// add config here const config = { api key };


if(!firebase.apps.length) {
  firebase.initializeApp(config);
}

// create instance of firebase database
const db = firebase.database();

// create instance of authentication
const auth = firebase.auth();

export {
  db,
  auth,
};
