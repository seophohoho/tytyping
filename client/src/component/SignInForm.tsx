import React, { useState } from 'react';
import axios from 'axios';
import SInCenterFrame from './SInCenterFrame';
import SInInnerFrame from './SInInnerFrame';
import { Link } from 'react-router-dom';
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

    const handleSubmit = async () => {
        try {
            await axios.post('http://localhost:8000/api/sign-in', formData); // 수정: URL 경로 변경
            alert('로그인이 완료되었습니다.');
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
