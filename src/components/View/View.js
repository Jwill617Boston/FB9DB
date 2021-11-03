import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../../firebaseConfig";
import { getDoc, doc } from "firebase/firestore";
import "../../components/View/View.css";

// MATERIAL UI


const View = () => {
   const { id } = useParams();

   const [idData, setIdData] = useState([]);

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

   return (
      <div style={{ marginTop: "150px" }}>
         <div className="card">
            <div className="card-header">
               <p>Amidite Detail</p>
            </div>
            <div className="container">
               <strong>Amidite Name:</strong>
               <span>{idData.amiditeName}</span>
               <br />
               <br />
               <strong>CasNumber: </strong>
               <span>{idData.chemName}</span>
               <br />
               <br />
               <strong>Mole Weight: </strong>
               <span>{idData.molWeight}</span>
               <br />
               <br />
               <strong>Cas Number: </strong>
               <span>{idData.casNum}</span>
               <br />
               <br />
               <strong>Reg Abv: </strong>
               <span>{idData.regAbv}</span>
               <br />
               <br />
               <strong>Short Abv: </strong>
               <span>{idData.shortAbv}</span>
               <br />
               <br />
               <strong>File: </strong>
               <span>
                  {" "}
                  <img
                     width={100}
                     height={100}
                     mode="fit"
                     alt="File Url"
                     src={idData.ChemDrawFile}
                  ></img>
               </span>
               <br />
               <br />
               <Link to="/amidites">
                  <button className="btn btn-edit">Go Back</button>
               </Link>
            </div>
         </div>
      </div>
   );
};

export default View;
