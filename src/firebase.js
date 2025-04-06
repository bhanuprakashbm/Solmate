// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAAH_1-aHY38gAnj9pBx-TZp9zNKUsSLgE",
    authDomain: "solmate-app.firebaseapp.com",
    projectId: "solmate-app",
    storageBucket: "solmate-app.firebasestorage.app",
    messagingSenderId: "758473554659",
    appId: "1:758473554659:web:b38911fcb7b163c924e3d6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app; 