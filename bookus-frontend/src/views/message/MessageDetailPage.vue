<template>
  <div class="message-detail-page">
    <HeaderComponent title="쪽지 상세 페이지" />

    <div class="content">
      <p><strong>보낸 사람:</strong> {{ message.counterpart_nickname }}</p>

      <div class="section">
        <label>쪽지 제목</label>
        <div class="readonly-box">{{ message.title }}</div>
      </div>

      <div class="section">
        <label>쪽지 내용</label>
        <div class="readonly-box long">{{ message.content }}</div>
      </div>

<div class="button-group">
  <button
    v-if="message.is_sender === false"
    class="reply"
    @click="goToReply"
  >
    답장하기
  </button>

  <button class="delete" @click="deleteMessage">삭제하기</button>
</div>
    </div>

    <BottomNav />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import MessageAPI from '@/api/messageAPI'
import HeaderComponent from '@/components/common/HeaderComponent.vue'
import BottomNav from '@/components/common/BottomNav.vue'

const route = useRoute()
const router = useRouter()

const message = ref({})

onMounted(async () => {
  const messageId = route.params.id
  try {
    const res = await MessageAPI.get(messageId)
    message.value = res.data
  } catch (err) {
    console.error('쪽지 조회 실패:', err)
  }
})

function goToReply() {
  router.push({ path: '/message/create', query: { replyTo: message.value.counterpart_nickname } })
}

async function deleteMessage() {
  if (!confirm('정말 삭제하시겠습니까?')) return

  try {
    await MessageAPI.deleteMessage(message.value.id)
    alert('쪽지가 삭제되었습니다.')
    router.push('/message/')
  } catch (err) {
    console.error('삭제 실패:', err)
    alert('삭제에 실패했습니다.')
  }
}
</script>

<style scoped>
.message-detail-page {
  max-width: 375px;
  margin: 0 auto;
  padding: 16px;
  font-family: "Pretendard", sans-serif;
}

.content {
  margin-top: 20px;
}

.section {
  margin-top: 16px;
}

label {
  font-weight: bold;
  font-size: 14px;
  display: block;
  margin-bottom: 6px;
}

.readonly-box {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 12px;
  font-size: 14px;
  background: #f9f9f9;
}

.readonly-box.long {
  min-height: 100px;
  white-space: pre-wrap;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
  gap: 10px;
}

.reply {
  background-color: #00a1fd;
  color: white;
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-weight: bold;
}

.delete {
  background-color: #ff962d;
  color: white;
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-weight: bold;
}
</style>
