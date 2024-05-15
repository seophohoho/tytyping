import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Main from './component/Main';
import SignUpForm from './component/SignUpForm';
import SignInForm from './component/SignInForm';
import FindUsernameForm from './component/FindUsernameForm';
import FindPasswordForm from './component/FindPasswordForm';
import ResetPasswordForm from './component/ResetPasswordForm';

function App() {
  return (
    <Routes>
      <Route path="/main" element={<Main />} />
      <Route path="/signup" element={<SignUpForm />} />
      <Route path="/signin" element={<SignInForm />} />
      <Route path="/find-username" element={<FindUsernameForm />} />
      <Route path="/find-password" element={<FindPasswordForm />} />
      <Route path="/reset-password" element={<ResetPasswordForm />} /> 
    </Routes>
  );
}

export default App;