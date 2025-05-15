<template>
  <div class="overlay" @click.self="close">
    <div class="sheet">
      <h3>날짜 및 시간 선택</h3>
      <input type="date" v-model="date" />
      <input type="time" v-model="time" />
      <div class="actions">
        <button @click="confirm">확인</button>
        <button @click="close">닫기</button>
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
  background: white;
  width: 100%;
  max-width: 375px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  padding: 16px;
  box-sizing: border-box;
}

input {
  display: block;
  width: 100%;
  margin: 12px 0;
  padding: 10px;
  font-size: 16px;
}

.actions {
  display: flex;
  justify-content: space-between;
}

button {
  flex: 1;
  padding: 12px;
  margin: 0 6px;
  font-size: 16px;
  background-color: #00a3ff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
</style>
