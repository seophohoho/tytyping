import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/OutFrame.module.css';
import FPCenterFrame from './FPCenterFrame';
import FPInnerFrame from './FPInnerFrame';

function FindPasswordForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      // 이메일 형식 검사
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('올바른 이메일 형식이 아닙니다.');
        return;
      }

      // 서버로 유저네임과 이메일 전송
      const response = await axios.post('http://localhost:8000/api/forgot-password', { username, email });
      if (response.status === 200) {
        alert('임시 비밀번호를 이메일로 전송했습니다.');
        navigate('/signin');
      }
    } catch (error) {
      console.error('Error during forgot password:', error);
      alert('비밀번호 찾기에 실패했습니다.');
    }
  };

  return (
    <div className={styles.container}>
      <FPCenterFrame />
      <FPInnerFrame
        username={username}
        email={email}
        onUsernameChange={handleUsernameChange}
        onEmailChange={handleEmailChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default FindPasswordForm;
