<template>
  <div class="login-page">
    <!-- 상단 -->
    <button class="back-btn">←</button>

    <h2 class="title">북어스에 오신 것을 환영합니다!</h2>
    <p class="subtitle">로그인하고 모든 컨텐츠를 즐겨보세요.</p>

    <!-- 폼 -->
    <form class="form">
      <!-- 이메일 -->
      <div class="form-group">
        <label for="email">이메일</label>
        <input type="email" id="email" placeholder="이메일 입력" />
      </div>

      <!-- 비밀번호 -->
      <div class="form-group">
        <label for="password">비밀번호</label>
        <div class="input-wrapper">
          <input type="password" id="password" placeholder="비밀번호 입력" />
          <button type="button" class="icon-btn">👁️</button>
        </div>
      </div>

      <!-- 링크 -->
      <div class="link-section">
        <p>
          이미 회원아이디/비밀번호를 잊어버리셨나요?
          <a href="#">아이디/비밀번호 찾기 &gt;</a>
        </p>
        <p>
          북어스가 처음이신가요?
          <a href="#">회원가입하기 &gt;</a>
        </p>
      </div>

      <!-- 로그인 버튼 -->
      <button type="submit" class="login-btn">로그인</button>
    </form>
  </div>
</template>

<script setup lang="ts">
// 추후 상태 관리, 로그인 처리 등 가능
</script>

<style scoped>
.login-page {
  width: 100vw;
  max-width: 375px;
  margin: 0 auto;
  padding: 24px;
  box-sizing: border-box;
  font-family: 'Noto Sans KR', sans-serif;
  background-color: #fff;
}

.back-btn {
  font-size: 20px;
  background: none;
  border: none;
  cursor: pointer;
  margin-bottom: 16px;
}

.title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 4px;
}

.subtitle {
  font-size: 14px;
  color: #666;
  margin-bottom: 24px;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  font-size: 14px;
  margin-bottom: 6px;
}

.form-group input {
  width: 100%;
  padding: 12px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-sizing: border-box;
}

.input-wrapper {
  position: relative;
}

.input-wrapper input {
  width: 100%;
  padding-right: 40px;
}

.icon-btn {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background: none;
  font-size: 16px;
  cursor: pointer;
}

.link-section {
  margin-top: 12px;
  font-size: 13px;
  color: #555;
}

.link-section a {
  color: #007bce;
  font-weight: bold;
  text-decoration: none;
}

.login-btn {
  width: 100%;
  padding: 14px 0;
  margin-top: 24px;
  font-size: 16px;
  font-weight: bold;
  background-color: #00a3ff;
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
}
</style>
