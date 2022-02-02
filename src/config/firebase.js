import { initializeApp } from "firebase/app";
import "firebase/auth";
import reactFirebaseConfig from "../secret";

const firebaseConfig = initializeApp({
  apiKey: reactFirebaseConfig.REACT_APP_FIREBASE_API_KEY,
  authDomain: reactFirebaseConfig.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: reactFirebaseConfig.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: reactFirebaseConfig.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: reactFirebaseConfig.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: reactFirebaseConfig.REACT_APP_FIREBASE_APP_ID,
  measurementId: reactFirebaseConfig.REACT_APP_FIREBASE_MEASUREMENT_ID,
});

export default firebaseConfig;
