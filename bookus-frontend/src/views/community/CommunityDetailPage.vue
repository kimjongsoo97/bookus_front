<template>
  <div class="community-detail-page">
    <HeaderComponent title="커뮤니티 상세 페이지" />

    <div class="content-box">
      <h2 class="title">{{ post.title }}</h2>
      <p class="author">작성자: {{ post.author }}</p>
      <img :src="post.thumbnail" alt="book" class="thumbnail" />
      <p class="body">{{ post.body }}</p>
    </div>

    <!-- 댓글 리스트 -->
    <div class="comments">
      <CommentCard
        v-for="(comment, i) in comments"
        :key="i"
        :comment="comment"
      />
    </div>

    <BottomNav />
  </div>
</template>

<script setup lang="ts">
import HeaderComponent from '@/components/common/HeaderComponent.vue'
import BottomNav from '@/components/common/BottomNav.vue'
import CommentCard from '@/components/community/CommentCard.vue'

const post = {
  title: '빗과 실 책 구해봅니다..',
  author: '심실핑',
  thumbnail: 'https://via.placeholder.com/150x200?text=책표지',
  body:
    '과제로 빗과 실 책을 읽어야 되는데 주변 서점에 없어요 ㅠㅠㅠㅠㅠ 혹시 읽으신 분 저랑 나눔되시거나 빌려주실 수 있는 분 계실까요..?',
}

const comments = [
  {
    name: '심실핑',
    date: '25/05/01',
    text: '저 있어요! 쪽지 주세요!!',
  },
  {
    name: '티니탐',
    date: '25/05/05',
    text: '저도 필요했는데 혹시 남는 분 저한테도 빌려주시면...',
  },
]
</script>

<style scoped>
.community-detail-page {
  width: 100vw;
  max-width: 375px;
  margin: 0 auto;
  background: #fff;
  font-family: 'Noto Sans KR', sans-serif;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.content-box {
  padding: 16px;
}
.title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 4px;
}
.author {
  font-size: 13px;
  color: #666;
  margin-bottom: 12px;
}
.thumbnail {
  width: 100%;
  max-width: 200px;
  border-radius: 10px;
  margin-bottom: 12px;
}
.body {
  font-size: 14px;
  white-space: pre-wrap;
}
.comments {
  padding: 0 16px 80px;
}
</style>
