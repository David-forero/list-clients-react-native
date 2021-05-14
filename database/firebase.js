import firebase from 'firebase';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyBVC8KchRUm_AmFhTGD6HNmywQDGSq8IV4",
    authDomain: "clients-react-native.firebaseapp.com",
    projectId: "clients-react-native",
    storageBucket: "clients-react-native.appspot.com",
    messagingSenderId: "440020880467",
    appId: "1:440020880467:web:e7d5bb4d2983eeed8a0aa6",
    measurementId: "G-BR5H9HXYWG"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();

export default {
    firebase,
    db
}  