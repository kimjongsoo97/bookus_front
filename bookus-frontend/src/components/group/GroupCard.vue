<template>
  <div class="group-card">
    <img :src="group.image" />
    <div class="group-info">
      <p class="group-title">{{ group.title }}</p>
      <p class="group-desc">{{ group.description }}</p>
      <span class="d-day">{{ group.dday }}</span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  group: Object
})
</script>

<style scoped>
.group-card {
  display: flex;
  gap: 12px;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 10px;
}
.group-card img {
  width: 80px;
  height: 100px;
  object-fit: cover;
  border-radius: 6px;
}
.group-info {
  flex: 1;
}
.group-title {
  font-size: 14px;
  font-weight: bold;
}
.group-desc {
  font-size: 13px;
  color: #555;
  margin: 4px 0;
}
.d-day {
  font-size: 12px;
  color: orangered;
}
</style>
