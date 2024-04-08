import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignIn.css';

function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // 로그인 요청을 서버로 전송하는 함수
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then(response => response.json())
      .then(data => {
        // 로그인 성공 시, 받은 데이터를 처리하는 로직을 작성
        console.log('Login Successful:', data);
        // 예시: 로그인 성공 시 다른 페이지로 이동하거나 상태를 업데이트
      })
      .catch(error => {
        // 로그인 실패 시, 에러를 처리하는 로직을 작성
        console.error('Login Error:', error);
        // 예시: 에러 메시지를 사용자에게 표시하거나 다시 시도할 수 있도록 처리
      });
  };

  const handleForgotUsername = () => {
    // 아이디를 잊었을 때 수행되는 기능을 작성
    console.log('Forgot Username');
    // 예시: 아이디 찾기 모달을 열거나 새로운 페이지로 이동
    navigate('/findusername');
  };

  const handleForgotPassword = () => {
    // 비밀번호를 잊었을 때 수행되는 기능을 작성
    console.log('Forgot Password');
    // 예시: 비밀번호 재설정 페이지로 이동
    navigate('/findpassword');
  };

  const handleSignUp = () => {
    // 회원 가입 페이지로 이동하는 기능을 작성
    navigate('/signup');
    // 예시: 회원 가입 페이지로 이동
  };

  return (
      <div className="SignIn">
        <div className="rectangle">
          {/* 첫 번째 층 */}
          <div className="SI layer">
            <div className="signintext">Sign - In</div>
          </div>
          {/* 두 번째 층 */}
          <div className="SI layer">
            <span className="label">username</span>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          {/* 세 번째 층 */}
          <div className="SI layer">
            <span className="SignIn label">password</span>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {/* 네 번째 층 */}
          <div className="SI layer">
            <sinbutton onClick={handleLogin}>Sign - in</sinbutton>
          </div>
          {/* 다섯 번째 층 */}
          <div className="SI layer">
            <fgbutton onClick={handleForgotUsername}>Forgot Your Username?</fgbutton>
            <div>  |  </div>
            <fgbutton onClick={handleForgotPassword}>Forgot Your Password?</fgbutton>
          </div>
          {/* 여섯 번째 층 */}
          <div className="SI layer">
            <supbutton onClick={handleSignUp}>SIGN UP</supbutton>
          </div>
        </div>
      </div>
  );
}

export default SignIn;
