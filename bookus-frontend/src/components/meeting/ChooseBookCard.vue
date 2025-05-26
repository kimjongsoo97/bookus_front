<template>
  <div class="book-card" @click="goToDetail">
    <img
      v-if="book.img"
      :src="book.img"
      :alt="book.title"
      @error="onImageError"
    />
    <div v-else class="image-placeholder">이미지 없음</div>

    <p class="title">{{ book.title }}</p>
    <p class="author">{{ book.author }}</p>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  book: {
    type: Object,
    required: true,
  },
})
const router=useRouter()
const onImageError = (event) => {
  event.target.src = 'https://via.placeholder.com/90x130?text=No+Image'
}
function goToDetail(){
  router.push(`/meeting/create/choosebook/detail/${props.book.id}`)
}
</script>

<style scoped>
.book-card {
  width: 100%;
  box-sizing: border-box; /* ✅ 패딩 포함한 전체 크기 계산 */
  text-align: center;
  overflow: hidden;       /* ✅ 내부 요소가 삐져나오는 것 방지 */
}
.book-card img {
  width: 100%;
  max-width: 100px; /* ✅ 작게 제한 */
  height: auto;
  aspect-ratio: 3 / 4;
  object-fit: cover;
}
.title {
  font-size: 13px;
  font-weight: bold;
  margin-bottom: 2px;

  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;

  /* ✅ 표준 속성 대응 (실험적 지원 브라우저용) */
  line-clamp: 2;

  overflow: hidden;
  text-overflow: ellipsis;
}

.author {
  font-size: 12px;
  color: #666;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}


</style>

