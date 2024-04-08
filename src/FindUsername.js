import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function FindUsername() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [searched, setSearched] = useState(false);
  const navigate = useNavigate(); // useNavigate 훅 추가

  const handleSearch = () => {
    // 이메일에 대한 Username 검색하는 함수
    // fetch 또는 서버와의 통신 등으로 이메일을 기준으로 Username 검색

    // 예시: 서버로 요청을 보내고 Username을 받아옴
    const foundUsername = 'exampleUsername'; // 서버로부터 받은 Username

    setUsername(foundUsername);
    setSearched(true);
  };

  const handleBackToSignIn = () => {
    // 로그인 페이지로 돌아가는 함수
    navigate('/signin');
  };

  return (
    <div className="FindUsername">
      <div className="rectangle">
      {/* 첫 번째 층 */}
      <div className="layer">
        <div className="username-text">Forgot Your username?</div>
      </div>
      <div className="layer">
        <div className="explain-text">Please enter your nickname && password</div>
      </div>
      <div className="layer">
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      </div>
      <div>
      {searched && (
        <p>Your Username: {username}</p>
      )}
      </div>
      <div>
      <button onClick={handleSearch}>Ok</button>
      </div>
      <button onClick={handleBackToSignIn}>Back to Sign In</button> {/* 로그인 페이지로 이동하는 버튼 추가 */}
    </div>
    </div>
  );
}

export default FindUsername;
