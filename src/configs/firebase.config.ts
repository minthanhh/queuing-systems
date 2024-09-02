import { getApp, getApps, initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: 'AIzaSyCp3JAQoa1rEXPEPIVwXr9zB58VQmroxg8',
    authDomain: 'queuing-systems-190c5.firebaseapp.com',
    projectId: 'queuing-systems-190c5',
    storageBucket: 'queuing-systems-190c5.appspot.com',
    messagingSenderId: '563640657989',
    appId: '1:563640657989:web:127944fc7afafc21afdb2c',
    measurementId: 'G-RQB6CW2WH1',
}

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app)

export { db, auth, storage }
