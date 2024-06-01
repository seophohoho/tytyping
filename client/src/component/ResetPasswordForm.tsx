import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/OutFrame.module.css';
import RPCenterFrame from './RPCenterFrame';
import RPInnerFrame from './RPInnerFrame';

const ResetPasswordForm: React.FC = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState(''); // 이메일 상태 추가
  const navigate = useNavigate();

  useEffect(() => {
    // 로컬 스토리지에서 이메일 가져오기
    const storedEmail = localStorage.getItem('resetEmail');
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      alert('이메일 정보가 없습니다. 다시 시도해주세요.');
      navigate('/find-password'); // 이메일 입력 페이지로 이동
    }
  }, [navigate]);

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()_+]).{8,16}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async () => {
    try {
      if (newPassword !== confirmPassword) {
        alert('새 비밀번호와 확인용 비밀번호가 일치하지 않습니다.');
        return;
      }

      if (!validatePassword(newPassword)) {
        alert('비밀번호는 대소문자, 숫자, 특수문자를 포함한 8~16자여야 합니다.');
        return;
      }

      // 서버로 새 비밀번호와 이메일 전송
      const response = await axios.post('http://localhost:8000/api/reset-password', { email, newPassword });
      if (response.status === 200) {
        alert('비밀번호를 성공적으로 변경했습니다.');
        navigate('/signin');
      }
    } catch (error) {
      console.error('Error during password reset:', error);
      alert('비밀번호 초기화에 실패했습니다.');
    }
  };

  return (
    <div className={styles.container}>
      <RPCenterFrame />
      <RPInnerFrame
        newPassword={newPassword}
        confirmPassword={confirmPassword}
        onNewPasswordChange={handleNewPasswordChange}
        onConfirmPasswordChange={handleConfirmPasswordChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default ResetPasswordForm;
