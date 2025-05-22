<template>
  <ul class="message-list">
    <li
      v-for="msg in messages"
      :key="msg.id"
      class="message-item"
      :class="{ unread: msg.read_status === 'UNREAD' }"
      @click="handleRead(msg)"
    >
      <div class="message-header">
        <h3 class="message-title">{{ msg.title }}</h3>
        <span v-if="msg.read_status === 'UNREAD'" class="badge-unread">읽지 않음</span>

      </div>
      <p class="message-preview">{{ msg.preview }}...</p>
      <div class="message-meta-wrapper">
        <span class="message-meta">{{ msg.sender }} · {{ msg.date }}</span>
      </div>
    </li>
  </ul>
</template>

<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  messages: Array
})

const router = useRouter()

// 읽음 상태 UI 반영
function handleRead(msg) {
  if (msg.read_status === 'UNREAD') {
    msg.read_status = 'READ'
  }
  router.push(`/message/${msg.id}`)
}
</script>

<style scoped>
.message-list {
  padding: 0;
  margin: 0;
  list-style: none;
}

.message-item {
  padding: 14px 16px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  background-color: white;
  transition: background-color 0.2s;
}

.message-item.unread {
  background-color: #f0f7ff;
}
.message-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.meta-right {
  display: flex;
  align-items: center;
  gap: 8px;
}


.message-title {
  font-size: 15px;
  color: #333;
  margin: 0;
  font-weight: normal;
}

.message-item.unread .message-title {
  font-weight: bold;
}

.message-meta {
  font-size: 12px;
  color: #999;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.message-preview {
  margin-top: 6px;
  font-size: 13px;
  color: #666;
}
.left-side {
  display: flex;
  align-items: center;
  gap: 8px;
}
.badge-unread {
  font-size: 11px;
  color: #0070f3;
  border: 1px solid #0070f3;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 500;
}
</style>
