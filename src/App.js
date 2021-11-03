
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

// COMPS
import Header from "./components/Header/Header";
import View from "./components/View/View";
import Amidites from "./components/Amidites/Amidites";
import AddAmidite from "./components/AddAmidites/AddAmidites";
import About from "./components/About/About";
import AmiditesHome from "./components/AmiditesHome/AmiditesHome";
import EditAmidite from "./components/EditAmidite/EditAmidite";

const App = () => {
   return (
      <>
         <Router>
            <div>
               <Header />
               <Switch>
                  <Route exact path="/" component={AmiditesHome} />
                  <Route path="/amidites" component={Amidites} />
                  <Route path="/addAmidite" component={AddAmidite} />
                  <Route path="/editAmidite/:id" component={EditAmidite} />
                  <Route path="/view/:id" component={View} />
                  <Route path="/about" component={About} />
               </Switch>
            </div>
         </Router>
      </>
   );
};

export default App;


