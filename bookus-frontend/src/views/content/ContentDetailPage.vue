<template>
  <div class="content-detail-page">
    <HeaderComponent title="컨텐츠 상세" />

    <!-- 질문 타이틀 -->
    <div class="question-title">
      ({{ content.type }}) {{ content.title }}
    </div>

    <!-- 질문 본문 -->
    <div class="question-box">
      {{ content.body }}
    </div>

    <!-- 답변 목록 -->
    <div class="answers">
      <AnswerCard
        v-for="(item, i) in answers"
        :key="i"
        :answer="item"
      />
    </div>

    <BottomNav />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import HeaderComponent from '@/components/common/HeaderComponent.vue'
import BottomNav from '@/components/common/BottomNav.vue'
import AnswerCard from '@/components/quiz/AnswerCard.vue'
import ContentAPI from '@/api/contentAPI'

const content = ref({
  type: '',
  title: '',
  body: ''
})

const answers = ref([])

const route = useRoute()

console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
console.log('params:', route.params)

onMounted(async () => {
  const contentId = route.params.id || route.params.contentId
  const meetingId=route.params.meeting_id || route.params.meetingId
  console.log(contentId)
  console.log(meetingId)
  try {
    const res = await ContentAPI.getContentDetail(meetingId, contentId) // axios 요청
    const data = res.data

    content.value = {
      type: data.content_type || '',
      title: data.title || '',
      body: data.body || ''
    }

    // 답변 데이터: 컨텐츠 타입에 따라 선택
    answers.value =
      data.discussion_replies || data.quiz_replies || data.book_reviews || []
  } catch (err) {
    console.error('컨텐츠 상세 조회 실패:', err)
  }
})
</script>
