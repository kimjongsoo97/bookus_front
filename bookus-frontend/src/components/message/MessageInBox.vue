<template>
  <div>
    <HeaderComponent title="쪽지함" />
    <SortTabs :tabs="['받은 쪽지', '보낸 쪽지']" v-model="selectedTab" />
    <MessageList :messages="filteredMessages" />
    <BottomNav />
  </div>
</template>

<script setup>
import HeaderComponent from '@/components/HeaderComponent.vue'
import SortTabs from '@/components/SortTabs.vue'
import MessageList from '@/components/MessageList.vue'
import BottomNav from '@/components/BottomNav.vue'

import { ref, computed } from 'vue'

const selectedTab = ref('받은 쪽지')

const allMessages = ref([
  {
    id: 1,
    title: '독서 실 팀원으로 참여하실래요?',
    preview: '독서모임 팀원 모집 중인데 혹시 관심 있으신가요?',
    sender: '책읽는민지',
    date: '5월 13일',
    type: 'received',
  },
  {
    id: 2,
    title: '추천 책이 너무 좋았어요!',
    preview: '정말 추천해주신 책이 너무 인상 깊었어요...',
    sender: '나무늘보',
    date: '5월 12일',
    type: 'sent',
  }
])

const filteredMessages = computed(() =>
  allMessages.value.filter(msg =>
    selectedTab.value === '받은 쪽지' ? msg.type === 'received' : msg.type === 'sent'
  )
)
</script>
    