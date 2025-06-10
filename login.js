document.getElementById('login-btn').addEventListener('click', async () => {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  // 빈 칸 확인
  if (!email || !password) {
    alert("이메일과 비밀번호를 모두 입력해주세요.");
    return;
  }

  try {
    const response = await fetch('https://login-server-1-rx6d.onrender.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const result = await response.json();

    if (response.ok) {
      // ✅ 로그인 성공 시 이메일을 localStorage에 저장
      localStorage.setItem('userEmail', email);

      // ✅ main 페이지로 이동
      window.location.href = 'main.html';
    } else {
      alert(result.message);
    }
  } catch (error) {
    alert('⚠️ 서버 연결에 실패했습니다.');
    console.error(error);
  }
});
