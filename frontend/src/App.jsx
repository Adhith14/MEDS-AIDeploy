import { useState } from "react";
import "./App.css";
import HomePage from "./components/mainHome";
import Login from "./components/login";
import Signup from "./components/signup";
import { Route, Router, Routes } from "react-router-dom";
import Squares from "./components/Squares";
import SymptomPredictor from "./components/SymptomPredictor";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
  
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/predict" element={<SymptomPredictor/> } />
      </Routes>
     
    

    </>
  );
}

export default App;
