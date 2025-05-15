<template>
  <div class="create-content-page">
    <HeaderComponent title="컨텐츠 생성 페이지" />

    <main class="form">
      <!-- 공통 입력 -->
      <div class="form-group">
        <label>컨텐츠 종류</label>
        <select v-model="type">
          <option value="독후감">독후감</option>
          <option value="토론">토론</option>
          <option value="퀴즈">퀴즈</option>
        </select>
      </div>

      <div class="form-group">
        <label>컨텐츠 제목</label>
        <input type="text" v-model="title" placeholder="제목 입력" />
      </div>

      <div class="form-group">
        <label>마감 날짜</label>
        <select v-model="dueDate">
          <option value="5/5 (월)">5/5 (월)</option>
          <option value="5/6 (화)">5/6 (화)</option>
        </select>
      </div>

      <!-- 조건부 입력 -->
      <template v-if="type === '독후감'">
        <div class="form-group">
          <label>컨텐츠 내용</label>
          <textarea v-model="content" placeholder="내용을 입력해주세요" />
        </div>

        <div class="form-group">
          <label>글자수 제한</label>
          <input type="number" v-model="charLimit" placeholder="예: 30" />
        </div>

        <div class="form-group">
          <label>챕터</label>
          <select v-model="chapter">
            <option value="하루챕터">하루챕터</option>
            <option value="챕터 2">챕터 2</option>
          </select>
        </div>
      </template>

      <template v-else-if="type === '토론'">
        <div class="form-group">
          <label>컨텐츠 내용</label>
          <textarea v-model="content" placeholder="토론 주제를 입력해주세요" />
        </div>
      </template>

      <template v-else-if="type === '퀴즈'">
        <div class="form-group">
          <label>정답 / 힌트</label>
          <input v-model="content" placeholder="정답: 힌트 예시" />
        </div>
      </template>
    </main>

    <footer class="footer">
      <button class="create-btn" @click="createContent">생성하기</button>
    </footer>

    <BottomNav />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import HeaderComponent from '@/components/common/HeaderComponent.vue'
import BottomNav from '@/components/common/BottomNav.vue'

const type = ref('독후감')
const title = ref('')
const dueDate = ref('')
const content = ref('')
const charLimit = ref(30)
const chapter = ref('하루챕터')

function createContent() {
  console.log('생성된 컨텐츠:', {
    type: type.value,
    title: title.value,
    dueDate: dueDate.value,
    content: content.value,
    charLimit: charLimit.value,
    chapter: chapter.value
  })
}
</script>

<style scoped>
.create-content-page {
  max-width: 375px;
  margin: 0 auto;
  font-family: 'Noto Sans KR', sans-serif;
  background: #fff;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.form {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
}
.form-group {
  margin-bottom: 16px;
}
label {
  display: block;
  font-weight: bold;
  margin-bottom: 6px;
}
input,
select,
textarea {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border-radius: 10px;
  border: 1px solid #ccc;
  box-sizing: border-box;
}
.footer {
  padding: 12px 16px;
  border-top: 1px solid #eee;
  background: white;
}
.create-btn {
  width: 100%;
  padding: 14px;
  font-weight: bold;
  font-size: 16px;
  background-color: #00a3ff;
  color: white;
  border: none;
  border-radius: 12px;
}
</style>
