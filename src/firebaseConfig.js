import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: "AIzaSyBOS8CnnRnhfkjAcLAMfy3I8ysBoBP3V_g",
   authDomain: "fb9db-d7c37.firebaseapp.com",
   databaseURL: "gs://fb9db-d7c37.appspot.com",
   projectId: "fb9db-d7c37",
   storageBucket: "fb9db-d7c37.appspot.com",
   messagingSenderId: "691445013787",
   appId: "1:691445013787:web:0bdb6f06d1cc96abdb87be",
   measurementId: "G-BJ24C8H59J",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);
const db = getFirestore(app);
const database = getDatabase(app);

export { db, analytics, storage, database };
