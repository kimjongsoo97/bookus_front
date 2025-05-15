<template>
  <div class="header">
    <button class="back-btn" @click="goBack">←</button>
    <h1>{{ title }}</h1>
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;
  font-weight: bold;
  border-bottom: 1px solid #eee;
}
.back-btn,
.search-btn {
  font-size: 18px;
  background: none;
  border: none;
}
</style>
