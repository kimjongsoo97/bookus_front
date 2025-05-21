<template>
  <div class="memo-card" @click="$emit('click', memo.id)">
    <div class="memo-date">{{ formatDate(memo.date || memo.created_at) }}</div>
    <div class="memo-content">{{ memo.content }}</div>
  </div>
</template>

<script setup>
const props = defineProps({
  memo: Object
})

const formatDate = (isoString) => {
  if (!isoString) return ''
  const date = new Date(isoString)
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
</script>

<style scoped>
.memo-card {
  background-color: #fefefe;
  border-radius: 12px;
  padding: 16px;
  margin: 12px 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.06);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  cursor: pointer;
}

.memo-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.memo-date {
  font-size: 12px;
  color: #888;
  text-align: right;
}

.memo-content {
  font-size: 15px;
  color: #333;
  margin-top: 8px;
  line-height: 1.5;
  white-space: pre-wrap;
}
</style>
