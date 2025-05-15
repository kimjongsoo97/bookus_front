<template>
  <div class="memo-card">
    <img :src="memo.image" alt="책 표지" class="thumbnail" />
    <div class="info">
      <div class="header">
        <h3 class="title">{{ memo.title }}</h3>
        <span class="date">{{ memo.date }}</span>
      </div>
      <p class="content">{{ memo.content }}</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  memo: Object
})
</script>

<style scoped>
.memo-card {
  display: flex;
  background-color: #fff;
  margin: 8px 16px;
  padding: 12px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  align-items: flex-start;
}
.thumbnail {
  width: 50px;
  height: 70px;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 12px;
}
.info {
  flex: 1;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.title {
  font-size: 15px;
  font-weight: 600;
}
.date {
  font-size: 12px;
  color: #aaa;
}
.content {
  font-size: 14px;
  color: #555;
  margin-top: 6px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
