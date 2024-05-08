import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import SignUpForm from '../component/SignUp';

function SignUpContainer() {
    const navigate = useNavigate();

    const handleSubmit = async (formData: any) => {
        try {
            const response = await fetch('/api/sign-up', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            console.log(data.message); // Handle success or error message
            navigate('/success'); // 성공 페이지로 이동
        } catch (error) {
            console.error('Error during sign-up:', error);
        }
    };

    return (
        <Router>
            <Routes>
                <Route path="/signup" element={<SignUpForm onSubmit={handleSubmit} />} />
                {/* 예: 회원가입 성공 시 보여줄 페이지 */}
                <Route path="/success" element={<div>회원가입이 성공적으로 완료되었습니다.</div>} />
            </Routes>
        </Router>
    );
}

export default SignUpContainer;
