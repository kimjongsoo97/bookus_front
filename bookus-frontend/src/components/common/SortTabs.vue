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
  border-bottom: 1px solid #ccc;
  margin: 0 16px;
}
.tab {
  flex: 1;
  text-align: center;
  padding: 12px 0;
  cursor: pointer;
  font-weight: 500;
}
.tab.active {
  color: #007bff;
  border-bottom: 2px solid #007bff;
}
</style>
