import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/OutFrame.module.css';
import SUpInnerFrame from './SUpInnerFrame';
import SInCenterFrame from './SUpCenterFrame';

const SignUpForm: React.FC = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        nickname: '',
        email: ''
    });
    const navigate = useNavigate();

    const handleChange = (key: string, value: string) => {
        setFormData(prevState => ({
            ...prevState,
            [key]: value
        }));
    };

    const handleSubmit = async () => {
        try {
            // 입력값이 비어 있는지 확인하고 경고 메시지 표시
            if (!formData.username) {
                alert('아이디를 입력해야 합니다.');
                return;
            }
            if (!formData.password) {
                alert('비밀번호를 입력해야 합니다.');
                return;
            }
            if (!formData.nickname) {
                alert('닉네임을 입력해야 합니다.');
                return;
            }
            if (!formData.email) {
                alert('이메일을 입력해야 합니다.');
                return;
            }

            // 1. 아이디 최대 길이 제한 설정
            if (formData.username.length > 16) {
                alert('아이디는 16자 이내로 입력해주세요.');
                return;
            }

            // 2. 비밀번호 규칙 확인
            const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()_+]).{8,16}$/;
            if (!passwordRegex.test(formData.password)) {
                alert('비밀번호는 대소문자, 특수문자를 포함한 8~16자여야 합니다.');
                return;
            }

            // 3. 닉네임 최대 길이 제한 설정
            if (formData.nickname.length > 10) {
                alert('닉네임은 10자 이내로 입력해주세요.');
                return;
            }

            // 4. 이메일 형식 검사
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                alert('올바른 이메일 형식이 아닙니다.');
                return;
            }

            // 5. 특정 도메인(@gmail.com 또는 @naver.com)만 허용
            if (!formData.email.endsWith('@gmail.com') && !formData.email.endsWith('@naver.com')) {
                alert('Gmail 또는 Naver 이메일만 허용됩니다.');
                return;
            }

            // 6. 회원가입 요청
            const response = await axios.post('http://localhost:8000/api/sign-up', formData);
            if (response.status === 201) {
                alert('회원가입이 완료되었습니다.');
                navigate('/signin');
            }
        } catch (error) {
            console.error('Error during sign-up:', error);
            alert('회원가입에 실패했습니다.');
        }
    };

    return (
        <div className={styles.App}>
            <SInCenterFrame to="/signin" />
            <SUpInnerFrame formData={formData} onChange={handleChange} onSubmit={handleSubmit} />
        </div>
    );
}

export default SignUpForm;