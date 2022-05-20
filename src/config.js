import firebase from "firebase/app";
import "firebase/storage";

require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyCpChza1DZ2zSTGt3y05Nf69FW7L1z700s",
  authDomain: "level-determination-test.firebaseapp.com",
  databaseURL: "https://level-determination-test.firebaseio.com",
  projectId: "level-determination-test",
  storageBucket: "level-determination-test.appspot.com",
  messagingSenderId: "757681122349",
  appId: "1:757681122349:web:3332aa828af81dbedc1ca4",
  measurementId: "G-EJBZTDERR8",
};

firebase.initializeApp(firebaseConfig);
