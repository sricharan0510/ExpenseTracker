import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './Components/LoginForm';
import UserPage from './Components/UserPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path='/UserPage/:userId/*' element={<UserPage />} />
      </Routes>
    </Router>
  );
}

export default App;
