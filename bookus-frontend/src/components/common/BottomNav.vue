<template>
  <nav class="bottom-nav">
    <div v-for="item in navItems" :key="item.label" class="nav-item">
      <span>{{ item.icon }}</span>
      <span class="label">{{ item.label }}</span>
    </div>
  </nav>
</template>

<script setup>
const navItems = [
  { icon: '🏠', label: '홈' },
  { icon: '📚', label: '독서모임' },
  { icon: '📖', label: '책' },
  { icon: '💬', label: '커뮤니티' },
  { icon: '👤', label: '마이페이지' }
]
</script>

<style scoped>
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 56px;
  background-color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 1px solid #ccc;
}
.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
}
</style>
