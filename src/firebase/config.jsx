import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBe_RbQmxxPeMdj2l0OsJqraLtqN5k4H1o",
    authDomain: "fir-73458.firebaseapp.com",
    projectId: "fir-73458",
    storageBucket: "fir-73458.appspot.com",
    messagingSenderId: "1023345160426",
    appId: "1:1023345160426:web:133fb8b5be4ce4fc426793",
    measurementId: "G-NR12S4GPEW"
  }; 

export default firebase.initializeApp(firebaseConfig)