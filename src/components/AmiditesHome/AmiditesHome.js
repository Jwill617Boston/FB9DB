import "./AmiditesHome.css";
import { useState, useEffect } from "react";
import { db } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { getStorage } from "firebase/storage";

function AmiditesHome() {
   // STATE
   const [amidites, setAmidites] = useState([]);
   console.log("amidites", amidites);

   // FIREBASE REF
   const amiditesCollectionRef = collection(db, "amidites");
   const storage = getStorage();

   // useEFFECTS
   useEffect(() => {
      const getAmidites = async () => {
         const data = await getDocs(amiditesCollectionRef);
         setAmidites(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };
      getAmidites();
   }, []);

   // FUNCTIONAL COMPS

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

export default AmiditesHome;
