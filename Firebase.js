import firebase from 'firebase';
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBUjTdW-evTna_XA6_0tQYbN2VgQnkJsyQ",
    authDomain: "babytrack-e2693.firebaseapp.com",
    projectId: "babytrack-e2693",
    storageBucket: "babytrack-e2693.appspot.com",
    messagingSenderId: "346461261110",
    appId: "1:346461261110:web:c81945479022a895d2b797",
    measurementId: "G-XWPCEKNBD7"
};
  
const firebaseApp = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app()
  
const DB = firebaseApp.firestore();