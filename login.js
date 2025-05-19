document.getElementById('login-btn').addEventListener('click', async () => {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!email || !password) {
    alert("이메일과 비밀번호를 입력해주세요.");
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const result = await response.json();

    // ✅ 바로 여기에서 성공/실패 판단
    if (response.ok) {
      // 로그인 성공 시, main.html로 이동
      window.location.href = 'main.html';
    } else {
      // 로그인 실패 메시지 출력
      alert(result.message);
    }
  } catch (error) {
    console.error('서버 연결 실패:', error);
    alert("⚠️ 서버 연결에 실패했습니다.");
  }
});
