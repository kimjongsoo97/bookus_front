<template>
  <div class="home">
    <!-- Header -->
    <div class="home-header">
      <h1 class="logo">BOOK<span class="highlight">US</span></h1>
      <button class="menu-btn">☰</button>
    </div>

    <!-- Book Carousel -->
    <div class="carousel">
      <div class="carousel-item active">
        <img src="https://via.placeholder.com/150x220" alt="book cover" />
        <div class="carousel-title">채식주의자</div>
        <div class="carousel-author">한강</div>
      </div>
    </div>

    <!-- Recent Groups -->
    <div class="section">
      <div class="section-title">
        <span>최근 생성된 모임</span>
        <span class="link">전체보기 ></span>
      </div>
      <div class="recent-group">
        <img src="https://via.placeholder.com/40" />
        <div>울란보다 소년이다</div>
        <span class="count">1명</span>
      </div>
    </div>

    <!-- Best Sellers -->
    <div class="section">
      <div class="section-title">
        <span>금주의 베스트셀러</span>
      </div>
      <div class="bestsellers">
        <div class="book">
          <div class="rank">1</div>
          <img src="https://via.placeholder.com/60x90" />
          <div class="book-info">
            <div class="title">첫 여름, 일주</div>
            <div class="author">김금희</div>
          </div>
        </div>
        <div class="book">
          <div class="rank">2</div>
          <img src="https://via.placeholder.com/60x90" />
          <div class="book-info">
            <div class="title">채식주의자</div>
            <div class="author">한강</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Hot Community -->
    <div class="section">
      <div class="section-title">
        <span>지금 HOT한 커뮤니티</span>
        <span class="link">전체보기 ></span>
      </div>
      <div class="community-post">
        <div class="title">스카플 책 나눔합니다</div>
        <div class="desc">너무너무 재미있는 책인데 책이 너무 많아서 정리 중이에요! 꼭 가져가실 분만~</div>
      </div>
      <div class="community-post">
        <div class="title">구의동 책 빌려주실 분</div>
        <div class="desc">대학교 과제를 읽어야 하는데 급해서 서점 갈 시간도 없어요ㅠㅠ</div>
      </div>
    </div>

    <!-- Bottom Navigation -->
    <BottomNav />
  </div>
</template>

<script setup>
import BottomNav from '@/components/common/BottomNav.vue'

import { useRouter } from 'vue-router';

const router = useRouter();


</script>

<style scoped>
.home {
  padding: 16px;
  padding-bottom: 80px;
  background-color: #fff;
  font-family: 'Pretendard', sans-serif;
}

.home-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logo {
  font-size: 24px;
  font-weight: bold;
  color: #1d4ed8;
}
.highlight {
  color: #f97316;
}
.menu-btn {
  font-size: 24px;
  background: none;
  border: none;
  cursor: pointer;
}

.carousel {
  margin: 16px 0;
  text-align: center;
}
.carousel-item img {
  width: 150px;
  height: 220px;
  object-fit: cover;
  border-radius: 12px;
}
.carousel-title {
  margin-top: 8px;
  font-weight: bold;
}
.carousel-author {
  font-size: 14px;
  color: #666;
}

.section {
  margin-top: 24px;
}
.section-title {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-weight: bold;
}
.link {
  font-size: 14px;
  color: #888;
}

.recent-group {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f5f5f5;
  padding: 8px;
  border-radius: 8px;
}
.count {
  margin-left: auto;
  font-size: 14px;
  color: #999;
}

.bestsellers .book {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}
.rank {
  font-size: 18px;
  color: #f43f5e;
  font-weight: bold;
  width: 24px;
}
.book-info .title {
  font-weight: bold;
}
.book-info .author {
  font-size: 14px;
  color: #666;
}

.community-post {
  background: #f9f9f9;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 12px;
}
.community-post .title {
  font-weight: bold;
  margin-bottom: 4px;
}
.community-post .desc {
  font-size: 14px;
  color: #555;
}
</style>
