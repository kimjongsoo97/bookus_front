<template>
  <div class="contents-page">
    <HeaderComponent title="우리들의 컨텐츠" />

    <main class="content-list">
      <ContentListItem
        v-for="(item, i) in contents"
        :key="i"
        :item="item"
      />
    </main>

    <footer class="footer">
      <button class="create-btn">생성하기</button>
    </footer>

    <BottomNav />
  </div>
</template>

<script setup lang="ts">
import HeaderComponent from '@/components/common/HeaderComponent.vue'
import BottomNav from '@/components/common/BottomNav.vue'
import ContentListItem from '@/components/contents/ContentListItem.vue'

const contents = [
  {
    month: 5,
    day: 2,
    type: '토론',
    title: '책을 읽었을 때 가장 먼저 떠오르는 이미지를 말해주세요!',
    replies: 1,
  },
  {
    month: 5,
    day: 5,
    type: '퀴즈',
    title: '주인공의 첫 사랑 이름은?',
    replies: 2,
  },
  {
    month: 5,
    day: 5,
    type: '독후감',
    title: '한 문장 적어가는 독후감',
    replies: 0,
  },
]
</script>

<style scoped>
.contents-page {
  width: 100vw;
  max-width: 375px;
  margin: 0 auto;
  background: #fff;
  font-family: 'Noto Sans KR', sans-serif;
  display: flex;
  flex-direction: column;
  height: 100vh;
  box-sizing: border-box;
}
.content-list {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
}
.footer {
  padding: 12px 16px;
  background: white;
  border-top: 1px solid #eee;
}
.create-btn {
  width: 100%;
  padding: 14px;
  font-size: 16px;
  font-weight: bold;
  background-color: #00a3ff;
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
}
</style>
