import { useState, useEffect } from "react";
import "./AddAmidite";
import { db } from "../../firebaseConfig";
import {
   collection,
   getDocs,
   addDoc,
   updateDoc,
   deleteDoc,
   doc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

function AddAmidite() {
   // STATE
   const [amiditeName, setAmiditeName] = useState("");
   const [chemName, setChemName] = useState("");
   const [shortAbv, setShortAbv] = useState("");
   const [regAbv, setRegAbv] = useState("");
   const [mmAbv, setMmAbv] = useState("");
   const [molWeight, setMolWeight] = useState(0);
   const [casNum, setCasNum] = useState("");
   const [file, setFile] = useState("");
   const [url, setUrl] = useState(null);
   const [amidites, setAmidites] = useState([]);
   const [amiditesGrid, setAmiditesGird] = useState({});
   const [progress, setProgress] = useState(0);

   // FIREBASE REF
   const amiditesCollectionRef = collection(db, "amidites");
   const storage = getStorage();

   console.log(`This is File:${file}`);
   console.log(`This is Url:${url}`);

   // useEFFECTS
   useEffect(() => {
      const getUpload = async () => {
         const storageRef = ref(storage, file.name);
         await uploadBytes(storageRef, file).then((snapshot) => {
            console.log("Uploaded a blob or file!");
            console.log(`This is Uploaded this:${snapshot}`);
         });
         getDownloadURL(ref(storage, file.name)).then((url) => {
            setUrl(url);
         });
      };
      getUpload();
   }, [file]);

   useEffect(() => {
      const getAmidites = async () => {
         const data = await getDocs(amiditesCollectionRef);
         setAmidites(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };
      getAmidites();
   }, []);

   // FUNCTIONAL COMPS

   const createAmidite = async () => {
      const storage = getStorage();
      const storageRef = ref(storage, file.name);

      await uploadBytes(storageRef, file).then((snapshot) => {
         console.log("Uploaded a blob or file!");
         console.log(`This is Uploaded this:${snapshot}`);
      });
      getDownloadURL(ref(storage, file.name)).then((url) => {
         setUrl(url);
      });
      await addDoc(amiditesCollectionRef, {
         chemName,
         molWeight: Number(molWeight),
         casNum,
         shortAbv,
         regAbv,
         amiditeName,
         mmAbv,
         ChemDrawFile: url,
      });
   };

   const updateAmidite = async (id) => {
      const userDoc = doc(db, "amidites", id);
      const newFields = {
         chemName,
         molWeight,
         casNum,
         shortAbv,
         regAbv,
         amiditeName,
         mmAbv,
         ChemDrawFile: url,
      };
      await updateDoc(userDoc, newFields);
   };

   const deleteAmidite = async (id) => {
      const userDoc = doc(db, "amidites", id);
      await deleteDoc(userDoc);
   };

   // PRESENTATIONAL COMP

   const AmiditesHome = () => {
      return (
         <table className="styled-table">
            <thead>
               <tr>
                  <th style={{ textAlign: "center" }}>No.</th>
                  <th style={{ textAlign: "center" }}>Amidite Name</th>
                  <th style={{ textAlign: "center" }}>Chem Name</th>
                  <th style={{ textAlign: "center" }}>Mole Weight</th>
                  <th style={{ textAlign: "center" }}>Cas Number</th>
                  <th style={{ textAlign: "center" }}>Reg Abv</th>
                  <th style={{ textAlign: "center" }}>Short Abv</th>
                  <th style={{ textAlign: "center" }}>Mermade Abv</th>
                  <th style={{ textAlign: "center" }}>Edit</th>
                  <th style={{ textAlign: "center" }}>Delete</th>
                  <th style={{ textAlign: "center" }}>View</th>
                  <th style={{ textAlign: "center" }}>Chem draw SVG</th>
               </tr>
            </thead>
            <tbody>
               {amidites.map((amidite) => {
                  return (
                     <tr key={amidite.id}>
                        <th scope="row">{amidite.id}</th>
                        <td>{amidite.amiditeName}</td>
                        <td>{amidite.chemName}</td>
                        <td>{amidite.molWeight}</td>
                        <td>{amidite.casNum}</td>
                        <td>{amidite.regAbv}</td>
                        <td>{amidite.shortAbv}</td>
                        <td>{amidite.mmAbv}</td>
                        <td>
                           <Button
                              variant="contained"
                              onClick={() => {
                                 updateAmidite(amidite.id, amidite.molWeight);
                              }}
                           >
                              {" "}
                              Edit Amidite
                           </Button>
                        </td>
                        <td>
                           <Button
                              variant="contained"
                              onClick={() => {
                                 deleteAmidite(amidite.id);
                              }}
                           >
                              {" "}
                              Delete Amidite
                           </Button>
                        </td>
                        <td>
                           <Button variant="contained" className="btn btn-view">
                              View
                           </Button>
                        </td>
                        <td>
                           <Button variant="contained" href={amidite.url}>
                              File
                           </Button>
                        </td>
                     </tr>
                  );
               })}
            </tbody>
         </table>
      );
   };

   // HANLDER
   const handleChange = (e) => {
      if (e.target.files[0]) {
         setFile(e.target.files[0]);
      }
   };

   return (
      <div className="App">
         <Button variant="contained" onClick={createAmidite}>
            Create Amidite
         </Button>
         <TextField
            id="AmiditeName"
            label="Amidite Name..."
            variant="standard"
            onChange={(event) => {
               setAmiditeName(event.target.value);
            }}
         />
         <TextField
            id="ChemName"
            label="Chem Name..."
            variant="standard"
            onChange={(event) => {
               setChemName(event.target.value);
            }}
         />
         <TextField
            id="MolWeight"
            label="Mol Weight..."
            variant="standard"
            onChange={(event) => {
               setMolWeight(event.target.value);
            }}
         />
         <TextField
            id="CasNum"
            label="Cas Number..."
            variant="standard"
            onChange={(event) => {
               setCasNum(event.target.value);
            }}
         />
         <TextField
            id="ShortAbv"
            label="ShortAbv..."
            variant="standard"
            onChange={(event) => {
               setShortAbv(event.target.value);
            }}
         />
         <TextField
            id="RegAbv"
            label="RegAbv..."
            variant="standard"
            onChange={(event) => {
               setRegAbv(event.target.value);
            }}
         />
         <TextField
            id="MmAbv"
            label="Mermade Abv..."
            variant="standard"
            onChange={(event) => {
               setMmAbv(event.target.value);
            }}
         />
         <input
            type="file"
            placeholder="Chem Draw File..."
            onChange={handleChange}
         />
         <AmiditesHome />
      </div>
   );
}

export default AddAmidite;
