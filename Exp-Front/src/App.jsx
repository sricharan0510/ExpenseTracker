import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useState } from "react";
import Dashboard from "./Components/Dashboards";
import Incomes from "./Components/Incomes";
import AllExpenses from "./Components/AllExpenses";
import AUDexp from "./Components/AUDexp";
import AUDinc from "./Components/AUDinc";
import ExpCat from "./Components/ExpCat";
import "./App.css";

function App() {
  const [activeLink, setActiveLink] = useState("/");
  return (
    <Router>
      <div style={{ display: "flex", height: "100vh" }}>
        <nav className="sidebar">
          <h2>Hello User!</h2>
          <ul>
            <li className={activeLink === "/" ? "active" : ""} onClick={() => setActiveLink("/")}>
              <Link to="/">Dashboard</Link>
            </li>
            <li className={activeLink === "/incomes" ? "active" : ""} onClick={() => setActiveLink("/incomes")}>
              <Link to="/incomes">Income Sources</Link>
            </li>
            <li className={activeLink === "/allExpenses" ? "active" : ""} onClick={() => setActiveLink("/allExpenses")}>
              <Link to="/allExpenses">Expenses</Link>
            </li>
            <li className={activeLink === "/audinc" ? "active" : ""} onClick={() => setActiveLink("/audinc")}>
              <Link to="/audinc">AUD-Incomes</Link>
            </li>
            <li className={activeLink === "/audexp" ? "active" : ""} onClick={() => setActiveLink("/audexp")}>
              <Link to="/audexp">AUD-Expenses</Link>
            </li>
            <li className={activeLink === "/expcat" ? "active" : ""} onClick={() => setActiveLink("/expcat")}>
              <Link to="/expcat">Exp Categories</Link>
            </li>
          </ul>
        </nav>
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/incomes" element={<Incomes />} />
            <Route path="/allExpenses" element={<AllExpenses />} />
            <Route path="/audinc" element={<AUDinc />} />
            <Route path="/audexp" element={<AUDexp />} />
            <Route path="/expcat" element={<ExpCat />} />
          </Routes>
        </div>
      </div>
    </Router >
  );
}

export default App;
