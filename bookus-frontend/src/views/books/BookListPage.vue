<template>
  <div class="book-page">
    <HeaderComponent title="책 천체 페이지"/>

    <!-- 카테고리 탭 -->
    <SortTabs :tabs="categories.map(c => c.name)" v-model="selectedCategoryName" />

    <!-- 책 섹션 -->
    <main class="book-list">
      <section v-for="(books, categoryName) in filteredBooks" :key="categoryName">
        <h2 class="section-title">{{ categoryName }}</h2>
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
import { ref, computed, watchEffect } from 'vue'
import SortTabs from '@/components/common/SortTabs.vue'
import BookCard from '@/components/book/BookCard.vue'
import BottomNav from '@/components/common/BottomNav.vue'
import BookAPI from '@/api/bookAPI'
import HeaderComponent from '@/components/common/HeaderComponent.vue'

const categories = [
  { id: 4, name: '소설' },
  { id: 5, name: '경제/경영' },
  { id: 6, name: '자기계발' },
  { id: 1, name: '인문/교양' },
  { id: 2, name: '과학' },
  { id: 7, name: '어린이/청소년' }
]

// 선택된 카테고리 이름 (SortTabs에서는 name 기반으로 바인딩)
const selectedCategoryName = ref('소설/시/희곡')

// 백엔드 요청용: name으로부터 id 찾기
const selectedCategoryId = computed(() => {
  return categories.find(c => c.name === selectedCategoryName.value)?.id || null
})

// 책 데이터 저장
const bookData = ref<{ [key: string]: any[] }>({})

// 책 목록 불러오기
const fetchBooks = async (categoryId: number) => {
  try {
    const response = await BookAPI.all({ category: categoryId })
    const categoryName = categories.find(c => c.id === categoryId)?.name
    if (categoryName) {
      bookData.value[categoryName] = response.data
    }
  } catch (err) {
    console.error('책 데이터 불러오기 실패:', err)
  }
}

// 선택된 카테고리 ID가 바뀔 때마다 API 호출
watchEffect(() => {
  const id = selectedCategoryId.value
  const name = selectedCategoryName.value
  if (id && !bookData.value[name]) {
    fetchBooks(id)
  }
})

// 화면에 보여줄 데이터
const filteredBooks = computed(() => {
  return {
    [selectedCategoryName.value]: bookData.value[selectedCategoryName.value] || []
  }
})
</script>

<style scoped>
.book-page {
  width: 100%;
  max-width: 375px;
  margin: 0 auto;
  font-family: 'Noto Sans KR', sans-serif;
  display: flex;
  flex-direction: column;
  height: 100vh;
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
