import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import ProtectedAdminPanel from "./components/ProtectedAdminPanel";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<ProtectedAdminPanel />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;