<template>
  <div class="book-page">
    <div class="header">
        <HeaderComponent title="내 즐겨찾기 책" />
        </div>

    <!-- 책 섹션 -->
    <main class="book-list">
      <section>
        <h2 class="section-title">즐겨찾기 목록</h2>
        <br>
        <div class="book-row">
          <BookCard
  v-for="(item, i) in books"
  :key="i"
  :book="item.book"
/>
        </div>
      </section>
    </main>

    <BottomNav />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import BookAPI from '@/api/bookAPI'
import BookCard from '@/components/book/BookCard.vue'
import BottomNav from '@/components/common/BottomNav.vue'
import HeaderComponent from '@/components/common/HeaderComponent.vue'

const books = ref([])

onMounted(async () => {
  try {
    const response = await BookAPI.getFavorite()
    books.value = response.data || []

  } catch (err) {
    console.error('즐겨찾기 책 목록 불러오기 실패:', err)
  }
})
</script>

<style scoped>
.book-page {
  width: 100%;
  max-width: 375px;
  margin: 0 auto;
  font-family: 'Pretendard', sans-serif;
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.header{
    border-bottom: 1px solid #f3f3f3;
}
.book-list {
  padding: 16px;
  overflow-y: auto;
  flex: 1;
  padding-bottom: 80px; /* 바텀탭 피하기용 */
}

.section-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
}

.book-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  padding-bottom: 16px;
}
</style>
