<template>
  <nav class="bottom-nav">
    <div
      v-for="item in navItems"
      :key="item.label"
      class="nav-item"
      @click="router.push(item.route)"
    >
      <i :class="item.iconClass"></i>
      <span class="label">{{ item.label }}</span>
    </div>
  </nav>
</template>


<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const navItems = [
  { iconClass: 'fa-solid fa-house', label: '홈', route: '/' },
  { iconClass: 'fa-solid fa-users', label: '독서모임', route: '/meeting' },
  { iconClass: 'fa-solid fa-book', label: '책', route: '/books' },
  { iconClass: 'fa-solid fa-comments', label: '커뮤니티', route: '/community' },
  { iconClass: 'fa-solid fa-user', label: '마이페이지', route: '/mypage' }
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
