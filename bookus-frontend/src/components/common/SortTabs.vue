<template>
  <div class="tabs">
    <div
      v-for="tab in tabs"
      :key="tab"
      :class="['tab', modelValue === tab ? 'active' : '']"
      @click="$emit('update:modelValue', tab)"
    >
      {{ tab }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  tabs: Array,
  modelValue: String,
})
</script>

<style scoped>
.tabs {
  display: flex;
  overflow-x: auto;         /* 탭이 넘치면 가로 스크롤 허용 */
  white-space: nowrap;
  border-bottom: 1px solid #ccc;
  margin: 0 16px;
}

.tab {
  flex-shrink: 0;            /* 텍스트 길이에 맞게 탭 너비 조정 */
  padding: 12px 16px;
  cursor: pointer;
  font-weight: 500;
  white-space: nowrap;       /* 줄바꿈 방지 */
}

.tab.active {
  color: #007bff;
  border-bottom: 2px solid #007bff;
}
</style>
