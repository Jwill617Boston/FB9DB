import React, { useEffect, useState } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import "./Header.css";

const Header = () => {
   const [activeTab, setActiveTab] = useState("Home");
   const location = useLocation();

   useEffect(() => {
      if (location.pathname === "/") {
         setActiveTab("AmiditeList");
      } else if (location.pathname === "/amidites") {
         setActiveTab("Amidites");
      } else if (location.pathname === "/addAmdite") {
         setActiveTab("AddAmidite");
      } else if (location.pathname === "/about") {
         setActiveTab("About");
      }
   }, [location]);

   return (
      <div className="header">
         <Link to="/">
            <p className="logo">Amidite Database</p>
         </Link>

         <div className="header-right">
            <Link to="/">
               <p
                  className={`${activeTab === "AmiditeList" ? "active" : ""}`}
                  onClick={() => setActiveTab("AmiditeList")}
               >
                  Amidites
               </p>
            </Link>
            <Link to="/amidites">
               <p
                  className={`${activeTab === "Amidites" ? "active" : ""}`}
                  onClick={() => setActiveTab("Amidites")}
               >
                  Edit Amidite
               </p>
            </Link>

            <Link to="/addAmidite">
               <p
                  className={`${activeTab === "AddAmidite" ? "active" : ""}`}
                  onClick={() => setActiveTab("AddAmidite")}
               >
                  Add Amidite
               </p>
            </Link>
            <Link to="/about">
               <p
                  className={`${activeTab === "About" ? "active" : ""}`}
                  onClick={() => setActiveTab("About")}
               >
                  About
               </p>
            </Link>
         </div>
      </div>
   );
};

export default Header;
