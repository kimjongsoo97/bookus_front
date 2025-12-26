<template>
  <div class="content-item">
    <div class="date">
      <span>{{ item.month }}월</span>
      <strong>{{ item.day }}</strong>
    </div>
    <div class="info">
      <p class="type">{{ item.type }}</p>
      <p class="title">{{ item.title }}</p>
    </div>
    <div class="meta">💬 {{ item.replies }}</div>
  </div>
</template>

<script setup>
const props = defineProps({
  item: Object
})
</script>

<style scoped>
.content-item {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
  padding: 12px 0;
  gap: 12px;
}
.date {
  width: 48px;
  text-align: center;
  font-size: 13px;
  color: #444;
}
.date strong {
  display: block;
  font-size: 20px;
  font-weight: bold;
  color: #333;
}
.info {
  flex: 1;
}
.info .type {
  font-size: 12px;
  color: #777;
  margin-bottom: 4px;
}
.info .title {
  font-size: 14px;
  font-weight: 500;
  color: #111;
}
.meta {
  font-size: 12px;
  color: #aaa;
  white-space: nowrap;
}
</style>
