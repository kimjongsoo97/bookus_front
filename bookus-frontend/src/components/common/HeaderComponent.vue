<template>
  <div class="header">
    <button class="back-btn" @click="goBack">←</button>
    <h1 style="font-weight:normal;">{{ title }}</h1>
    <button class="search-btn">🔍</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const props = defineProps({ title: String })
const router = useRouter()
const goBack = () => router.back()
</script>

<style scoped>
.header {
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 28px 10px;
  font-size: 12px;
  font-family: 'Pretendard', sans-serif;
  /* font-weight: lighter; */
  border-bottom: 10px solid #ffffff;
}
.back-btn,
.search-btn {
  font-size: 18px;
  background: none;
  border: none;
}
</style>
