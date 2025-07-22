import React from "react";
import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import ProtectedAdminPanel from "./components/ProtectedAdminPanel";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<ProtectedAdminPanel />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;