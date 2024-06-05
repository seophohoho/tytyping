import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/OutFrame.module.css';
import FUCenterFrame from './FUCenterFrame';
import FUInnerFrame from './FUInnerFrame';

const FindUsernameForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

      // 특정 도메인만 허용
      if (!email.endsWith('@gmail.com') && !email.endsWith('@naver.com')) {
        alert('Gmail 또는 Naver 이메일만 허용됩니다.');
        return;
      }

      // 서버로 이메일 전송
      const response = await axios.post('http://localhost:8000/api/forgot-username', { email });
      if (response.status === 200) {
        alert('이메일로 아이디를 전송했습니다.');
        navigate('/signin');
      }
    } catch (error) {
      console.error('Error during forgot username:', error);
      alert('아이디 찾기에 실패했습니다.');
    }
  };

  return (
    <div className={styles.container}>
      <FUCenterFrame />
      <FUInnerFrame email={email} onChange={handleChange} onSubmit={handleSubmit} />
    </div>
  );
};

export default FindUsernameForm;
