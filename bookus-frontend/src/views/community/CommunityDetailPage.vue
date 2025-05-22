<template>
  <div class="community-detail-page">
    <HeaderComponent :title="community.title " />

    <div class="content-box">
      <!-- 제목 -->

      <!-- 작성자 + 아이콘 -->
      <div class="author-row">
        <span class="author-label">작성자:</span>
        <span class="author-name">{{ community.writer }}</span>
        <i class="fas fa-envelope message-icon" @click="goToMessage" />
      </div>

      <!-- 이미지 -->
      <div v-if="community.img">
        <img :src="getImageUrl(community.img)" alt="image" class="thumbnail" />
      </div>

      <!-- 본문 -->
      <p class="body">{{ community.content }}</p>

      <!-- 수정/삭제 (작성자일 경우) -->
      <div v-if="isAuthor" class="button-group">
        <button class="edit-btn" @click="goToEdit">수정</button>
        <button class="delete-btn" @click="deletePost">삭제</button>
      </div>
    </div>

    <BottomNav />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import CommunityAPI from '@/api/communityAPI'
import HeaderComponent from '@/components/common/HeaderComponent.vue'
import BottomNav from '@/components/common/BottomNav.vue'
import { useLoginStore } from '@/stores/login'

const auth = useLoginStore()
const route = useRoute()
const router = useRouter()

const community = ref({})

onMounted(async () => {
  const communityId = route.params.id
  try {
    const res = await CommunityAPI.get(communityId)
    community.value = res.data
  } catch (err) {
    console.error('커뮤니티 상세 조회 실패:', err)
  }
})

const BASE_URL = 'http://localhost:8000'
function getImageUrl(path) {
  if (!path) return ''
  return path.startsWith('http') ? path : `${BASE_URL}${path}`
}

const isAuthor = computed(() => {
  if (!community.value.writer || !auth.nickname) return false
  return community.value.writer.trim() === auth.nickname.trim()
})

function goToEdit() {
  router.push(`/community/update/${community.value.id}`)
}

async function deletePost() {
  if (!confirm('정말 삭제하시겠습니까?')) return

  try {
    await CommunityAPI.delete(community.value.id)
    alert('삭제되었습니다.')
    router.push('/community')
  } catch (err) {
    console.error('삭제 실패:', err)
    alert('삭제에 실패했습니다.')
  }
}

function goToMessage() {
  router.push({
    path: '/message/create',
    query: { replyTo: community.value.writer }
  })
}
</script>

<style scoped>
.community-detail-page {
  max-width: 375px;
  margin: 0 auto;
  font-family: 'Noto Sans KR', sans-serif;
  background: #fff;
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
  margin-bottom: 12px;
}

.author-row {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 12px;
}

.author-label {
  font-size: 13px;
  color: #666;
}

.author-name {
  font-size: 13px;
  color: #000;
  font-weight: bold;
}

.message-icon {
  font-size: 14px;
  color: #999;
  cursor: pointer;
}

.thumbnail {
  width: 100%;
  border-radius: 10px;
  margin-bottom: 12px;
}

.body {
  font-size: 14px;
  white-space: pre-wrap;
  margin-bottom: 16px;
}

.button-group {
  display: flex;
  gap: 12px;
  margin-top: 12px;
}

.edit-btn,
.delete-btn {
  flex: 1;
  padding: 10px;
  font-size: 14px;
  font-weight: bold;
  border-radius: 8px;
  border: none;
  cursor: pointer;
}

.edit-btn {
  background-color: #00a1fd;
  color: white;
}

.delete-btn {
  background-color: #ff5c5c;
  color: white;
}
</style>
