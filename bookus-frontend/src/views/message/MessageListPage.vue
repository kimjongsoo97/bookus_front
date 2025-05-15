<template>
  <div>
    <MessageCard
      v-for="msg in messages"
      :key="msg.id"
      :message="msg"
    />
  </div>
</template>

<script setup>
import MessageCard from '@/components/message/MessageCard.vue'

const props = defineProps({
  messages: Array
})
</script>
