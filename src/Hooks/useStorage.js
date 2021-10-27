import { useState, useEffect } from "react";
import { storage } from "../firebaseConfig";

const useStorage = (file) => {
   const [progress, setProgress] = useState(0);

   const [url, setUrl] = useState(null);

   useEffect(() => {
      // references
      const storageRef = storage.ref(file.name);

      storageRef.put(file).on(
         "state_changed",
         (snap) => {
            let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
            setProgress(percentage);
         },
         async () => {
            const url = await storageRef.getDownloadURL();

            setUrl(url);
         }
      );
   }, [file]);

   return { progress, url };
};

export default useStorage;
