import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ResetPassword.css';
import './style.css';

function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();

  // URL 쿼리 파라미터에서 username과 email을 가져옴
  const queryParams = new URLSearchParams(location.search);
  const username = queryParams.get('username');
  const email = queryParams.get('email');

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const useLocation = () => {

  }

  const handleResetPassword = () => {
    // 새 비밀번호와 재확인 비밀번호가 일치하는지 확인
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match. Please try again.');
      return;
    }

    // 여기에는 비밀번호 초기화 및 변경 로직을 추가할 수 있습니다.
    // 새 비밀번호를 서버로 전송하고, 서버에서 해당 유저의 비밀번호를 업데이트하는 등의 작업을 수행합니다.
    // 이 예시에서는 비밀번호 초기화 후 로그인 페이지로 이동하는 것으로 대체합니다.

    // 비밀번호 초기화가 완료되면 로그인 페이지로 이동
  };

  const handleBackToSignIn = () => {
    // 로그인 페이지로 돌아가는 함수
    navigate('/signin');
  };
  
return (
  <div className="background">
    <div className="rectangle">
      <div className="layer">
        <div className="username-text">Reset Your Password</div>
      </div>
      <div className="layer">
       <div className="explain-text">Please enter your new password</div>
      </div>
      <div>
        <span className="label">New Password:</span>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <div>
        <span className="label">Confirm Password:</span>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <div className="layer">
       <button3 onClick={handleBackToSignIn}>OK</button3> {/* 로그인 페이지로 이동하는 버튼 추가 */}
      </div>
    </div>
  </div>
);
}
export default ResetPassword;
