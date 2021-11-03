import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../components/AddAmidites/AddAmidites";
import { db } from "../../firebaseConfig";
import {
   collection,
   getDocs,
   updateDoc,
   deleteDoc,
   doc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import toasty from "toasty";

// MATERIAL UI
import ButtonGroup from "@mui/material/ButtonGroup";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid } from "@mui/x-data-grid";
import LinkIcon from "@mui/icons-material/Link";
import DownloadIcon from "@mui/icons-material/Download";
import PageviewIcon from "@mui/icons-material/Pageview";

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
                                    <Link to={`/editAmidite/${amidite.id}`}>
                                       <IconButton variant="contained">
                                          <EditIcon />
                                       </IconButton>
                                    </Link>
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
                                 <Tooltip title="Link">
                                    <Link to={`/view/${amidite.id}`}>
                                       <IconButton
                                          variant="contained"
                                          href={amidite.ChemDrawFile}
                                       >
                                          <PageviewIcon />
                                       </IconButton>
                                    </Link>
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

   return (
      <>
         <AmiditesHome />
      </>
   );
}

export default AddAmidite;
