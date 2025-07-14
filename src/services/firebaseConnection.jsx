
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCQulJwed3RqXtnceacbc8xNxXt3iAeJjA",
  authDomain: "devlink-46699.firebaseapp.com",
  projectId: "devlink-46699",
  storageBucket: "devlink-46699.firebasestorage.app",
  messagingSenderId: "1016499931350",
  appId: "1:1016499931350:web:21c165b36584a8ca79e177",
  measurementId: "G-E1BM65RHZ2"
};

const firebaseApp = initializeApp(firebaseConfig)

const db = getFirestore(firebaseApp)
const auth = getAuth(firebaseApp)

export {db,auth};