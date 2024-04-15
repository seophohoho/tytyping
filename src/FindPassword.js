import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FindPassword.css';
import './style.css';

function FindPassword() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  
  const handleSearch = () => {
    // 비밀번호를 잊었을 때 수행되는 함수
    console.log('Forgot Password');

    // 여기에는 비밀번호를 잊었을 때의 로직을 추가할 수 있습니다.
    // 사용자가 입력한 username과 email을 이용하여 서버에 요청을 보내고,
    // 해당하는 유저의 이메일로 비밀번호 초기화 링크를 전송하는 로직을 작성합니다.
    // 이 예시에서는 비밀번호 초기화 사이트인 ResetPassword.js로 이동하는 것으로 대체합니다.

    // 예시: username과 email을 이용하여 ResetPassword 페이지로 이동
    navigate(`/resetpassword?username=${username}&email=${email}`);
  };

  const handleBackToSignIn = () => {
    // 로그인 페이지로 돌아가는 함수
    navigate('/signin');
  };

  return (
    <div className="background">
      <div className="rectangle">
        <div className="layer">
          <div className="password-text">Forgot Your password?</div>
        </div>
        <div className="layer">
          <div className="explain-text">Please enter your username && email</div>
        </div>
        <div className="layer">
          <span className="label">Username</span>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="layer">
          <span className="label">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
       <div className="layer">
         <button1 onClick={handleSearch}>OK</button1>
        </div>
        <div className="layer">
          <button3 onClick={handleBackToSignIn}>Sign-In</button3> {/* 로그인 페이지로 이동하는 버튼 추가 */}
        </div>
      </div>
    </div>
  );
}

export default FindPassword;
