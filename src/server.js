const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// 사용자 정보 데이터베이스 (임시 데이터)
const users = [
  { username: 'user1', password: '00000000' },
  { username: 'user2', password: '11111111' },
  // 추가 사용자 정보 작성 가능
];

app.use(bodyParser.json());

// 로그인 요청 처리
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // 사용자 정보 데이터베이스에서 해당 사용자 정보 탐색
  const user = users.find(user => user.username === username && user.password === password);

  if (user) {
    // 사용자가 인증되었으면 성공 응답을 반환
    res.json({ success: true, message: 'Login successful' });
  } else {
    // 사용자 인증에 실패했을 경우 실패 응답을 반환
    res.status(401).json({ success: false, message: 'Invalid username or password' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
