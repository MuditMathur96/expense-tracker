// Import the functions you need from the SDKs you need
import { initializeApp,getApps,getApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import { FIREBASE_APIKEY, FIREBASE_APPID, FIREBASE_AUTHDOMAIN, FIREBASE_MESSAGESENDERID, FIREBASE_PROJECTID, FIREBASE_STORAGEBUCKET } from "./environments";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: FIREBASE_APIKEY,
  authDomain: FIREBASE_AUTHDOMAIN,
  projectId: FIREBASE_PROJECTID,
  storageBucket: FIREBASE_STORAGEBUCKET,
  messagingSenderId: FIREBASE_MESSAGESENDERID,
  appId: FIREBASE_APPID
};

// Initialize Firebase
const app =getApps().length>0?getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export {app,db};