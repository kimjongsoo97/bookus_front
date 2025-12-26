<template>
  <div class="my-groups-page">
    <HeaderComponent title="내 모임" />
    <SortTabs :tabs="['최신 순', '마감 순']" v-model="selectedTab" />
    <GroupList :groups="filteredGroups" />
    <BottomNav />
  </div>
</template>

<script setup>
import HeaderComponent from '@/components/common/HeaderComponent.vue'
import SortTabs from '@/components/common/SortTabs.vue'
import GroupList from '@/components/group/GroupList.vue'
import BottomNav from '@/components/common/BottomNav.vue'

import { ref, computed } from 'vue'

const selectedTab = ref('최신 순')

const allGroups = ref([
  {
    id: 1,
    title: '설레임을 느껴볼까요',
    summary: '로맨스 소설을 읽고 행복해지고 싶어서...',
    dDay: 7,
    members: '4/6',
    image: 'img1.jpg',
  },
  // ... 다른 항목들
])

const filteredGroups = computed(() => {
  if (selectedTab.value === '마감 순') {
    return allGroups.value.slice().sort((a, b) => a.dDay - b.dDay)
  }
  return allGroups.value
})
</script>

<style scoped>
.my-groups-page {
  padding-bottom: 70px; /* BottomNav 공간 확보 */
}
</style>
