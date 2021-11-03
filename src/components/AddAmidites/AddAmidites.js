import { useState, useEffect } from "react";
import "../../components/AddAmidites/AddAmidites";
import { db } from "../../firebaseConfig";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// ************** UPDATED ADD AMIDITES VERSION 2 *****************

// MATERIAL UI
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";

// MATERIAIL UI

const Item = styled(Paper)(({ theme }) => ({
   margin: theme.spacing(1),
   textAlign: "center",
}));

function AddAmidites() {
   // STATE
   const [amiditeName, setAmiditeName] = useState("");
   const [chemName, setChemName] = useState("");
   const [shortAbv, setShortAbv] = useState("");
   const [regAbv, setRegAbv] = useState("");
   const [mmAbv, setMmAbv] = useState("");
   const [molWeight, setMolWeight] = useState(0);
   const [casNum, setCasNum] = useState("");
   const [file, setFile] = useState("");
   const [url, setUrl] = useState("");
   const [amidites, setAmidites] = useState([]);
   const [amiditesView, setAmiditesView] = useState([]);
   const [progress, setProgress] = useState(0);

   // FIREBASE REF
   const amiditesCollectionRef = collection(db, "amidites");
   const storage = getStorage();

   console.log("file", file);
   

   // useEFFECTS

   useEffect(() => {
      const getAmidites = async () => {
         const data = await getDocs(amiditesCollectionRef);
         setAmidites(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };
      getAmidites();
   }, []);

   useEffect(() => {
      const storageRef = ref(storage, file.name);
      const getUrl = async () => {
         await uploadBytes(storageRef, file).then((snapshot) => {
            console.log("Uploaded a blob or file!");
            console.log(`This is Uploaded this:${snapshot}`);
         });
         await getDownloadURL(ref(storage, file.name)).then((url) => {
            setUrl(url);
         });
      };
      getUrl();
   }, [file]);

   // FUNCTIONAL COMPS

   const createAmidite = async () => {
      const storage = getStorage();

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

   // HANLDER
   const handleChange = (e) => {
      if (e.target.files[0]) {
         setFile(e.target.files[0]);
      }
   };

   return (
      <>
         <Grid container>
            <Grid sm={6}>
               <Grid item>
                  <Item>
                     <TextField
                        id="AmiditeName"
                        label="Amidite Name..."
                        variant="standard"
                        onChange={(event) => {
                           setAmiditeName(event.target.value);
                        }}
                     />
                  </Item>
               </Grid>
               <Grid item>
                  <Item>
                     {" "}
                     <TextField
                        id="ChemName"
                        label="Chem Name..."
                        variant="standard"
                        onChange={(event) => {
                           setChemName(event.target.value);
                        }}
                     />
                  </Item>
               </Grid>
               <Grid item>
                  <Item>
                     <TextField
                        id="MolWeight"
                        label="Mol Weight..."
                        variant="standard"
                        type="number"
                        onChange={(event) => {
                           setMolWeight(event.target.value);
                        }}
                     />
                  </Item>
               </Grid>
               <Grid item>
                  <Item>
                     <TextField
                        id="CasNum"
                        label="Cas Number..."
                        variant="standard"
                        onChange={(event) => {
                           setCasNum(event.target.value);
                        }}
                     />
                  </Item>
               </Grid>
            </Grid>
            <Grid sm={6}>
               <Grid item>
                  <Item>
                     <TextField
                        id="ShortAbv"
                        label="ShortAbv..."
                        variant="standard"
                        onChange={(event) => {
                           setShortAbv(event.target.value);
                        }}
                     />
                  </Item>
               </Grid>
               <Grid item>
                  <Item>
                     <TextField
                        id="RegAbv"
                        label="RegAbv..."
                        variant="standard"
                        onChange={(event) => {
                           setRegAbv(event.target.value);
                        }}
                     />
                  </Item>
               </Grid>
               <Grid item>
                  <Item>
                     <TextField
                        id="MmAbv"
                        label="Mermade Abv..."
                        variant="standard"
                        onChange={(event) => {
                           setMmAbv(event.target.value);
                        }}
                     />
                  </Item>
               </Grid>
               <Grid item>
                  <Item>
                     <input
                        type="file"
                        placeholder="Chem Draw File..."
                        onChange={handleChange}
                     />
                  </Item>
               </Grid>
            </Grid>
         </Grid>
         <Grid item sm={12}>
            <Item>
               <Button variant="contained" onClick={createAmidite}>
                  Create Amidite
               </Button>
            </Item>
         </Grid>
      </>
   );
}

export default AddAmidites;
