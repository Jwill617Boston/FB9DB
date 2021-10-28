import { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { onSnapshot, collection } from "firebase/firestore";

const useFirestore = (collect) => {
   const [docs, setDocs] = useState([]);

   useEffect(
      () =>
         onSnapshot(collection(db, collect), (snap) => {
            let data = [];
            snap.forEach((doc) => {
               data.push({ ...doc.data(), id: doc.id });
            });
            setDocs(data);
         }),
      [collect]
   );

   return { docs };
};

export default useFirestore;
