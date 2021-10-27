import React, { useState, useEffect } from "react";
import { db } from "../../firebaseConfig";
import { getDocs } from "firebase/firestore";
import { useParams, Link } from "react-router-dom";
import "./View.css";

const View = () => {
   const { id } = useParams();

   const [amidites, setAmidites] = useState([]);
   const amiditesCollectionRef = collection(db, "amidites");

   useEffect(() => {
      const getAmidites = async () => {
         const data = await getDocs(amiditesCollectionRef);
         setAmidites(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };

      getAmidites();
   }, []);

   console.log("amidites", amidites);
   return (
      <div style={{ marginTop: "150px" }}>
         <div className="card">
            <div className="card-header">
               <p>amidites Contact Detail</p>
            </div>
            <div className="container">
               <strong>ID: </strong>
               <span>{id}</span>
               <br />
               <br />
               <strong>CasNumber: </strong>
               <span>{amidites.casNum}</span>
               <br />
               <br />
               <strong>FullChem Name: </strong>
               <span>{amidites.fullChemNam}</span>
               <br />
               <br />
               <strong>Reg ABV: </strong>
               <span>{amidites.regAbv}</span>
               <br />
               <br />
               <Link to="/">
                  <button className="btn btn-edit">Go Back</button>
               </Link>
            </div>
         </div>
      </div>
   );
};

export default View;
