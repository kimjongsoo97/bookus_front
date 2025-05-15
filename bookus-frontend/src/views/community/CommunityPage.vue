<template>
  <div class="community-page">
    <!-- 헤더 -->
    <HeaderComponent title="커뮤니티" />

    <!-- 게시글 목록 -->
    <div class="post-list">
      <CommunityPostCard
        v-for="(post, i) in posts"
        :key="i"
        :post="post"
      />
    </div>

    <!-- 하단 탭바 -->
    <BottomNav />
  </div>
</template>

<script setup lang="ts">
import HeaderComponent from '@/components/common/HeaderComponent.vue'
import BottomNav from '@/components/common/BottomNav.vue'
import CommunityPostCard from '@/components/community/CommunityPostCard.vue'

const posts = [
  {
    title: '책 나눔 해요!!',
    preview: '최근 읽었던 책인데... 나눔하고 싶어요',
    author: '한루도리',
    tag: '나눔',
    thumbnail: 'https://via.placeholder.com/50x70?text=책',
  },
  {
    title: '책 추천 해요!!',
    preview: '피카츄가 좋아하는 책은 바로 이겁니다!',
    author: '피카츄',
    tag: '추천',
    thumbnail: 'https://via.placeholder.com/50x70?text=책',
  },
  {
    title: '이 책 아시는 분?',
    preview: '책 커버는 기억나는데 제목이 생각이 안나요ㅠㅠ',
    author: '하츄핑',
    tag: '질문',
    thumbnail: 'https://via.placeholder.com/50x70?text=책',
  },
]
</script>

<style scoped>
.community-page {
  max-width: 375px;
  margin: 0 auto;
  font-family: 'Noto Sans KR', sans-serif;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: white;
}
.post-list {
  padding: 16px;
  overflow-y: auto;
  flex: 1;
}
</style>
