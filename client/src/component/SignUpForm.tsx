import React, { useState } from 'react';
import axios from 'axios';
import styles from '../styles/SignUp.module.css';
import SUpCenterFrame from './SUpCenterFrame';
import SUpInnerFrame from './SUpInnerFrame';

interface FormData {
    username: string;
    password: string;
    nickname: string;
    email: string;
}

const SignUpForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        username: '',
        password: '',
        nickname: '',
        email: ''
    });

    const handleSubmit = async () => {
        try {
            await axios.post('/api/signup', formData);
            alert('회원가입이 완료되었습니다.');
        } catch (error) {
            console.error('Error during sign-up:', error);
            alert('회원가입에 실패했습니다.');
        }
    };

    return (
        <div className={styles.App}>
            <SUpCenterFrame to="/signin" />
            <SUpInnerFrame
                formData={formData}
                onChange={(key, value) => setFormData({ ...formData, [key]: value })}
                onSubmit={handleSubmit}
            />
        </div>
    );
}

export default SignUpForm;