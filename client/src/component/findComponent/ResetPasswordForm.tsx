import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/OutFrame.module.css';
import RPCenterFrame from './RPCenterFrame';
import RPInnerFrame from './RPInnerFrame';

function ResetPasswordForm() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      if (newPassword !== confirmPassword) {
        alert('새 비밀번호와 확인용 비밀번호가 일치하지 않습니다.');
        return;
      }

      // 서버로 새 비밀번호 전송
      const response = await axios.post('http://localhost:8000/api/reset-password', { newPassword });
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
}

export default ResetPasswordForm;
