<<<<<<< HEAD
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

=======
import { initializeApp, getApps, getApp } from "firebase/app";
import {
  initializeAuth,
  getAuth,
  // @ts-ignore — getReactNativePersistence exists at runtime; firebase's type defs don't export it yet
  getReactNativePersistence,
  type Auth,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
>>>>>>> c4753424df0081b8b54ea2dffcbdf852360ff987

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};


// Initialize Firebase only once
const app =
  getApps().length > 0
    ? getApp()
    : initializeApp(firebaseConfig);

<<<<<<< HEAD

// Initialize Firebase Authentication
const auth = getAuth(app);


export { app, auth };
=======
export { app, auth };
>>>>>>> c4753424df0081b8b54ea2dffcbdf852360ff987
