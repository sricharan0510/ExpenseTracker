import React, { useEffect, useState } from 'react';
import { Route, Routes, Link, useParams, useLocation } from "react-router-dom";
import "../App.css";
import Dashboard from './Dashboard';
import Incomes from './Incomes';
import Expenses from './Expenses';
import ExpRanges from './ExpRanges';
import Statistics from './Statistics';

function UserPage() {
    const { userId } = useParams();
    const location = useLocation();
    const [activeLink, setActiveLink] = useState(`/UserPage/${userId}/dashboard`);

    useEffect(() => {
        setActiveLink(location.pathname);
    }, [location]);

    return (
        <div style={{ display: "flex", height: "100vh" }}>
            <nav className="sidebar">
                <h2>Hello {`${userId}`}!</h2>
                <ul>
                    <li className={activeLink === `/UserPage/${userId}/dashboard` ? "active" : ""}>
                        <Link to={`/UserPage/${userId}/dashboard`} onClick={() => setActiveLink(`/UserPage/${userId}/dashboard`)}>Dashboard</Link>
                    </li>
                    <li className={activeLink === `/UserPage/${userId}/incomes` ? "active" : ""}>
                        <Link to={`/UserPage/${userId}/incomes`} onClick={() => setActiveLink(`/UserPage/${userId}/incomes`)}>Income Sources</Link>
                    </li>
                    <li className={activeLink === `/UserPage/${userId}/expenses` ? "active" : ""}>
                        <Link to={`/UserPage/${userId}/expenses`} onClick={() => setActiveLink(`/UserPage/${userId}/expenses`)}>Expenses</Link>
                    </li>
                    <li className={activeLink === `/UserPage/${userId}/expRanges` ? "active" : ""}>
                        <Link to={`/UserPage/${userId}/expRanges`} onClick={() => setActiveLink(`/UserPage/${userId}/expRanges`)}>Expenses In Ranges</Link>
                    </li>
                    <li className={activeLink === `/UserPage/${userId}/statistics` ? "active" : ""}>
                        <Link to={`/UserPage/${userId}/statistics`} onClick={() => setActiveLink(`/UserPage/${userId}/statistics`)}>Statistics</Link>
                    </li>
                </ul>
            </nav>
            <div className="main-content">
                <Routes>
                    <Route path="*" element={<Dashboard />} />
                    <Route path="incomes" element={<Incomes />} />
                    <Route path="expenses" element={<Expenses />} />
                    <Route path="expRanges" element={<ExpRanges />} />
                    <Route path="statistics" element={<Statistics />} />
                </Routes>
            </div>
        </div>
    );
}

export default UserPage;
