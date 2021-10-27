import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./View.css";

const View = () => {
   const { id } = useParams();

   return (
      <div style={{ marginTop: "150px" }}>
         <div className="card">
            <div className="card-header">
               <p>amidites Contact Detail</p>
            </div>
            <div className="container">
               <strong>ID: </strong>
               <span></span>
               <br />
               <br />
               <strong>CasNumber: </strong>
               <span></span>
               <br />
               <br />
               <strong>FullChem Name: </strong>
               <span></span>
               <br />
               <br />
               <strong>Reg ABV: </strong>
               <span></span>
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
