import React, { useEffect, useState } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import "./Header.css";

const Header = () => {
   const [activeTab, setActiveTab] = useState("Home");
   const location = useLocation();

   useEffect(() => {
      if (location.pathname === "/") {
         setActiveTab("Amidites");
      } else if (location.pathname === "/addAmidite") {
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
                  className={`${activeTab === "Amidites" ? "active" : ""}`}
                  onClick={() => setActiveTab("Amidites")}
               >
                  Amidites
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
