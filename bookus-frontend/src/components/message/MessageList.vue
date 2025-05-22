<template>
  <ul class="message-list">
    <li
      v-for="msg in messages"
      :key="msg.id"
      class="message-item"
      @click="goToDetail(msg.id)"
    >
      <h3>{{ msg.title }}</h3>
      <p>{{ msg.preview }}</p>
      <small>{{ msg.sender }} · {{ msg.date }}</small>
    </li>
  </ul>
</template>

<script setup>
import { useRouter } from 'vue-router'

defineProps({
  messages: Array
})

const router = useRouter()

function goToDetail(id) {
  router.push(`/messages/${id}`)
}
</script>

<style scoped>
.message-item {
  padding: 12px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
}
</style>
