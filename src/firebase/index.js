import * as auth from './auth';
import * as db from './db';
import * as Firebase from './firebase';
const firebase = Firebase;

export {
  auth,
  db,
  firebase
};
// That way, consumers (React components in our case) should be only allowed to access the index.js file as interface to the whole Firebase module (src/firebase/) and should not access the auth or firebase files directly.
