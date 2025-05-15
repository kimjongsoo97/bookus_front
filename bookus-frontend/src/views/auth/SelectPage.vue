<template>
  <div class="main-page">
    <img src="@/assets/bookus-logo.png" alt="Bookus Logo" class="logo" />

    <p class="subtitle">함께 만들어가는 독서생활</p>
    <h1 class="title">
      BOOK<span class="us">US</span>
    </h1>

    <div class="button-group">
      <button class="btn signup">회원가입</button>
      <button class="btn login">로그인</button>
      <button class="btn kakao">
        <!-- <img src="@/assets/kakao-icon.png" class="icon" /> -->
        카카오 로그인
      </button>
    </div>

    <div class="home-indicator"></div>
  </div>
</template>

<script setup lang="ts">
// 별도 로직 없음
</script>

<style scoped>
.main-page {
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  font-family: 'Noto Sans KR', sans-serif;
  color: #222;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 80px;
  position: relative;
  box-sizing: border-box;
}

.logo {
  width: 96px;
  height: 96px;
  margin-bottom: 24px;
}

.subtitle {
  font-size: 16px;
  margin-bottom: 4px;
  color: #007BCE;
}

.title {
  font-size: 28px;
  font-weight: 800;
  letter-spacing: 1px;
  margin-bottom: 40px;
  color: #007BCE;
}

.title .us {
  color: #f7941e;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 80%;
  max-width: 300px;
  margin-top: auto;
  margin-bottom: 80px;
}

.btn {
  width: 100%;
  padding: 14px 0;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}

.signup {
  background-color: #f7941e;
  color: white;
}

.login {
  background-color: #00a3ff;
  color: white;
}

.kakao {
  background-color: #fee500;
  color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.icon {
  width: 20px;
  height: 20px;
}

.home-indicator {
  position: absolute;
  bottom: 20px;
  width: 134px;
  height: 5px;
  background-color: black;
  border-radius: 4px;
  opacity: 0.2;
}
</style>
