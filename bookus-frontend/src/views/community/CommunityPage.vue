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

    <!-- 글쓰기 버튼 -->
    <FloatingButton to="/community/create" />

    <!-- 하단 네비게이션 -->
    <BottomNav />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import HeaderComponent from '@/components/common/HeaderComponent.vue'
import CommunityAPI from '@/api/communityAPI'
import CommunityPostCard from '@/components/community/CommunityPostCard.vue'
import BottomNav from '@/components/common/BottomNav.vue'
import FloatingButton from '@/components/common/FloatingButton.vue'

const posts = ref([])
const router = useRouter()

onMounted(async () => {
  try {
    const res = await CommunityAPI.all()
    posts.value = res.data || []
  } catch (err) {
    console.error('커뮤니티 게시글 불러오기 실패:', err)
  }
})

function goBack() {
  router.back()
}
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

.top-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid #eee;
}

.top-header .title {
  font-size: 18px;
  font-weight: bold;
}

.back-btn,
.search-btn {
  font-size: 18px;
  background: none;
  border: none;
  cursor: pointer;
}

.post-list {
  flex: 1;
  overflow-y: auto;
  padding: 8px 16px 80px; /* 하단 네비/버튼 가려짐 방지 */
}
</style>