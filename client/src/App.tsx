import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Main from './component/Main';
import SignUpForm from './component/SignUpForm';
import SignInForm from './component/SignInForm';
import FindUsernameForm from './component/findComponent/FindUsernameForm';
import FindPasswordForm from './component/findComponent/FindPasswordForm';
import ResetPasswordForm from './component/findComponent/ResetPasswordForm';
import Game from './component/Game';
import Board from './component/Board';
import BoardDetailComponent from './component/boardComponent/BoardDetailComponent';

function App() {
  return (
    <Routes>
      <Route path="/main" element={<Main />} />
      <Route path="/signup" element={<SignUpForm />} />
      <Route path="/signin" element={<SignInForm />} />
      <Route path="/find-username" element={<FindUsernameForm />} />
      <Route path="/find-password" element={<FindPasswordForm />} />
      <Route path="/reset-password" element={<ResetPasswordForm />} />
      <Route path="/game" element={<Game />} />
      <Route path="/board" element={<Board />} />
      <Route path="/board/:id" element={<BoardDetailComponent />} />
    </Routes>
  );
}

export default App;
