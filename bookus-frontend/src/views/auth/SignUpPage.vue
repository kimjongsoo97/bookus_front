<template>
  <div class="signup-page">
    <!-- 상단 -->
    <button class="back-btn" @click="router.back()">←</button>

    <h2 class="title">회원가입</h2>
    <p class="description">회원가입을 위해 사용자 정보를 적어주세요.</p>

    <!-- 폼 -->
    <form class="form" @submit.prevent="handleSubmit">
      <!-- 이메일 -->
      <div class="form-group with-button">
        <label for="email">이메일</label>
        <div class="input-wrapper">
          <input v-model="user.email" type="email" id="email" placeholder="이메일 입력" />
          <button type="button" class="sub-btn" @click="handleEmailCheck">중복확인</button>
        </div>
      </div>

      <!-- 닉네임 -->
      <div class="form-group with-button">
        <label for="nickname">닉네임</label>
        <div class="input-wrapper">
          <input v-model="user.nickname" type="text" id="nickname" placeholder="닉네임 입력" />
          <button type="button" class="sub-btn" @click="handleNicknameCheck">중복확인</button>
        </div>
      </div>

      <!-- 비밀번호 -->
      <div class="form-group">
        <label for="password">비밀번호</label>
        <div class="input-wrapper">
          <input v-model="user.password" type="password" id="password" placeholder="비밀번호 입력" />
          <button type="button" class="icon-btn">👁️</button>
        </div>
      </div>

      <!-- 비밀번호 확인 -->
      <div class="form-group">
        <label for="confirm_password">비밀번호 확인</label>
        <input v-model="user.confirm_password" type="password" id="confirm_password" placeholder="비밀번호 재입력" />
        <p v-if="passwordMismatch" class="error-msg">비밀번호가 일치하지 않습니다.</p>
      </div>

      <!-- 이름 -->
      <div class="form-group">
        <label for="name">이름</label>
        <input v-model="user.name" type="text" id="name" placeholder="이름 입력" />
      </div>

      <!-- 전화번호 -->
      <div class="form-group">
        <label for="phone">전화번호</label>
        <input v-model="user.phone_number" type="tel" id="phone" placeholder="010-0000-0000" />
      </div>

      <!-- 로그인 링크 -->
      <p class="login-link">
        이미 회원이신가요? <a href="/login">로그인하기 &gt;</a>
      </p>

      <!-- 에러 메시지 -->
      <p v-if="errorMessage" class="error-msg">{{ errorMessage }}</p>

      <!-- 회원가입 버튼 -->
      <button type="submit" class="submit-btn">회원가입</button>
    </form>
  </div>
</template>

<script setup >
import LoginAPI from '@/api/loginAPI';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';


const router = useRouter();

const user = reactive({
  email: '',
  password: '',
  confirm_password: '',
  nickname: '',
  name: '',
  phone_number: '',
});

const passwordMismatch = ref(false);
const emailChecked = ref(false);
const nicknameChecked = ref(false);
const errorMessage = ref('');

// 이메일 중복확인
const handleEmailCheck = async () => {
  try {
    const res = await LoginAPI.checkEmail({ email: user.email });

    if (res.data.available) {
      emailChecked.value = true;
      alert('사용 가능한 이메일입니다.');
    } else {
      alert('이미 사용 중인 이메일입니다.');
    }
  } catch (err) {
    alert('이메일 확인 중 오류가 발생했습니다.');
  }
};

// 닉네임 중복확인
const handleNicknameCheck = async () => {
  try {
    const res = await LoginAPI.checkNickname({ nickname: user.nickname });
    if (res.data.available) {
      nicknameChecked.value = true;
      alert('사용 가능한 닉네임입니다.');
    } else {
      alert('이미 사용 중인 닉네임입니다.');
    }
  } catch (err) {
    console.error(err);
    alert('닉네임 확인 중 오류가 발생했습니다.');
  }
};

// 회원가입 처리
const handleSubmit = async () => {
  passwordMismatch.value = user.password !== user.confirm_password;

  if (passwordMismatch.value) {
    return;
  }

  if (!emailChecked.value || !nicknameChecked.value) {
    alert('이메일과 닉네임 중복 확인을 먼저 해주세요.');
    return;
  }

  try {
    const payload = {
      email: user.email,
      password: user.password,
      confirm_password:user.confirm_password,
      nickname: user.nickname,
      name: user.name,
      phone_number: user.phone_number,
    };
    console.log(payload)
    await LoginAPI.register(payload);
    alert('회원가입이 완료되었습니다!');
    router.push('/welcome');
  } catch (err) {
    console.error(err);
    console.error("회원가입 실패 응답:", err.response.data); 
    errorMessage.value = err?.response?.data?.message || '회원가입에 실패했습니다.';
  }
};
</script>



<style scoped>
.signup-page {
  width: 100vw;
  max-width: 375px;
  margin: 0 auto;
  padding: 24px;
  font-family: 'Pretendard', sans-serif;
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
