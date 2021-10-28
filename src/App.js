
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";

// COMPS
import Header from "./components/Header/Header";
import View from "./components/View/View";
import Amidites from "./components/Amidites/Amidites";
import AmiditesHome from "./components/ExtraComp/AmiditesHome/AmiditesHome";
import AddAmidite from "./components/ExtraComp/AddAmiditeNew/AddAmidite";
import About from "./components/About/About";

const App = () => {
   return (
      <>
         <Router>
            <div>
               <Header />
               <Switch>
                  <Route exact path="/" component={Amidites} />
                  <Route exact path="/amidites" component={Amidites} />
                  <Route path="/view/:id" component={View} />
                  <Route path="/about" component={About} />
                  <Route path="/addAmidite" component={AddAmidite} />
                  <Route path="/updateAmidite/:id" component={AddAmidite} />
               </Switch>
            </div>
         </Router>
      </>
   );
};

export default App;


