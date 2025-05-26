<template>
  <div class="my-page">

    <div class="profile">
      <div class="info">
        <p class="name"><i class="fa-solid fa-face-smile-wink"></i> {{ auth.nickname }}</p>
      </div>
    </div>

    <ul class="menu-list">
      <li v-for="(menu, i) in menus" :key="i" @click="goTo(menu)">
        <img :src="menu.icon" class="icon" />
        <span>{{ menu.label }}</span>
      </li>
    </ul>
    <br>

 <button class="logout-btn" @click="logout">로그아웃</button>
    <BottomNav />
  </div>
</template>

<script setup lang="ts">

import BottomNav from '@/components/common/BottomNav.vue';
import { useLoginStore } from '@/stores/login';
import { useRouter,useRoute } from 'vue-router';

const auth = useLoginStore();
console.log(auth.nickname)
const router=useRouter();
const route=useRoute();
const logout=()=>{
  auth.logout()
  alert("로그아웃이 완료되었습니다")
  router.push('/')
}
const menus = [
  {
    label: '닉네임 변경하기',
    icon: 'https://cdn-icons-png.flaticon.com/128/9844/9844206.png',
    route:'/mypage/changenickname'
  },
  {
    label: '내 모임',
    icon: 'https://cdn-icons-png.flaticon.com/128/15861/15861106.png',
    route:'/mypage/group'
},
  {
    label: '쪽지함',
    icon: "https://cdn-icons-png.flaticon.com/512/8034/8034110.png",
    route:'/message'
  },
  {
    label: '메모',
    icon: 'https://cdn-icons-png.flaticon.com/128/3914/3914955.png',
    route:'/memo'
  },
  {
    label:'찜목록',
    icon:'https://cdn-icons-png.flaticon.com/128/3916/3916579.png',
    route:'/books/favorite'
  },
{
  label: '회원탈퇴',
  icon: 'https://cdn-icons-png.flaticon.com/128/3917/3917419.png',
  
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
  font-family: 'Pretendard', sans-serif;
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
.logout-btn {
  padding: 8px 12px;
  font-size: 14px;
  color: #fff;
  background-color: #ff962d;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}
.info {
  flex: 1;
}
.name {
  font-size: 30px;
  font-weight: bold;
  margin-bottom: -10px;
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
