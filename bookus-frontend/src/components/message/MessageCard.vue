<template>
  <div class="message-card">
    <h3 class="title">{{ message.title }}</h3>
    <p class="preview">{{ message.preview }}</p>
    <div class="meta">
      <span class="sender">{{ message.sender }}</span>
      <span class="date">{{ message.date }}</span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  message: Object
})
</script>

<style scoped>
.message-card {
  padding: 12px 16px;
  border-bottom: 1px solid #eee;
}
.title {
  font-weight: 600;
  font-size: 15px;
  margin-bottom: 4px;
}
.preview {
  font-size: 14px;
  color: #555;
  margin-bottom: 6px;
  line-height: 1.4;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.meta {
  font-size: 12px;
  color: #888;
  display: flex;
  justify-content: space-between;
}
</style>
