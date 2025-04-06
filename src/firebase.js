import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import firebaseConfig from './firebase-config';

// Initialize Firebase
let app;
let db;
let auth;
let storage;

try {
    // Initialize Firebase
    if (!firebase.apps.length) {
        app = firebase.initializeApp(firebaseConfig);
    } else {
        app = firebase.app();
    }

    db = firebase.firestore();
    auth = firebase.auth();
    storage = firebase.storage();

    console.log("Firebase initialized successfully");
} catch (error) {
    console.error("Firebase initialization error:", error);
}

export { db, auth, storage };
export default app; 