import { db } from "../../firebaseConfig";

import { collection, updateDoc, doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import useFirestore from "../../Hooks/useFirestore";
import "../../components/EditAmidite/EditAmidite.css";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

const EditAmidite = () => {
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
   const [idData, setIdData] = useState([]);
   const [progress, setProgress] = useState(0);

   // ROUTER STATE
   const { docs } = useFirestore("amidites");
   const [state, setState] = useState("");
   const [data, setData] = useState({});
   const [file2, setFile2] = useState(null);
   const storage = getStorage();
   const { id } = useParams();

   console.log(`The ID: ${id}`);
   console.log("The ID Data:", idData);
   console.log("The amiditeName:", amiditeName);

   // FIREBASE REF

   // USE EFFECTS

   useEffect(() => {
      if (docs !== null) {
         setData(docs);
      } else {
         setData({});
      }
   }, [docs]);

   useEffect(() => {
      const {
         chemName,
         molWeight,
         casNum,
         shortAbv,
         regAbv,
         amiditeName,
         mmAbv,
         url,
      } = idData;

      setAmiditeName(amiditeName);
      setChemName(chemName);
      setShortAbv(shortAbv);
      setRegAbv(regAbv);
      setMmAbv(mmAbv);
      setMolWeight(molWeight);
      setCasNum(casNum);
      setUrl(url);
   }, [idData]);

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
      const getAmidite = async () => {
         const docRef = doc(db, "amidites", id);
         const docSnap = await getDoc(docRef);

         if (docSnap.exists()) {
            const unit = docSnap.data();
            setIdData(unit);
            console.log("Done", unit);
         } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
         }
      };
      getAmidite();
   }, [id]);

   // FUNCTIONAL COMPS

   const handleEdit = async (e) => {
      e.preventDefault();

      if (file !== "") {
      }

      const storage = getStorage();
      const storageRef = ref(storage, file.name);
      const amiditeDoc = doc(db, "amidites", id);

      await uploadBytes(storageRef, file).then((snapshot) => {
         console.log("Uploaded a blob or file!");
         console.log(`This is Uploaded this:${snapshot}`);
      });
      await getDownloadURL(ref(storage, file.name)).then((url) => {
         setUrl(url);
      });

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
      await updateDoc(amiditeDoc, newFields);
   };

   // HANLDER
   const handleChange = (e) => {
      if (e.target.files[0]) {
         setFile(e.target.files[0]);
      }
   };

   return (
      <>
         <div className="App">
            <Button variant="contained" onClick={handleEdit}>
               Edit Amidite
            </Button>
            <Box
               component="form"
               sx={{
                  "& > :not(style)": { m: 1, width: "25ch" },
               }}
               noValidate
               autoComplete="off"
            >
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
                  type="number"
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
            </Box>
         </div>
         <table className="styled-table">
            <thead>
               <tr>
                  <th style={{ textAlign: "center" }}>Amidite Name</th>
                  <th style={{ textAlign: "center" }}>Chem Name</th>
                  <th style={{ textAlign: "center" }}>Mole Weight</th>
                  <th style={{ textAlign: "center" }}>Cas Number</th>
                  <th style={{ textAlign: "center" }}>Reg Abv</th>
                  <th style={{ textAlign: "center" }}>Short Abv</th>
                  <th style={{ textAlign: "center" }}>Mermade Abv</th>
                  <th style={{ textAlign: "center" }}>File</th>
               </tr>
            </thead>
            <tbody>
               <tr key={idData.id}>
                  <td>{idData.amiditeName}</td>
                  <td>{idData.chemName}</td>
                  <td>{idData.molWeight}</td>
                  <td>{idData.casNum}</td>
                  <td>{idData.regAbv}</td>
                  <td>{idData.shortAbv}</td>
                  <td>{idData.mmAbv}</td>
                  <td>
                     <img
                        width={100}
                        height={100}
                        mode="fit"
                        src={idData.ChemDrawFile}
                     ></img>
                  </td>
               </tr>
            </tbody>
         </table>
      </>
   );
};

export default EditAmidite;
