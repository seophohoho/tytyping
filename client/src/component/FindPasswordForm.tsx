import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/OutFrame.module.css';
import FPCenterFrame from './FPCenterFrame';
import FPInnerFrame from './FPInnerFrame';

const FindPasswordForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [isVerificationChecked, setIsVerificationChecked] = useState(false);
  const navigate = useNavigate();

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleVerificationCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVerificationCode(e.target.value);
  };

  const handleCheck = async () => {
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

      const response = await axios.post('http://localhost:8000/api/forgot-password/send-code', { username, email });
      if (response.status === 200) {
        alert('인증 코드가 이메일로 전송되었습니다.');
        localStorage.setItem('resetEmail', email);
        setIsVerificationSent(true);
        setIsVerificationChecked(true);
      }
    } catch (error) {
      console.error('Error during verification:', error);
      alert('사용자 확인에 실패했습니다.');
    }
  };

  const handleConfirm = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/forgot-password/verify-code', {
        username,
        email,
        code: verificationCode,
      });
      if (response.status === 200) {
        alert('인증이 완료되었습니다. 비밀번호를 초기화합니다.');
        navigate('/reset-password');
      }
    } catch (error) {
      console.error('Error during verification confirmation:', error);
      alert('인증에 실패했습니다.');
    }
  };

  return (
    <div className={styles.container}>
      <FPCenterFrame />
      <FPInnerFrame
        username={username}
        email={email}
        verificationCode={verificationCode}
        onUsernameChange={handleUsernameChange}
        onEmailChange={handleEmailChange}
        onVerificationCodeChange={handleVerificationCodeChange}
        onCheck={handleCheck}
        onConfirm={handleConfirm}
        isVerificationSent={isVerificationSent}
        isVerificationChecked={isVerificationChecked}
      />
    </div>
  );
};

export default FindPasswordForm;
