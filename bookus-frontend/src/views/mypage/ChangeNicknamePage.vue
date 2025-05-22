<template>
  <div class="nickname-edit-page">
    <HeaderComponent title="닉네임 변경" />

    <div class="form">
      <label>새 닉네임</label>
      <div class="input-group">
        <input
          v-model="nickname"
          type="text"
          placeholder="변경할 닉네임을 입력하세요"
        />
        <button class="check-btn" @click="checkDuplicate">중복 확인</button>
      </div>
      <p v-if="duplicateMessage" :class="{ error: isDuplicate, success: !isDuplicate }">
        {{ duplicateMessage }}
      </p>

      <button
        class="submit-btn"
        :disabled="!nickname || isDuplicate"
        @click="submitNickname"
      >
        닉네임 변경하기
      </button>
    </div>

    <BottomNav />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import HeaderComponent from '@/components/common/HeaderComponent.vue'
import BottomNav from '@/components/common/BottomNav.vue'
import LoginAPI from '@/api/loginAPI'
import { useLoginStore } from '@/stores/login'
const nickname = ref('')
const duplicateMessage = ref('')
const isDuplicate = ref(true) // 초기엔 중복 확인 전이므로 true로 설정
const router = useRouter()
const loginStore=useLoginStore();
async function checkDuplicate() {
  if (!nickname.value) {
    duplicateMessage.value = '닉네임을 입력해주세요.'
    isDuplicate.value = true
    return
  }

  try {
    const res = await LoginAPI.checkNickname(nickname.value)
    loginStore.state.user.nickname = nickname.value

    localStorage.setItem('auth', JSON.stringify(loginStore.state))
    if (res.data.available) {
      duplicateMessage.value = '사용 가능한 닉네임입니다.'
      isDuplicate.value = false
    } else {
      duplicateMessage.value = '이미 사용 중인 닉네임입니다.'
      isDuplicate.value = true
    }
  } catch (err) {
    duplicateMessage.value = '중복 확인에 실패했습니다.'
    isDuplicate.value = true
    console.error(err)
  }
}

async function submitNickname() {
  try {
    await LoginAPI.updateNickname(nickname.value)
    alert('닉네임이 성공적으로 변경되었습니다.')
    router.push('/mypage') // 원하는 경로로 변경
  } catch (err) {
    alert('닉네임 변경에 실패했습니다.')
    console.error(err)
  }
}
</script>

<style scoped>
.nickname-edit-page {
  max-width: 375px;
  margin: 0 auto;
  padding: 16px;
  font-family: "Pretendard", sans-serif;
}

.form {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

label {
  font-weight: bold;
  font-size: 14px;
}

.input-group {
  display: flex;
  gap: 8px;
}

input {
  flex: 1;
  padding: 10px;
  border: 1px solid #999;
  border-radius: 8px;
  font-size: 14px;
}

.check-btn {
  background-color: #00a1fd;
  color: white;
  border: none;
  padding: 10px 14px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
}

.submit-btn {
  background-color: #00a1fd;
  color: white;
  border: none;
  padding: 12px 0;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
}

p.success {
  color: green;
  font-size: 13px;
}

p.error {
  color: red;
  font-size: 13px;
}
</style>
