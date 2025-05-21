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
import { ref, onMounted } from 'vue'
import HeaderComponent from '@/components/common/HeaderComponent.vue'
import BottomNav from '@/components/common/BottomNav.vue'
import CommunityPostCard from '@/components/community/CommunityPostCard.vue'
import CommunityAPI from '@/api/communityAPI' // ← 정확한 파일명 경로 확인

const posts = ref([])

onMounted(async () => {
  try {
    const res = await CommunityAPI.all()
    posts.value = res.data || [] // API 응답 결과를 바인딩
  } catch (err) {
    console.error('커뮤니티 게시글 불러오기 실패:', err)
  }
})
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
