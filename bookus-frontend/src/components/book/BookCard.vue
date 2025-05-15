<template>
  <div class="book-card">
    <img :src="book.image" :alt="book.title" />
    <p class="title">{{ book.title }}</p>
    <p class="author">{{ book.author }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  book: Object
})
</script>

<style scoped>
.book-card {
  min-width: 90px;
  text-align: center;
}
.book-card img {
  width: 90px;
  height: 130px;
  object-fit: cover;
  border-radius: 6px;
  margin-bottom: 4px;
}
.title {
  font-size: 13px;
  font-weight: bold;
  margin-bottom: 2px;
}
.author {
  font-size: 12px;
  color: #666;
}
</style>
