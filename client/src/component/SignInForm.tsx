import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 import
import SInCenterFrame from './SInCenterFrame';
import SInInnerFrame from './SInInnerFrame';
import styles from '../styles/SignUp.module.css';

interface FormData {
    username: string;
    password: string;
}

const SignInForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        username: '',
        password: ''
    });
    const navigate = useNavigate(); // useNavigate 훅 사용

    const handleSubmit = async () => {
        try {
            await axios.post('http://localhost:8000/api/sign-in', formData);
            alert('로그인이 완료되었습니다.');
            navigate('/main'); // 로그인 성공 시 메인 페이지로 이동
        } catch (error) {
            console.error('Error during sign-in:', error);
            alert('로그인에 실패했습니다.');
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
