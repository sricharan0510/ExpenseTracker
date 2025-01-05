import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './Components/LoginForm';
import Dashboard from './Components/Dashboard';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginForm />} />
                <Route path="/dashboard/:userId" element={<Dashboard />} />
            </Routes>
        </Router>
    );
}

export default App;
