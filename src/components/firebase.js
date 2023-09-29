import firebase from "firebase";
import 'firebase/firestore';
import 'firebase/auth';



const firebaseConfig = {
    apiKey: "AIzaSyADKzRfOKdzICkwrF3PMJVpKOdqGAMP-MM",
    authDomain: "whatsappchat-55a4a.firebaseapp.com",
    projectId: "whatsappchat-55a4a",
    storageBucket: "whatsappchat-55a4a.appspot.com",
    messagingSenderId: "68328693133",
    appId: "1:68328693133:web:b5b89ba05eaec1463071c4",
    measurementId: "G-GCB9SPYRKZ"
  };

  const firebaseApp=firebase.initializeApp(firebaseConfig);

  const db =firebaseApp.firestore();

  const auth =firebase.auth();

  const provider =new firebase.auth.GoogleAuthProvider();

export {auth,provider};

export default db;