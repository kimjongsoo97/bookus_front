<template>
  <div class="post-item">
    <img :src="post.thumbnail" alt="thumbnail" class="thumb" />
    <div class="info">
      <h3 class="title">{{ post.title }}</h3>
      <p class="desc">{{ post.preview }}</p>
      <div class="meta">
        <span class="author">{{ post.author }}</span>
        <span class="tag">#{{ post.tag }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  post: Object
})
</script>

<style scoped>
.post-item {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}
.thumb {
  width: 50px;
  height: 70px;
  border-radius: 6px;
  object-fit: cover;
}
.info {
  flex: 1;
}
.title {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 4px;
}
.desc {
  font-size: 13px;
  color: #555;
  margin-bottom: 4px;
}
.meta {
  font-size: 12px;
  color: #777;
  display: flex;
  gap: 8px;
}
</style>
