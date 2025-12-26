<template>
  <div class="login-page">
    <!-- 상단 -->
    <button class="back-btn">←</button>

    <h2 class="title">북어스에 오신 것을 환영합니다!</h2>
    <p class="subtitle">로그인하고 모든 컨텐츠를 즐겨보세요.</p>

    <!-- 폼 -->
    <form class="form" @submit.prevent="handleLogin">
      <!-- 이메일 -->
      <div class="form-group">
        <label for="email">이메일</label>
        <input v-model="user.email" type="email" id="email" placeholder="이메일 입력" />
      </div>

      <!-- 비밀번호 -->
      <div class="form-group">
        <label for="password">비밀번호</label>
        <div class="input-wrapper">
          <input v-model="user.password" type="password" id="password" placeholder="비밀번호 입력" />
        </div>
      </div>

      <!-- 에러 메시지 -->
      <p v-if="errorMessage" style="color: red">{{ errorMessage }}</p>

      <!-- 링크 -->
      <div class="link-section">
        <p>
          북어스가 처음이신가요?
          <a href="/signup">회원가입하기 &gt;</a>
        </p>
      </div>

      <!-- 로그인 버튼 -->
      <button type="submit" class="login-btn">로그인</button>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useLoginStore } from '@/stores/login'
const router = useRouter();
const errorMessage = ref('');

const auth=useLoginStore();
const user=reactive({
    username:'',
    password:'',
})
const handleLogin = async () => {
  console.log(user)
  try {
    await auth.login(user)
    router.push('/')
  } catch (error) {
    console.error('로그인 실패:', error)
  }
  }

</script>

<style scoped>
.login-page {
  width: 100vw;
  max-width: 375px;
  margin: 0 auto;
  padding: 24px;
  box-sizing: border-box;
  font-family: 'Pretendard', sans-serif;
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
