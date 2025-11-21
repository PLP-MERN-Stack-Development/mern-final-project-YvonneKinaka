import React from "react";
import { HashRouter   as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Model from "./pages/Model/Model";
import Result from "./pages/Results/Result";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/model" element={<Model />}/>
          <Route path="/result" element={<Result />}/>
        </Routes>
      </Router>
    </>
  );
};
  
export default App;
