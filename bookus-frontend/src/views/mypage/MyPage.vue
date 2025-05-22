<template>
  <div class="my-page">
    <HeaderComponent title="마이 페이지" />

    <div class="profile">
      <img class="avatar" src="https://via.placeholder.com/60x60.png?text=🙂" alt="profile" />
      <div class="info">
        <p class="name">{{ auth.nickname }}</p>
      </div>
      <button class="edit-nickname">닉네임변경</button>
    </div>

    <ul class="menu-list">
      <li v-for="(menu, i) in menus" :key="i" @click="goTo(menu)">
        <img :src="menu.icon" class="icon" />
        <span>{{ menu.label }}</span>
      </li>
    </ul>

    <BottomNav />
  </div>
</template>

<script setup lang="ts">

import BottomNav from '@/components/common/BottomNav.vue';
import { useLoginStore } from '@/stores/login';
import { useRouter,useRoute } from 'vue-router';

const auth = useLoginStore();

const router=useRouter();
const route=useRoute();
const menus = [
  {
    label: '닉네임 변경하기',
    icon: 'https://cdn-icons-png.flaticon.com/128/747/747545.png',
    route:'/changepassword'
  },
  {
    label: '내 모임',
    icon: 'https://cdn-icons-png.flaticon.com/128/1250/1250651.png',
    route:'/mypage/group'
},
  {
    label: '쪽지함',
    icon: 'https://cdn-icons-png.flaticon.com/128/561/561127.png',
    route:'/message'
  },
  {
    label: '메모',
    icon: 'https://cdn-icons-png.flaticon.com/128/1827/1827449.png',
    route:'/memo'
  },
  {
    label:'회원탈퇴',
    
  }
]
const goTo = (menu: { route?: string }) => {
  if (menu.route) {
    router.push(menu.route);
  }
};

</script>

<style scoped>
.my-page {
  width: 100%;
  max-width: 375px;
  margin: 0 auto;
  background: #fff;
  font-family: 'Noto Sans KR', sans-serif;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
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
.profile {
  display: flex;
  align-items: center;
  padding: 16px;
  gap: 12px;
}
.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
.info {
  flex: 1;
}
.name {
  font-size: 16px;
  font-weight: bold;
}
.phone {
  font-size: 13px;
  color: #666;
}
.edit-nickname {
  color: #ff4d4f;
  font-size: 13px;
  background: none;
  border: none;
  cursor: pointer;
}
.menu-list {
  list-style: none;
  padding: 0 16px;
}
.menu-list li {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 0;
  border-bottom: 1px solid #eee;
  font-size: 14px;
}
.icon {
  width: 20px;
  height: 20px;
}
.bottom-nav {
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 375px;
  background: #fff;
  border-top: 1px solid #ddd;
  display: flex;
  justify-content: space-around;
  padding: 6px 0;
  font-size: 12px;
}
.bottom-nav button {
  background: none;
  border: none;
  text-align: center;
  color: #333;
}
</style>
