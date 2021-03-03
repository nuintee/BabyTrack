import firebase, { firestore } from 'firebase';
import "firebase/firestore";
import "firebase/auth"

// Optionally import the services that you want to use
//import "firebase/auth";
//import "firebase/database";

//import "firebase/functions";
//import "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBUjTdW-evTna_XA6_0tQYbN2VgQnkJsyQ",
    authDomain: "babytrack-e2693.firebaseapp.com",
    projectId: "babytrack-e2693",
    storageBucket: "babytrack-e2693.appspot.com",
    messagingSenderId: "346461261110",
    appId: "1:346461261110:web:c81945479022a895d2b797",
    measurementId: "G-XWPCEKNBD7"
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase
