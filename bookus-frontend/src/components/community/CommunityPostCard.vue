<template>
  <!-- 카드 전체 클릭 이벤트 연결 -->
  <div class="post-card" @click="goToDetail">
    <img v-if="post.img" :src="getImageUrl(post.img)" class="thumbnail" />
    <div class="info">
      <div class="title-row">
        <p class="title">{{ post.title }}</p>
        <div class="writer-row" @click.stop>
          <span class="nickname">{{ post.writer }}</span>
          <!-- 아이콘만 클릭 시 쪽지보내기 -->
          <i class="fas fa-envelope message-icon" @click="goToMessage" />
        </div>
      </div>
      <p class="preview">{{ post.content }}</p>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  post: Object
})

const router = useRouter()

function getImageUrl(path) {
  const BASE_URL = 'http://localhost:8000'
  if (!path) return ''
  return path.startsWith('http') ? path : `${BASE_URL}${path}`
}

// 게시글 상세 페이지 이동
function goToDetail() {
  router.push(`/community/detail/${props.post.id}`) // 혹은 props.post.bno 등 실제 키에 맞게!
}

// 쪽지 작성 페이지 이동
function goToMessage() {
  router.push({
    path: '/message/create',
    query: { replyTo: props.post.writer }
  })
}
</script>

<style scoped>
.post-card {
  display: flex;
  padding: 12px 0;
  border-bottom: 1px solid #eee;
  gap: 12px;
}

.thumbnail {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 6px;
}

.info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.writer-row {
  display: flex;
  align-items: center;
  gap: 6px;
}

.nickname {
  font-size: 12px;
  color: #999;
}

.message-icon {
  font-size: 14px;
  color: #999;
  cursor: pointer;
}

.preview {
  font-size: 13px;
  color: #444;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
