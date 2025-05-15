<template>
  <div class="book-page">
    <!-- 헤더 -->
    <header class="header">
      <button class="back-btn" @click="goBack">←</button>
      <h1>책 전체 페이지</h1>
      <button class="search-btn">🔍</button>
    </header>

    <!-- 카테고리 탭 -->
    <SortTabs :tabs="categories" v-model="selectedCategory" />

    <!-- 책 섹션 -->
    <main class="book-list">
      <section v-for="(books, category) in filteredBooks" :key="category">
        <h2 class="section-title">{{ category }}</h2>
        <div class="book-row">
          <BookCard v-for="(book, i) in books" :key="i" :book="book" />
        </div>
      </section>
    </main>

    <!-- 하단 탭 -->
    <BottomNav />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import SortTabs from '@/components/common/SortTabs.vue'
import BookCard from '@/components/book/BookCard.vue'
import BottomNav from '@/components/common/BottomNav.vue'

const router = useRouter()
const goBack = () => router.back()

const categories = ['소설', '에세이/시', '로맨스', '여행', 'IT', '자가관리']
const selectedCategory = ref('소설')

const bookData = {
  소설: [
    { title: '구의 증명', author: '최진영', image: 'https://via.placeholder.com/90x130?text=소설1' },
    { title: '채식주의자', author: '한강', image: 'https://via.placeholder.com/90x130?text=소설2' },
  ],
  '에세이/시': [
    { title: '어른의 문장력', author: '요조', image: 'https://via.placeholder.com/90x130?text=에세이1' },
    { title: '나는 나로 살기로 했다', author: '김수현', image: 'https://via.placeholder.com/90x130?text=에세이2' },
  ],
  로맨스: [],
  여행: [],
  IT: [],
  자가관리: [],
}

const filteredBooks = computed(() => {
  return {
    [selectedCategory.value]: bookData[selectedCategory.value] || [],
  }
})
</script>

<style scoped>
.book-page {
  width: 100%;
  max-width: 375px;
  margin: 0 auto;
  background: #fff;
  font-family: 'Noto Sans KR', sans-serif;
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;
  font-weight: bold;
  border-bottom: 1px solid #eee;
}
.back-btn,
.search-btn {
  font-size: 18px;
  background: none;
  border: none;
}
.book-list {
  padding: 16px;
  overflow-y: auto;
  flex: 1;
}
.section-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
}
.book-row {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 16px;
}
</style>
