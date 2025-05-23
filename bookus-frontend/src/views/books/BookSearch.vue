<template>
  <div class="container">
    <HeaderComponent title="책 검색" />

    <div class="search-wrapper">
      <input
        v-model="searchQuery"
        @input="searchBooks"
        placeholder="책 제목 또는 작가 검색..."
        class="search-input"
      />

      <div v-if="books.length" class="results"  >
        <div v-for="book in books" :key="book.id" class="book-card"@click="goToDetail(book.id)">
          <img
            v-if="book.img"
            :src="book.img"
            :alt="book.title"
            @error="onImageError"
            class="book-img"
          />
          <div class="book-info">
            <h2 class="book-title">{{ book.title }}</h2>
            <p class="book-author">저자: {{ book.author }}</p>
          </div>
        </div>
      </div>

      <div v-else-if="searchQuery" class="no-results">
        검색 결과가 없습니다.
      </div>
    </div>
  <BottomNav/>
  </div>
  
</template>

<script setup>
import { ref } from 'vue'
import BookAPI from '@/api/bookAPI'
import HeaderComponent from '@/components/common/HeaderComponent.vue'
import BottomNav from '@/components/common/BottomNav.vue'
import { route } from 'fontawesome'
import { useRouter } from 'vue-router'

const searchQuery = ref('')
const books = ref([])
const router=useRouter();
const searchBooks = async () => {
  if (!searchQuery.value) {
    books.value = []
    return
  }
  const response = await BookAPI.getSearch(searchQuery.value)
  books.value = response.data
}

const onImageError = (e) => {
  e.target.src = '/default-book.png'
}
const goToDetail=(bookId)=>{
  router.push(`/books/detail/${bookId}`)
}
</script>

<style scoped>
.container {
  padding: 16px;
  background-color: white;
  min-height: 100vh;
  box-sizing: border-box;
}

.search-wrapper {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.search-input {
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 12px;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
}

.results {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.book-card {
  display: flex;
  gap: 12px;
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 12px;
  background-color: #f9f9f9;
  align-items: center;
}

.book-img {
  width: 60px;
  height: 90px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #ddd;
}

.book-info {
  flex: 1;
}

.book-title {
  font-size: 16px;
  font-weight: bold;
  margin: 0;
}

.book-author {
  font-size: 14px;
  color: #666;
  margin-top: 4px;
}

.no-results {
  text-align: center;
  color: #aaa;
  margin-top: 20px;
}
</style>
