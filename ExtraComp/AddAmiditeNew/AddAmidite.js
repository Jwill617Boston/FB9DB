import { useState, useEffect } from "react";
import "./AddAmidite";
import { toast } from "react-toastify";
import { useHistory, useParams } from "react-router-dom";

// ******UPDATED PAGE*********

// FIREBASE IMPORTS
import { db } from "../../src/firebaseConfig";
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
import useFirestore from "../../src/Hooks/useFirestore";

// MATERIAL UI IMPORTS
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ButtonGroup from "@mui/material/ButtonGroup";
import Link from "@mui/material/Link";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
import PublishRoundedIcon from "@mui/icons-material/PublishRounded";
import { Grid } from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import DownloadIcon from "@mui/icons-material/Download";

const initialState = {
   amiditeName: "",
   chemName: "",
   shortAbv: "",
   regAbv: "",
   casNum: "",
   molWeight: 0,
   mmAbv: "",
   fileUrl: "",
};

function AddAmidite() {
   // STATE
   const { docs } = useFirestore("amidites");
   const [state, setState] = useState(initialState);
   const [data, setData] = useState({});
   const [file, setFile] = useState(null);
   const [url, setUrl] = useState("");

   const {
      amiditeName,
      chemName,
      shortAbv,
      regAbv,
      mmAbv,
      casNum,
      molWeight,
      fileUrl,
   } = state;

   const history = useHistory();

   const { id } = useParams();

   console.log(`The ID: ${id}`);
   console.log(`The FILE: ${file}`);

   // FIREBASE REF
   const amiditesCollectionRef = collection(db, "amidites");
   const storage = getStorage();

   // useEFFECTS

   useEffect(() => {
      if (docs !== null) {
         setData(docs);
      } else {
         setData({});
      }
   }, [docs]);

   useEffect(() => {
      if (id) {
         async function fetchData() {
            const docRef = doc(db, "amidites", id);
            const docSnap = await getDoc(docRef);
            const data = docSnap.data();
            console.log(`Fetched Data:${data}`);
            setState(data);
         }
         fetchData();
      } else {
         setState({ ...initialState });
      }
   }, [id, data]);

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
         setData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
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
         fileUrl: url,
      };
      await updateDoc(amiditeDoc, newFields);
   };

   const deleteAmidite = async (id) => {
      const amiditeDoc = doc(db, "amidites", id);
      await deleteDoc(amiditeDoc);
   };

   // PRESENTATIONAL COMP

   const AmiditesHome = () => {
      return <></>;
   };

   // HANLDERs
   const handleInputChange = (e) => {
      const { name, value } = e.target;
      console.log(e.target);

      setState({ ...state, [name]: value });
   };

   const handleChangeFile = (e) => {
      if (e.target.files[0]) {
         setFile(e.target.files[0]);
      }
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      if (!amiditeName) {
         toast.error("Please provide value in each input field");
      } else {
         // CREATE OR UPDATE
         if (!id) {
            const docRef = await addDoc(collection(db, "amidites"), state);
            console.log("Document written with ID: ", docRef.id);
         } else {
            const amiditeRef = doc(db, "amidites", id);
            console.log(data);
            await updateDoc(amiditeRef, state);
         }
         setTimeout(() => history.push("/"), 500);
      }
   };

   return (
      <>
         <form onSubmit={handleSubmit}>
            <Tooltip title="Create">
               <IconButton variant="contained" color="primary" type="submit">
                  <PublishRoundedIcon />
               </IconButton>
            </Tooltip>
            <Grid
               container
               alignItems="center"
               justify="center"
               direction="column"
            >
               <Grid item>
                  <TextField
                     id="AmiditeName"
                     name="AmiditeName"
                     label="Amidite Name..."
                     variant="standard"
                     type="text"
                     value={amiditeName || ""}
                     onChange={handleInputChange}
                  />
               </Grid>
               <Grid item>
                  <TextField
                     id="ChemName"
                     name="ChemName"
                     label="Chem Name..."
                     variant="standard"
                     type="text"
                     value={chemName || ""}
                     onChange={handleInputChange}
                  />
               </Grid>
               <Grid item>
                  <TextField
                     id="ShortAbv"
                     name="ShortAbv"
                     label="ShortAbv..."
                     variant="standard"
                     type="text"
                     value={shortAbv || ""}
                     onChange={handleInputChange}
                  />
               </Grid>
               <Grid item>
                  <TextField
                     id="RegAbv"
                     name="RegAbv"
                     label="RegAbv..."
                     variant="standard"
                     type="text"
                     value={regAbv || ""}
                     onChange={handleInputChange}
                  />
               </Grid>
               <Grid item>
                  <TextField
                     id="MmAbv"
                     name="MmAbv"
                     label="Mermade Abv..."
                     variant="standard"
                     type="text"
                     value={mmAbv || ""}
                     onChange={handleInputChange}
                  />
               </Grid>
               <Grid item>
                  <TextField
                     id="CasNum"
                     name="CasNum"
                     label="Cas Number..."
                     variant="standard"
                     type="text"
                     value={casNum || ""}
                     onChange={handleInputChange}
                  />
               </Grid>
               <Grid item>
                  <TextField
                     id="MolWeight"
                     name="MolWeight"
                     label="Mol Weight..."
                     variant="standard"
                     type="number"
                     value={molWeight || ""}
                     onChange={handleInputChange}
                  />
               </Grid>
               <Grid item>
                  <input
                     type="file"
                     placeholder="Chem Draw File..."
                     onChange={handleChange}
                  />
               </Grid>
            </Grid>
         </form>
      </>
   );
}

export default AddAmidite;
