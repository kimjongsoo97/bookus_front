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
  width: 100vw;
  height: 60px;
  background-color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 1px solid #e9e9e9;
  box-sizing: border-box;
  z-index: 1000;
}

.nav-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Pretendard', sans-serif;
  font-size: 11px;
  padding-top: 4px;
}

.nav-item i {
  font-size: 18px;
  margin-bottom: 8px; /* 아이콘과 텍스트 간격 확보 */
}
</style>
