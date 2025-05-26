<template>
  <div class="review-detail-page">
    <HeaderComponent title="컨텐츠 상세" />

    <div class="question-title">
      ({{ content.type }}) {{ content.title }}
    </div>

    <div class="review-box">
      <p>{{ content.body }}</p>
    </div>

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

<script setup lang="ts">
import HeaderComponent from '@/components/common/HeaderComponent.vue'
import BottomNav from '@/components/common/BottomNav.vue'
import AnswerCard from '@/components/quiz/AnswerCard.vue'

const content = {
  type: '독후감',
  title: '한줄씩 만들어 가는 독후감',
  body:
    '7인의 발문으로 함께 독후감 작성 해봐요\n글자 수 제한은 30자 입니다!!!\n챕터 1 - 하루챕터, 챕터 2 - 귀찮챕터\n챕터 3 - 저, 챕터 4 - 티니탐님 입니다!',
}

const answers = [
  {
    name: '하츄핑',
    date: '25/05/01',
    text: '나는 이 책을 읽고...',
  },
  {
    name: '캬밍밍',
    date: '25/05/03',
    text: '주인공의 내면이 너무 인상적이었어요.',
  },
]
</script>

<style scoped>
.review-detail-page {
  width: 100vw;
  max-width: 375px;
  margin: 0 auto;
  font-family: 'Pretendard', sans-serif;
  background: #fff;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.question-title {
  padding: 12px 16px;
  font-size: 14px;
  background: #f0f0f0;
}
.review-box {
  background: #f5f5f5;
  margin: 12px 16px;
  padding: 16px;
  border-radius: 10px;
  font-size: 14px;
  white-space: pre-wrap;
}
.answers {
  padding: 0 16px 80px;
}
</style>
