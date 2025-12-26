<template>
  <div class="answer-box">
    <div class="meta">
      <strong>{{ answer.name }}</strong> {{ answer.date }}
    </div>
    <p class="text">{{ answer.text }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  answer: Object
})
</script>

<style scoped>
.answer-box {
  background: #eee;
  border-radius: 10px;
  padding: 12px;
  margin-bottom: 10px;
}
.meta {
  font-size: 12px;
  color: #555;
  margin-bottom: 4px;
}
.text {
  font-size: 14px;
  color: #222;
}
</style>
