import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import SInCenterFrame from './signComponent/SInCenterFrame';
import SInInnerFrame from './signComponent/SInInnerFrame';
import styles from '../styles/OutFrame.module.css';
import { serverUrl } from '../config/serverUrl';

interface FormData {
  username: string;
  password: string;
}

function SignInForm() {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      if (!formData.username) {
        alert('아이디를 입력해야 합니다.');
        return;
      }
      if (!formData.password) {
        alert('비밀번호를 입력해야 합니다.');
        return;
      }

      await axios.post(`${serverUrl}/api/sign-in`, formData);
      alert('로그인이 완료되었습니다.');
      localStorage.setItem('userData', formData.username);
      navigate('/main');
    } catch (error) {
      console.error('Error during sign-in:', error);
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.status === 404) {
        alert('해당하는 사용자를 찾을 수 없습니다.');
      } else if (axiosError.response && axiosError.response.status === 401) {
        alert('비밀번호가 올바르지 않습니다.');
      } else {
        alert('로그인에 실패했습니다.');
      }
    }
  };

  return (
    <div className={styles.App}>
      <SInCenterFrame to="/signup" />
      <SInInnerFrame
        formData={formData}
        onChange={(key, value) => setFormData({ ...formData, [key]: value })}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default SignInForm;
