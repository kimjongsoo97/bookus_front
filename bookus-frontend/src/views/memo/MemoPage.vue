<template>
  <div>
    <HeaderComponent title="메모" />
    <MemoList :memos="memoList" />
    <BottomNav />
  </div>
</template>

<script setup>
import HeaderComponent from '@/components/common/HeaderComponent.vue'
import MemoList from '@/components/memo/MemoList.vue'
import BottomNav from '@/components/common/BottomNav.vue'

import MemoAPI from '@/api/memoAPI'
import { ref,onMounted } from 'vue'

const memoList = ref([])

onMounted(async () => {
  try {
    const res = await MemoAPI.all()
    memoList.value = res.data // API에서 받아온 데이터 저장
  } catch (err) {
    console.error('메모 불러오기 실패:', err)
  }
})
</script>
