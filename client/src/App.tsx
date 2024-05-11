import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Main from './component/Main';
import SignUpForm from './component/SignUpForm';
import SignInForm from './component/SignInForm';

function App() {
  return (
    <Routes>
      <Route path="/main" element={<Main />} />
      <Route path="/signup" element={<SignUpForm />} />
      <Route path="/signin" element={<SignInForm />} />
    </Routes>
  );
}

export default App;