import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD3l5XIz1SpUJ8i0Cv_3gbCuyORTTictXk",
  authDomain: "iccs340-c55c0.firebaseapp.com",
  projectId: "iccs340-c55c0",
  storageBucket: "iccs3s40-c55c0.appspot.com",
  messagingSenderId: "532011645880",
  appId: "1:532011645880:web:fae854cc7b720953546d4d",
  databaseURL: "https://iccs340-c55c0-default-rtdb.asia-southeast1.firebasedatabase.app/" // Add your Realtime Database URL here
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const firestoreDb = getFirestore(app);

// Initialize Firebase Realtime Database and get a reference to the service
const realtimeDb = getDatabase(app);

export {
    firestoreDb,
    realtimeDb
};
