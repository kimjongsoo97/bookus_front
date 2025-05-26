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
  <div class="left">
    <h3 class="message-title">{{ msg.title }}</h3>
  </div>
  <div class="right">
    <span class="message-sender">{{ msg.sender }}</span>
    <span v-if="msg.read_status === 'UNREAD'" class="badge-unread">읽지 않음</span>
  </div>
</div>

<p class="message-preview">{{ msg.preview }}...</p>

<div class="message-meta-wrapper">
  <span class="message-date">{{ msg.date }}</span>
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
  margin-bottom: 60px;
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

/* 제목 + 작성자 + 읽지 않음 뱃지 */
.message-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}

.left {
  display: flex;
  flex-direction: column;
}

.right {
  display: flex;
  align-items: center;
  gap: 6px;
}

.message-title {
  font-size: 15px;
  color: #333;
  margin: 0;
  
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 180px;
}

.message-item.unread .message-title {
  font-weight: bold;
}

.message-sender {
  font-size: 12px;
  color: #666;
  flex-shrink: 0;
}

.badge-unread {
  font-size: 11px;
  color: #0070f3;
  border: 1px solid #0070f3;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 500;
}

/* 내용 미리보기 */
.message-preview {
  margin-top: 6px;
  font-size: 13px;
  color: #666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 날짜 (오른쪽 아래) */
.message-meta-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-top: 4px;
}

.message-date {
  font-size: 12px;
  color: #999;
}

</style>
