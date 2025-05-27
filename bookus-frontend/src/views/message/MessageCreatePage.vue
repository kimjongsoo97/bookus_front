<template>
  <div class="note-create-page">
    <HeaderComponent title="쪽지보내기"/>    

    <!-- 입력 폼 -->
    <div class="form">
      <label>받는사람</label>
      <input v-model="receiver" type="text" placeholder="받는 사람을 입력하세요" />

      <label>쪽지 제목</label>
      <textarea v-model="title" rows="2" placeholder="제목을 입력하세요" />

      <label>쪽지 내용</label>
      <textarea v-model="content" rows="6" placeholder="쪽지 내용을 입력하세요" />
    </div>

    <!-- 생성 버튼 -->
    <button class="submit-btn" @click="createNote">생성하기</button>

    <BottomNav/>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import BottomNav from '@/components/common/BottomNav.vue';
import HeaderComponent from '@/components/common/HeaderComponent.vue';
import MessageAPI from '@/api/messageAPI';

const router = useRouter();
const route = useRoute();

const receiver = ref('');
const title = ref('');
const content = ref('');

// 쿼리에서 replyTo 파라미터가 있을 경우 자동으로 받는 사람 채우기
onMounted(() => {
  const replyTo = route.query.replyTo;
  if (replyTo) {
    receiver.value = replyTo;
  }
});

async function createNote() {
  if (!receiver.value || !title.value || !content.value) {
    alert('모든 항목을 입력해주세요.');
    return;
  }

  const messageData = {
    receiver: receiver.value,
    title: title.value,
    content: content.value,
  };

  try {
    const res=await MessageAPI.sendMessage(messageData);
    alert('쪽지가 성공적으로 생성되었습니다!');
    const newMessageId=res.data.id;
    receiver.value = '';
    title.value = '';
    content.value = '';

    router.push(`/message/${newMessageId}`); // 쪽지 목록으로 이동
  } catch (err) {
    console.error('쪽지 전송 실패:', err);
    alert('쪽지 전송에 실패했습니다.');
  }
}
</script>


<style scoped>
.note-create-page {
  max-width: 375px;
  padding: 16px;
  font-family: "Pretendard", sans-serif;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.back-btn,
.search-btn {
  font-size: 18px;
  background: none;
  border: none;
}

h2 {
  font-size: 16px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

label {
  font-weight: bold;
  font-size: 14px;
}

input,
textarea {
  border: 1px solid #999;
  border-radius: 8px;
  padding: 10px;
  font-size: 14px;

  resize: none;
}

.submit-btn {
  width: 100%;
  background-color: #00a1fd;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 0;
  margin-top: 24px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}

.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  max-width: 375px;
  margin: 0 auto;
  background: white;
  display: flex;
  justify-content: space-around;
  padding: 8px 0;
  border-top: 1px solid #ccc;
}

.bottom-nav button {
  background: none;
  border: none;
  font-size: 12px;
}
</style>
