<template>
  <div class="overlay" @click.self="close">
    <div class="sheet">
      <div class="sheet-header">
        <h3>모임 날짜와 시간</h3>
      </div>

      <div class="sheet-body">
        <label class="input-label">📅 날짜</label>
        <input type="date" v-model="date" />

        <label class="input-label">⏰ 시간</label>
        <input type="time" v-model="time" />
      </div>

      <div class="actions">
        <button class="confirm-btn" @click="confirm">확인</button>
        <button class="cancel-btn" @click="close">닫기</button>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref } from 'vue'
const emit = defineEmits(['close', 'select'])

const date = ref('')
const time = ref('')

function confirm() {
  emit('select', { date: date.value, time: time.value })
  emit('close')
}

function close() {
  emit('close')
}
</script>

<style scoped>
.overlay {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 1000;
}

.sheet {
  background: #fff;
  width: 100%;
  max-width: 375px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 24px 20px;
  box-sizing: border-box;
  font-family: 'Pretendard', sans-serif;
  animation: slide-up 0.3s ease;
}

.sheet-header h3 {
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
}

.input-label {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 6px;
  display: block;
  color: #333;
}

input[type="date"],
input[type="time"] {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 10px;
  margin-bottom: 20px;
  box-sizing: border-box;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
}

.confirm-btn {
  padding: 12px;
  background-color: #00a3ff;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 12px;
  cursor: pointer;
}

.cancel-btn {
  padding: 12px;
  background-color: #f3f3f3;
  color: #333;
  font-size: 15px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
}

@keyframes slide-up {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

</style>
