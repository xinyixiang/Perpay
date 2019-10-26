import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDswziTmCPG2xN1DNvoxVFHkw9p86pZKoI",
    authDomain: "perpay-cbe98.firebaseapp.com",
    databaseURL: "https://perpay-cbe98.firebaseio.com",
    projectId: "perpay-cbe98",
    storageBucket: "perpay-cbe98.appspot.com",
    messagingSenderId: "407294744864",
    appId: "1:407294744864:web:1932600c9bd78c604f5f45",
    measurementId: "G-NJV8DCWW4D"
};

firebase.initializeApp(firebaseConfig);
firebase.auth().settings.appVerificationDisabledForTesting = true;