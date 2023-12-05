import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD3l5XIz1SpUJ8i0Cv_3gbCuyORTTictXk",
  authDomain: "iccs340-c55c0.firebaseapp.com",
  databaseURL: "https://iccs340-c55c0-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "iccs340-c55c0",
  storageBucket: "iccs340-c55c0.appspot.com",
  messagingSenderId: "532011645880",
  appId: "1:532011645880:web:902c244388a02368546d4d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const firestoreDb = getFirestore(app);

// Initialize Firebase Realtime Database and get a reference to the service
const realtimeDb = getDatabase(app);

const auth = getAuth(app);

import { getStorage } from "firebase/storage";
const storage = getStorage(app);

export {
    firestoreDb,
    realtimeDb,
    auth,
    storage
};
