import { getApp, getApps, initializeApp } from "firebase/app";
import { enableIndexedDbPersistence, getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCtOBTZ_Cmkhr6SeLUtjQzpd8zqN-UDc-E",
  authDomain: "queuing-systems.firebaseapp.com",
  projectId: "queuing-systems",
  storageBucket: "queuing-systems.appspot.com",
  messagingSenderId: "613623226327",
  appId: "1:613623226327:web:30547ff8f41899b35fb592"
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app)

enableIndexedDbPersistence(db);

export { db, auth }