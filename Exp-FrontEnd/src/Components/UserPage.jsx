import React, { useState } from 'react'
import { Route, Routes, Link, useParams } from "react-router-dom";
import "../App.css";
import Dashboard from './Dashboard';
import Incomes from './Incomes';
import Expenses from './Expenses';

function UserPage() {
    const { userId } = useParams();
    const [activeLink, setActiveLink] = useState(`/UserPage/${userId}/dashboard`);
    return (
        <div style={{ display: "flex", height: "100vh" }}>
            <nav className="sidebar">
                <h2>Hello {`${userId}`}!</h2>
                <ul>
                    <li className={activeLink === `/UserPage/${userId}/dashboard` ? "active" : ""} onClick={() => setActiveLink(`/UserPage/${userId}/dashboard`)}>
                        <Link to={`/UserPage/${userId}/dashboard`}>Dashboard</Link>
                    </li>
                    <li className={activeLink === `/UserPage/${userId}/incomes` ? "active" : ""} onClick={() => setActiveLink(`/UserPage/${userId}/incomes`)}>
                        <Link to={`/UserPage/${userId}/incomes`}>Income Sources</Link>
                    </li>
                    <li className={activeLink === `/UserPage/${userId}/expenses` ? "active" : ""} onClick={() => setActiveLink(`/UserPage/${userId}/expenses`)}>
                        <Link to={`/UserPage/${userId}/expenses`}>Expenses</Link>
                    </li>
                </ul>
            </nav>
            <div className="main-content">
                <Routes>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="incomes" element={<Incomes />} />
                    <Route path="expenses" element={<Expenses />} />
                </Routes>
            </div>
        </div>
    )
}

export default UserPage
