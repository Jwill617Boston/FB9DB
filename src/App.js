
import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import Home from "./components/Home";
import Task from "./components/Task";
import Test from "./components/Test";



const App = () => {

  return (
    <div>
      <Home />
      <Test />      
      <AddTask />
    
    </div>
  );
};

export default App;
