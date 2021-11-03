import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: "AIzaSyAUOOOnp2qlSv9CtDnFP2-FF6EYYTqHDtE",
   authDomain: "fb9db-amidites.firebaseapp.com",
   databaseURL: "https://fb9db-amidites-default-rtdb.firebaseio.com",
   projectId: "fb9db-amidites",
   storageBucket: "fb9db-amidites.appspot.com",
   messagingSenderId: "644160054424",
   appId: "1:644160054424:web:dc2dd54cb85abb46871ced",
   measurementId: "G-BWPZT3B7VV",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);
const db = getFirestore(app);
const database = getDatabase(app);

export { db, analytics, storage, database };
