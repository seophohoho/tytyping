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
import BoardEditComponent from './component/boardComponent/BoardEditComponent';

function App() {
  return (
    <Routes>
      <Route path="/main" element={<Main />} />
      <Route path="/signup" element={<SignUpForm />} />
      <Route path="/" element={<SignInForm />} />
      <Route path="/find-username" element={<FindUsernameForm />} />
      <Route path="/find-password" element={<FindPasswordForm />} />
      <Route path="/reset-password" element={<ResetPasswordForm />} />
      <Route path="/game" element={<Game />} />
      <Route path="/board" element={<Board />} />
      <Route path="/board/:id" element={<BoardDetailComponent />} />
      <Route path="/board/edit/:id" element={<BoardEditComponent />} />
    </Routes>
  );
}

export default App;
