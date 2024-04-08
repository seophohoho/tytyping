import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 수정된 부분
import './SignUp.css';

function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate(); // 수정된 부분

  const handleSignUp = () => {
    // 회원가입 요청을 서버로 전송하는 함수
    fetch('/SignUp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, nickname, email }),
    })
      .then(response => response.json())
      .then(data => {
        // 회원가입 성공 시, 받은 데이터를 처리하는 로직을 작성
        console.log('SignUp Successful:', data);
        // 예시: 회원가입 성공 메시지를 표시하거나 다른 페이지로 이동
        navigate('/'); // 수정된 부분
      })
      .catch(error => {
        // 회원가입 실패 시, 에러를 처리하는 로직을 작성
        console.error('SignUp Error:', error);
        // 예시: 에러 메시지를 사용자에게 표시하거나 다시 시도할 수 있도록 처리
      });
  };

  return (
    <div className="SignUp">
      <div className="rectangle">
        <div className="layer">
          <div className="signup-text1">Sign - Up</div>
        </div>
        <div className="layer">
          <span className="label">username</span>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="layer">
          <span className="label">password</span>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="layer">
          <span className="label">nickname</span>
          <input
            type="text"
            placeholder="Nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>
        <div className="layer">
          <span className="label">email</span>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="layer">
          <button onClick={handleSignUp}>Sign Up</button>
        </div>
        <div className="layer">
          <div className="signup-text2">Sign-In</div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
