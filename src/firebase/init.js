import firebase from "firebase/app";
const firebaseui = require('firebaseui');
import "firebase/auth"
import "firebase/firestore";

const config = {
    apiKey: "AIzaSyBDN5UQB9hl_z_Nc6N3yC_dnnsCbJ-7tvs",
    authDomain: "ameelio-badeb.firebaseapp.com",
    databaseURL: "https://ameelio-badeb.firebaseio.com",
    projectId: "ameelio-badeb",
    storageBucket: "ameelio-badeb.appspot.com",
    messagingSenderId: "42596678946",
    appId: "1:42596678946:web:a4acb5936a32dbaea7797b",
    measurementId: "G-JF1FNS7N09"
};

const app = firebase.initializeApp(config);
const auth = firebase.auth();
const db = app.firestore();

const authUI = new firebaseui.auth.AuthUI(auth);

const authUIConfig = {
    signInSuccessUrl: "/",
    signInOptions: [
        {
            provider: firebase.auth.EmailAuthProvider.PROVIDER_ID
        },
        {
            provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            customParameters: {
                prompt: "select_account"
            }
        }
    ]
};

export default app;
export { auth, db, authUI, authUIConfig };
