<!-- src/views/KakaoJoinPage.vue -->
<template>
  <div class="join-container">
    <h2>추가 정보 입력</h2>
    <p>BOOKUS 서비스를 이용하려면 아래 정보를 입력해주세요.</p>

    <input v-model="nickname" placeholder="닉네임" />
    <input v-model="name" placeholder="이름" />
    <input v-model="phone_number" placeholder="전화번호 (예: 010-1234-5678)" />

    <button @click="submitJoin">회원가입 완료</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const nickname = ref('')
const name = ref('')
const phone_number = ref('')
const router = useRouter()

// 로그인 직후 kakao_token을 localStorage에 저장해둬야 함
const access_token = localStorage.getItem('kakao_token')

function submitJoin() {
  if (!nickname.value || !name.value || !phone_number.value) {
    alert("모든 값을 입력해주세요.")
    return
  }

  axios.post('http://localhost:8000/api/v1/accounts/kakao/login/', {
    access_token,
    nickname: nickname.value,
    name: name.value,
    phone_number: phone_number.value,
  }).then(res => {
    localStorage.setItem('access_token', res.data.access)
    localStorage.setItem('refresh_token', res.data.refresh)
    router.push('/')
  }).catch(err => {
    console.error('회원가입 실패:', err)
    alert('회원가입 실패')
  })
}
</script>

<style scoped>
.join-container {
  max-width: 400px;
  margin: 80px auto;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  border: 1px solid #ccc;
  border-radius: 12px;
}

input {
  padding: 10px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #ddd;
}

button {
  padding: 12px;
  background-color: #007BCE;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}
</style>
