<template>
  <div class="welcome-page">
    <!-- 뒤로가기 -->
    <button class="back-btn">←</button>

    <!-- 일러스트 -->
    <img src="@/assets/welcome-fish.png" alt="Welcome" class="illustration" />

    <!-- 텍스트 -->
    <h2 class="title">반가워요!</h2>
    <p class="description">회원가입이 완료되었습니다.<br />북어스를 즐겨보세요.</p>

    <!-- 시작하기 버튼 -->
    <button class="start-btn" @click="router.push('/login')">로그인 하러가기</button>

  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router=useRouter();

</script>

<style scoped>
.welcome-page {
  width: 100vw;
  max-width: 375px;
  margin: 0 auto;
  padding: 24px;
  text-align: center;
  font-family: 'Noto Sans KR', sans-serif;
  background-color: #fff;
  color: #1a1a1a;
  box-sizing: border-box;
  position: relative;
}

.back-btn {
  position: absolute;
  top: 24px;
  left: 16px;
  font-size: 20px;
  border: none;
  background: none;
  cursor: pointer;
}

.illustration {
  margin-top: 60px;
  width: 200px;
  height: auto;
}

.title {
  font-size: 20px;
  font-weight: bold;
  color: #1a1a2f;
  margin-top: 24px;
}

.description {
  font-size: 14px;
  color: #666;
  margin-top: 8px;
  line-height: 1.4;
}

.start-btn {
  margin-top: 40px;
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
