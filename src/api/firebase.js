import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBsEZOP2wQh_8Lq0Fz_9nbZr7mYDmKJ2Fs",
  authDomain: "chatie-7ab21.firebaseapp.com",
  projectId: "chatie-7ab21",
  storageBucket: "chatie-7ab21.appspot.com",
  messagingSenderId: "689684471036",
  appId: "1:689684471036:web:2433a1da56430e601a0b79",
  measurementId: "G-NW7W4DBGMQ",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

export { auth, provider };
export default db;
