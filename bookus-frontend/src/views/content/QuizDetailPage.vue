<template>
  <div class="quiz-detail-page">
    <HeaderComponent title="컨텐츠 상세" />

    <div class="question-title">
      (퀴즈) {{ content.title }}
    </div>

    <div class="reveal-date">{{ content.revealDate }} 공개</div>

    <div class="quiz-answer-box" :class="{ blur: !isRevealed }">
      <p v-if="isRevealed">정답: {{ content.answer }}</p>
      <p v-else>정답은 공개일 이후에 확인할 수 있어요</p>
    </div>

    <div class="answers">
      <AnswerCard
        v-for="(a, i) in answers"
        :key="i"
        :answer="a"
      />
    </div>

    <BottomNav />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import HeaderComponent from '@/components/common/HeaderComponent.vue'
import BottomNav from '@/components/common/BottomNav.vue'
import AnswerCard from '@/components/quiz/AnswerCard.vue'

const content = {
  title: '주인공의 첫 사랑 이름은?',
  revealDate: '25/05/05',
  answer: '리버이',
}

const today = '25/05/04' // 실서비스에서는 new Date() → yyyy/mm/dd 포맷 적용
const isRevealed = computed(() => today >= content.revealDate)

const answers = [
  { name: '심실핑', date: '25/05/02', text: '리버이' },
  { name: '귀욤잼', date: '25/05/03', text: '엘빈' },
]
</script>

<style scoped>
.quiz-detail-page {
  width: 100vw;
  max-width: 375px;
  margin: 0 auto;
  background: #fff;
  font-family: 'Noto Sans KR', sans-serif;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.question-title {
  padding: 12px 16px;
  font-size: 14px;
  background: #f0f0f0;
}
.reveal-date {
  padding: 8px 16px;
  font-size: 13px;
  color: #666;
}
.quiz-answer-box {
  margin: 12px 16px;
  padding: 20px;
  text-align: center;
  border-radius: 12px;
  background: #f5f5f5;
  font-size: 16px;
  font-weight: bold;
}
.quiz-answer-box.blur {
  filter: blur(4px);
  pointer-events: none;
  user-select: none;
}
.answers {
  padding: 0 16px 80px;
}
</style>
