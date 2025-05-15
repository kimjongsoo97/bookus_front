<template>
  <div class="comment-box">
    <div class="meta">
      <strong>{{ comment.name }}</strong> {{ comment.date }}
    </div>
    <p class="text">{{ comment.text }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  comment: Object
})
</script>

<style scoped>
.comment-box {
  background: #eee;
  border-radius: 10px;
  padding: 12px;
  margin-top: 12px;
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
