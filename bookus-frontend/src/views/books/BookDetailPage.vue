<template>
  <div class="book-detail-page">
    <!-- 헤더 -->
    <HeaderComponent title="책 상세 페이지" />

    <!-- 책 정보 -->
    <div class="book-info">
      <img :src="book.img" alt="book" class="cover" />
      <h2 class="title">{{ book.title }}</h2>
      <p class="author">{{ book.author }}</p>
      <p class="desc">{{ book.content }}</p>
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
      <a :href="book.link" target="_blank" class="buy">구매하기</a>
      <button class="save" :class="{ active: isFavorite }" @click="toggleFavorite">
        {{ isFavorite ? '찜 취소' : '찜하기' }}
      </button>
    </div>

    <!-- 하단 탭 -->
    <BottomNav />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import BookAPI from '@/api/bookAPI'

import HeaderComponent from '@/components/common/HeaderComponent.vue'
import BottomNav from '@/components/common/BottomNav.vue'
import GroupCard from '@/components/group/GroupCard.vue'

const route = useRoute()
const bookId = route.params.id

const book = ref({
  title: '',
  author: '',
  img: '',
  content: '',
  link: '',
})
const groups = ref([]) // 관련 모임 데이터 (선택사항)
const isFavorite = ref(false)

const fetchBookDetail = async () => {
  try {
    const response = await BookAPI.get(bookId)
    book.value = response.data
  } catch (err) {
    console.error('책 상세 조회 실패', err)
  }
}

const checkFavorite = async () => {
  try {
    const res = await BookAPI.getFavorite()
    isFavorite.value = res.data.some(fav => fav.book.id === Number(bookId))
  } catch (err) {
    console.error('찜 여부 확인 실패', err)
  }
}

const toggleFavorite = async () => {
  try {
    if (isFavorite.value) {
      await BookAPI.removeFavorite(bookId)
    } else {
      await BookAPI.addFavorite(bookId)
    }
    isFavorite.value = !isFavorite.value
  } catch (err) {
    console.error('찜 토글 실패', err)
  }
}

onMounted(() => {
  fetchBookDetail()
  checkFavorite()
})
</script>

<style scoped>
.book-detail-page {
  max-width: 375px;
  margin: 0 auto;
  font-family: 'Pretendard', sans-serif;
  background: #fff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding-bottom: 60px;
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
.save.active {
  background: #ffefef;
  color: #e60023;
}
</style>
