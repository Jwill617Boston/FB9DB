import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebaseConfig";

const AmiditesHome = () => {
   const [amidites, setAmidites] = useState([]);
   const amiditesCollectionRef = collection(db, "amidites");

   useEffect(() => {
      const getAmidites = async () => {
         const data = await getDocs(amiditesCollectionRef);
         setAmidites(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };

      getAmidites();
   }, [amiditesCollectionRef]);

   return (
      <div style={{ marginTop: "100px" }}>
         <table className="styled-table">
            <thead>
               <tr>
                  <th style={{ textAlign: "center" }}>No.</th>
                  <th style={{ textAlign: "center" }}>Chem Name</th>
                  <th style={{ textAlign: "center" }}>Mole Weight</th>
                  <th style={{ textAlign: "center" }}>Cas Number</th>
                  <th style={{ textAlign: "center" }}>Reg Abv</th>
                  <th style={{ textAlign: "center" }}>Short Abv</th>
                  <th style={{ textAlign: "center" }}>Action</th>
                  <th style={{ textAlign: "center" }}>View</th>
               </tr>
            </thead>
            <tbody>
               {amidites.map((amidite) => {
                  console.log(`this is `);
                  return (
                     <tr key={amidite.id}>
                        <th scope="row">{amidite.id}</th>
                        <td>{amidite.fullChemNam}</td>
                        <td>{amidite.moleWeight}</td>
                        <td>{amidite.casNum}</td>
                        <td>{amidite.regAbv}</td>
                        <td>{amidite.shortAbv}</td>
                        <td>
                           <button className="btn btn-edit">Edit</button>
                        </td>
                        <td>
                           <button className="btn btn-view">View</button>
                        </td>
                     </tr>
                  );
               })}
            </tbody>
         </table>
      </div>
   );
};

export default AmiditesHome;
