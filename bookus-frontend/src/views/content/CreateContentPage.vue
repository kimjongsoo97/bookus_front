<template>
  <div class="create-content-page">
    <HeaderComponent title="컨텐츠 생성 페이지" />

    <main class="form">
      <!-- 공통 입력 -->
      <div class="form-group">
        <label>컨텐츠 종류</label>
        <select v-model="type">
          <option value="BOOK_REVIEW">독후감</option>
          <option value="DISCUSSION">토론</option>
          <option value="QUIZ">퀴즈</option>
        </select>
      </div>

      <div class="form-group">
        <label>컨텐츠 제목</label>
        <input type="text" v-model="title" placeholder="제목 입력" />
      </div>

      <div class="form-group">
        <label>마감 날짜 및 시간</label>
        <div class="date-picker" @click="showDatePicker = true">
          {{ formattedDueDate || '날짜 선택' }}
        </div>
      </div>

      <!-- 조건부 입력 -->
      <template v-if="type === 'BOOK_REVIEW'">
        <div class="form-group">
          <label>컨텐츠 내용</label>
          <textarea v-model="content" placeholder="내용을 입력해주세요" />
        </div>

        <div class="form-group">
          <label>글자수 제한</label>
          <input type="number" v-model.number="charLimit" placeholder="예: 30" />
        </div>

        <div class="form-group">
          <label>챕터</label>
          <select v-model="chapter">
            <option value="하루챕터">하루챕터</option>
            <option value="챕터 2">챕터 2</option>
          </select>
        </div>
      </template>

      <template v-else-if="type === 'DISCUSSION'">
        <div class="form-group">
          <label>토론 주제</label>
          <textarea v-model="content" placeholder="토론 주제를 입력해주세요" />
        </div>
      </template>

      <template v-else-if="type === 'QUIZ'">
        <div class="form-group">
          <label>정답 / 힌트</label>
          <input v-model="content" placeholder="정답: 힌트 예시" />
        </div>
      </template>
    </main>

    <footer class="footer">
      <button class="create-btn" @click="createContentHandler">생성하기</button>
    </footer>

    <DateTimePickerSheet
      v-if="showDatePicker"
      @select="onDateSelected"
      @close="showDatePicker = false"
    />
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import HeaderComponent from '@/components/common/HeaderComponent.vue'
import DateTimePickerSheet from '@/components/common/DateTimePickerSheet.vue'
import ContentAPI from '@/api/contentAPI' // 실제 경로로 수정

export default {
  components: {
    HeaderComponent,
    DateTimePickerSheet,
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const meetingId = route.params.meetingId

    // Form state
    const type = ref('')
    const title = ref('')
    const dueDate = ref('')
    const content = ref('')
    const charLimit = ref(30)
    const chapter = ref('하루챕터')
    const showDatePicker = ref(false)

    const formattedDueDate = computed(() => {
      if (!dueDate.value) return ''
      const dateObj = new Date(dueDate.value)
      return dateObj.toLocaleString()
    })

    function onDateSelected({ date, time }) {
      dueDate.value = new Date(`${date}T${time}`).toISOString()
      showDatePicker.value = false
    }

    function validateForm() {
      if (!title.value.trim()) return '제목을 입력해주세요.'
      if (!dueDate.value) return '마감 날짜를 선택해주세요.'
      if (!content.value.trim()) return '내용을 입력해주세요.'

      if (type.value === 'BOOK_REVIEW') {
        if (!charLimit.value || charLimit.value <= 0) return '글자수 제한을 입력해주세요.'
        if (!chapter.value) return '챕터를 선택해주세요.'
      }

      return null
    }

    async function createContentHandler() {
      const error = validateForm()
      if (error) {
        alert(error)
        return
      }

      const payload = {
        title: title.value,
        content_type: type.value,
        reveal_date: dueDate.value,
        body: content.value,
      }

      if (type.value === 'BOOK_REVIEW') {
        payload.word_limit = charLimit.value
        payload.order = chapter.value
      }

      try {
        const res = await ContentAPI.createContent(meetingId, payload)
        const newContentId = res.data.id
        alert('컨텐츠가 성공적으로 생성되었습니다!')
        router.push(`/meeting/detail/${meetingId}/contents/${newContentId}`)
      } catch (err) {
        console.error(err)
        alert('컨텐츠 생성 중 오류가 발생했습니다.')
      }
    }

    return {
      type,
      title,
      dueDate,
      content,
      charLimit,
      chapter,
      showDatePicker,
      formattedDueDate,
      onDateSelected,
      createContentHandler,
    }
  },
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
.date-picker {
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #ccc;
  background: #f9f9f9;
  cursor: pointer;
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
