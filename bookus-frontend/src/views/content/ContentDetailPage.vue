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

<script setup lang="ts">
import HeaderComponent from '@/components/common/HeaderComponent.vue'
import BottomNav from '@/components/common/BottomNav.vue'
import AnswerCard from '@/components/quiz/AnswerCard.vue'

const content = {
  type: '토론',
  title: '책을 읽었을 때 가장 먼저 떠오르는 이미지를 말해주세요!',
  body:
    '저는 이 책을 축축한 지하실이 가장 먼저 떠올랐어요! 여러분은 어떤 이미지가 가장 먼저 떠오르셨나요??',
}

const answers = [
  {
    name: '심실킴',
    date: '25/05/03',
    text: '넵 저도 축축한 지하실이 가장 먼저 떠올랐어요!',
  },
  {
    name: '귀욤잼',
    date: '25/05/03',
    text:
      '저는 주인공이 활약하기 전 떠오랐던 추억의 골목과 낡은 벽이 이 떠올랐어요!',
  },
]
</script>

<style scoped>
.content-detail-page {
  width: 100vw;
  max-width: 375px;
  margin: 0 auto;
  font-family: 'Noto Sans KR', sans-serif;
  background: #fff;
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.question-title {
  padding: 12px 16px;
  font-size: 14px;
  background: #f0f0f0;
  color: #333;
}
.question-box {
  background: #f5f5f5;
  margin: 12px 16px;
  padding: 16px;
  border-radius: 10px;
  font-size: 14px;
  line-height: 1.5;
  white-space: pre-wrap;
}
.answers {
  padding: 0 16px 80px;
}
</style>
