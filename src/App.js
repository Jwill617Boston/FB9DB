
import { useEffect, useState } from "react";
import { Route, Switch } from "react-router";
import AmiditesHome from "./components/ExtraComp/AmiditesHome/AmiditesHome";
import AddAmidite from "./components/AddAmidite/AddAmidite";
import React from "react";

const App = () => {
   return (
      <div>
         <AddAmidite />
      </div>
   );
};

export default App;
