<template>
  <div>
    <MemoCard
      v-for="memo in memos"
      :key="memo.id"
      :memo="memo"
    />
  </div>
</template>

<script setup>
import MemoCard from './MemoCard.vue';
const props = defineProps({
  memos: Array
})
</script>
