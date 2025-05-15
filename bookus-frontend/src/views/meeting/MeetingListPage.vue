<template>
  <div class="meeting-list-page">
    <HeaderComponent title="모임 전체 페이지" />

    <!-- 탭 필터 -->
    <div class="tab-bar">
      <button
        :class="{ active: sort === 'latest' }"
        @click="sort = 'latest'"
      >최신 순</button>
      <button
        :class="{ active: sort === 'due' }"
        @click="sort = 'due'"
      >마감 순</button>
    </div>

    <!-- 모임 리스트 -->
    <ul class="meeting-list">
      <li
        v-for="(item, i) in dummyData"
        :key="i"
        class="meeting-item"
      >
        <!-- <img :src="item.image" alt="책 이미지" class="book-img" /> -->
        <div class="meeting-info">
          <h3 class="meeting-title">{{ item.title }}</h3>
          <p class="meeting-desc">{{ item.desc }}</p>
        </div>
        <div class="meeting-due">D-{{ item.due }}</div>
      </li>
    </ul>

    <BottomNav />
  </div>
</template>

<script setup lang="ts">
import HeaderComponent from '@/components/common/HeaderComponent.vue'
import BottomNav from '@/components/common/BottomNav.vue'


import { ref } from 'vue'
const sort = ref('latest')

const dummyData = [
  {
    title: '설레임을 느껴볼까요',
    desc: '꿈같은 소설을 읽고 행복해지고 싶어서...',
    due: 7,
  },
  {
    title: '왕자릴 사람',
    desc: '오랜만에 아름다운 낭만이 담겨있다...',
    due: 7,
  },
  {
    title: '함께 늙어가실 분',
    desc: '나이듦과 삶에 대한 공감과 위로를...',
    due: 7,
  },
]
</script>
<style scoped>
.meeting-list-page {
  width: 100vw;
  max-width: 375px;
  margin: 0 auto;
  font-family: 'Noto Sans KR', sans-serif;
  background: #fff;
  color: #1a1a1a;
  box-sizing: border-box;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  font-size: 16px;
  font-weight: bold;
}

.back-btn,
.search-btn {
  font-size: 18px;
  background: none;
  border: none;
  cursor: pointer;
}

.tab-bar {
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid #ddd;
  margin: 0 8px;
}

.tab-bar button {
  flex: 1;
  padding: 12px;
  border: none;
  background: none;
  font-weight: bold;
  color: #999;
  cursor: pointer;
}

.tab-bar button.active {
  color: #007bce;
  border-bottom: 2px solid #007bce;
}

.meeting-list {
  list-style: none;
  padding: 0 16px;
  margin-top: 12px;
}

.meeting-item {
  display: flex;
  align-items: flex-start;
  padding: 12px 0;
  border-bottom: 1px solid #eee;
}

.book-img {
  width: 60px;
  height: 90px;
  object-fit: cover;
  margin-right: 12px;
  border-radius: 6px;
}

.meeting-info {
  flex: 1;
}

.meeting-title {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 4px;
}

.meeting-desc {
  font-size: 12px;
  color: #666;
}

.meeting-due {
  font-size: 12px;
  color: orange;
  margin-left: 8px;
  white-space: nowrap;
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
