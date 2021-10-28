import { useState, useEffect } from "react";
import { db } from "../../../firebaseConfig";
import {
   collection,
   getDocs,
   getDoc,
   addDoc,
   updateDoc,
   deleteDoc,
   doc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// MATERIAL UI
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ButtonGroup from "@mui/material/ButtonGroup";
import Link from "@mui/material/Link";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { DataGrid } from "@mui/x-data-grid";
import LinkIcon from "@mui/icons-material/Link";
import DownloadIcon from "@mui/icons-material/Download";

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
   const [amiditesView, setAmiditesView] = useState([]);
   const [progress, setProgress] = useState(0);

   // FIREBASE REF
   const amiditesCollectionRef = collection(db, "amidites");
   const storage = getStorage();

   console.log(`This is File:${file}`);
   console.log(`This is Url:${url}`);
   console.log(`This is AmiditesView:${amiditesView}`);

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

   useEffect(() => {
      fetch("https://jsonplaceholder.typicode.com/posts")
         .then((response) => response.json())
         .then((json) => setAmiditesView(json));
   }, []);

   // DATAGRID
   const columns = [
      { title: "ID", field: "id" },
      { field: "AmiditeName", headerName: "AmiditeName", width: 150 },
      {
         field: "ChemName",
         headerName: "ChemName",
         width: 150,
         editable: true,
      },
      {
         field: "id",
         headerName: "id",
         description: "This column has a value getter and is not sortable.",
         sortable: false,
         width: 160,
         valueGetter: (params) =>
            `${params.getValue(params.id, "firstName") || ""} ${
               params.getValue(params.id, "lastName") || ""
            }`,
      },
   ];

   const rows = [];

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
      const amiditeDoc = doc(db, "amidites", id);
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

   const deleteAmidite = async (id) => {
      const amiditeDoc = doc(db, "amidites", id);
      await deleteDoc(amiditeDoc);
   };

   const downLoadAmidite = async (url) => {};

   // PRESENTATIONAL COMP

   const AmiditesHome = () => {
      return (
         <>
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
                     <th style={{ textAlign: "center" }}>Options</th>
                     <th style={{ textAlign: "center" }}>File</th>
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
                              <ButtonGroup
                                 variant="contained"
                                 aria-label="outlined primary button group"
                              >
                                 <Tooltip title="Edit">
                                    <IconButton
                                       variant="contained"
                                       onClick={() => {
                                          updateAmidite(amidite.id);
                                       }}
                                    >
                                       <EditIcon />
                                    </IconButton>
                                 </Tooltip>
                                 <Tooltip title="Delete">
                                    <IconButton
                                       variant="contained"
                                       onClick={() => {
                                          deleteAmidite(amidite.id);
                                       }}
                                    >
                                       <DeleteIcon />
                                    </IconButton>
                                 </Tooltip>
                                 <Tooltip title="Link">
                                    <IconButton
                                       variant="contained"
                                       href={amidite.ChemDrawFile}
                                    >
                                       <LinkIcon />
                                    </IconButton>
                                 </Tooltip>
                                 <Tooltip title="Download">
                                    <IconButton
                                       variant="contained"
                                       onClick={() => {
                                          downLoadAmidite(amidite.ChemDrawFile);
                                       }}
                                    >
                                       <DownloadIcon />
                                    </IconButton>
                                 </Tooltip>
                              </ButtonGroup>
                           </td>
                           <td>
                              <img
                                 width={100}
                                 height={100}
                                 mode="fit"
                                 src={amidite.ChemDrawFile}
                              ></img>
                           </td>
                        </tr>
                     );
                  })}
               </tbody>
            </table>
         </>
      );
   };

   const AmiditeView = async (id) => {
      const docRef = doc(db, "amidites", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
         console.log("Document data:", docSnap.data());
         setAmiditesView(docSnap.data());
      } else {
         console.log("No such document!");
      }

      return <div></div>;
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
         <AmiditesHome />
      </div>
   );
}

export default AddAmidite;
