<template>
  <div class="signup-page">
    <!-- 상단 -->
    <button class="back-btn">←</button>

    <h2 class="title">회원가입</h2>
    <p class="description">회원가입을 위해 사용자 정보를 적어주세요.</p>

    <!-- 폼 -->
    <form class="form">
      <!-- 이메일 -->
      <div class="form-group with-button">
        <label for="email">이메일</label>
        <div class="input-wrapper">
          <input type="email" id="email" placeholder="이메일 입력" />
          <button type="button" class="sub-btn">중복확인</button>
        </div>
      </div>

      <!-- 닉네임 -->
      <div class="form-group with-button">
        <label for="nickname">닉네임</label>
        <div class="input-wrapper">
          <input type="text" id="nickname" placeholder="닉네임 입력" />
          <button type="button" class="sub-btn">중복확인</button>
        </div>
      </div>

      <!-- 비밀번호 -->
      <div class="form-group">
        <label for="password">비밀번호</label>
        <div class="input-wrapper">
          <input type="password" id="password" placeholder="비밀번호 입력" />
          <button type="button" class="icon-btn">👁️</button>
        </div>
      </div>

      <!-- 비밀번호 확인 -->
      <div class="form-group">
        <label for="passwordConfirm">비밀번호 확인</label>
        <input type="password" id="passwordConfirm" placeholder="비밀번호 재입력" />
      </div>

      <!-- 이름 -->
      <div class="form-group">
        <label for="name">이름</label>
        <input type="text" id="name" placeholder="이름 입력" />
      </div>

      <!-- 전화번호 -->
      <div class="form-group">
        <label for="phone">전화번호</label>
        <input type="tel" id="phone" placeholder="010-0000-0000" />
      </div>

      <!-- 로그인 링크 -->
      <p class="login-link">
        이미 회원이신가요? <a href="#">로그인하기 &gt;</a>
      </p>

      <!-- 회원가입 버튼 -->
      <button type="submit" class="submit-btn">회원가입</button>
    </form>
  </div>
</template>

<script setup lang="ts">
// 필요한 상태나 기능은 여기서 추가
</script>

<style scoped>
.signup-page {
  width: 100vw;
  max-width: 375px;
  margin: 0 auto;
  padding: 24px;
  font-family: 'Noto Sans KR', sans-serif;
  background: #fff;
  color: #1a1a1a;
  box-sizing: border-box;
}

.back-btn {
  font-size: 20px;
  background: none;
  border: none;
  margin-bottom: 16px;
  cursor: pointer;
}

.title {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 4px;
}

.description {
  font-size: 14px;
  margin-bottom: 24px;
  color: #666;
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

.with-button .input-wrapper {
  display: flex;
  gap: 8px;
}

.input-wrapper input {
  flex: 1;
}

.sub-btn {
  background-color: #1a1a2f;
  color: white;
  padding: 0 14px;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  cursor: pointer;
}

.icon-btn {
  background: none;
  border: none;
  font-size: 16px;
  padding: 0 8px;
  cursor: pointer;
}

.login-link {
  text-align: center;
  font-size: 13px;
  margin: 20px 0 8px;
}

.login-link a {
  color: #007bce;
  text-decoration: none;
  font-weight: bold;
}

.submit-btn {
  width: 100%;
  padding: 14px 0;
  font-size: 16px;
  font-weight: bold;
  background-color: #00a3ff;
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
}
</style>
