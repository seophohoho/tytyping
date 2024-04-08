import React, { useState } from 'react';

function FindPassword() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [foundUserInfo, setFoundUserInfo] = useState(null);
  const [error, setError] = useState('');

  const handleFindPassword = () => {
    // 회원 데이터베이스에서 회원 정보 찾는 로직
    fetch('/find-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          setError(data.error);
        } else {
          setFoundUserInfo(data);
        }
      })
      .catch(error => {
        setError('An error occurred while finding the password.');
        console.error('Find Password Error:', error);
      });
  };

  return (
    <div>
      <h2>Find Password</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleFindPassword}>Find Password</button>
      {error && <p>{error}</p>}
      {foundUserInfo && (
        <div>
          <p>Username: {foundUserInfo.username}</p>
          <p>Email: {foundUserInfo.email}</p>
          {/* 추가적인 정보 표시 */}
        </div>
      )}
    </div>
  );
}

export default FindPassword;
