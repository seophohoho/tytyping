import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';
import FindUsername from './FindUsername';
import FindPassword from './FindPassword';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/findusername" element={<FindUsername />} />
        <Route path="/findpassword" element={<FindPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
