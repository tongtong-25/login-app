const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const USERS_FILE = './users.json';

app.post('/signup', (req, res) => {
  const { email, password } = req.body;

  let users = [];
  if (fs.existsSync(USERS_FILE)) {
    try {
      const data = fs.readFileSync(USERS_FILE, 'utf-8');
      users = JSON.parse(data);
    } catch (err) {
      console.error('❌ JSON 읽기 오류:', err);
      users = [];
    }
  }

  if (users.find(u => u.email === email)) {
    return res.status(400).json({ message: '이미 가입된 이메일입니다.' });
  }

  users.push({ email, password });

  // 확인 로그
  console.log('💾 저장 직전 users:', users);

  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
    console.log(`✅ 저장 성공!`);
    res.json({ message: `${email}님, 회원가입 완료!` });
  } catch (error) {
    console.error('❌ 저장 실패:', error);
    res.status(500).json({ message: '저장 실패' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 서버 실행 중: http://localhost:${PORT}`);
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // 1. users.json 읽기
  if (!fs.existsSync(USERS_FILE)) {
    return res.status(404).json({ message: '사용자 정보가 없습니다.' });
  }

  const data = fs.readFileSync(USERS_FILE, 'utf-8');
  const users = JSON.parse(data);

  // 2. 사용자 찾기
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    res.json({ message: `${email}님, 로그인 성공!` });
  } else {
    res.status(401).json({ message: '이메일 또는 비밀번호가 틀렸습니다.' });
  }
});