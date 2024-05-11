import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 import
import styles from '../styles/SignUp.module.css';
import SUpInnerFrame from './SUpInnerFrame';
import SInCenterFrame from './SUpCenterFrame';

const SignUpForm: React.FC = () => {
    const [formData, setFormData] = React.useState({
        username: '',
        password: '',
        nickname: '',
        email: ''
    });
    const navigate = useNavigate(); // useNavigate 훅 사용

    const handleChange = (key: string, value: string) => {
        setFormData(prevState => ({
            ...prevState,
            [key]: value
        }));
    };

    const handleSubmit = async () => {
        try {
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