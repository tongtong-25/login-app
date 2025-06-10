document.getElementById('signup-btn').addEventListener('click', async () => {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const confirm = document.getElementById('confirm-password').value.trim();

  if (!email || !password || !confirm) {
    alert("모든 칸을 입력해주세요.");
    return;
  }

  if (password !== confirm) {
    alert("비밀번호가 일치하지 않습니다.");
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
      alert(result.message);
      window.location.href = 'login.html'; // ✅ 로그인 화면으로 이동
    } else {
      alert(result.message); // 실패 메시지 출력
    }

  } catch (error) {
    alert('⚠️ 서버 연결에 실패했습니다.');
    console.error(error);
  }
});
