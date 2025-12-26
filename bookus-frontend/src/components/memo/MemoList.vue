<template>
  <div>
    <MemoCard
      v-for="memo in memos"
      :key="memo.id"
      :memo="memo"
      @click="emit('click-memo', memo.id)"
    />
  </div>
</template>

<script setup>
import MemoCard from './MemoCard.vue'

const props = defineProps({
  memos: Array
})

const emit = defineEmits(['click-memo'])
</script>
