<template>
  <div class="book-detail-page">
    <!-- 헤더 -->
    <HeaderComponent title="책 상세 페이지" />

    <!-- 책 정보 -->
    <div class="book-info">
      <img :src="book.image" alt="book" class="cover" />
      <h2 class="title">{{ book.title }}</h2>
      <p class="author">{{ book.author }}</p>
      <p class="desc">{{ book.description }}</p>
    </div>

    <!-- AI 추천 박스 -->
    <div class="ai-box">
      🤖 AI가 추천하는 활동들:<br />
      "{{ book.title }}"을(를) 읽고 독후감을 써보세요!  
      토론하고, 키워드를 수집하고 이야기를 나눠요!
    </div>

    <!-- 관련 모임 -->
    <div class="section">
      <h3>이 책을 선정한 모임</h3>
      <div class="group-list">
        <GroupCard
          v-for="(g, i) in groups"
          :key="i"
          :group="g"
        />
      </div>
    </div>

    <!-- 하단 버튼 -->
    <div class="bottom-action">
      <button class="buy">구매하기</button>
      <button class="save">찜하기</button>
    </div>

    <!-- 하단 탭 -->
    <BottomNav />
  </div>
</template>

<script setup lang="ts">
import HeaderComponent from '@/components/common/HeaderComponent.vue'
import BottomNav from '@/components/common/BottomNav.vue'
import GroupCard from '@/components/group/GroupCard.vue'

const book = {
  title: '채식주의자',
  author: '한강',
  image: 'https://via.placeholder.com/180x260?text=책표지',
  description:
    '2016년 맨부커상을 수상한 한강의 대표작. 금욕적 삶과 인간 본성의 충돌을 다룬 이야기.',
}

const groups = [
  {
    title: '왕자실 사람',
    description: '이 책을 읽고 주인공의 감정을 토론해요',
    dday: 'D-17',
    image: 'https://via.placeholder.com/80x100?text=책',
  },
  {
    title: '왕자실 사람',
    description: '같은 책을 읽고 감상을 나눠요',
    dday: 'D-17',
    image: 'https://via.placeholder.com/80x100?text=책',
  },
]
</script>
<style scoped>
.book-detail-page {
  max-width: 375px;
  margin: 0 auto;
  font-family: 'Noto Sans KR', sans-serif;
  background: #fff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.book-info {
  padding: 20px 16px 0;
  text-align: center;
}
.cover {
  width: 180px;
  height: 260px;
  border-radius: 12px;
  object-fit: cover;
  margin-bottom: 12px;
}
.title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 4px;
}
.author {
  font-size: 14px;
  color: #555;
  margin-bottom: 10px;
}
.desc {
  font-size: 13px;
  color: #444;
}
.ai-box {
  margin: 16px;
  padding: 12px;
  font-size: 14px;
  background: #f1f9ff;
  border-radius: 8px;
  line-height: 1.5;
}
.section {
  padding: 0 16px;
}
.section h3 {
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 12px;
}
.group-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.bottom-action {
  display: flex;
  justify-content: space-around;
  padding: 12px 16px;
  border-top: 1px solid #eee;
  background: #fff;
}
.buy,
.save {
  flex: 1;
  margin: 0 6px;
  padding: 14px;
  font-size: 15px;
  font-weight: bold;
  border-radius: 10px;
  border: none;
  cursor: pointer;
}
.buy {
  background: #00a3ff;
  color: #fff;
}
.save {
  background: #f5f5f5;
  color: #333;
}
</style>
