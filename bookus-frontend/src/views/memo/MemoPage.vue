<template>
  <div class="container">
    <HeaderComponent title="메모" />
    <MemoList :memos="memoList" @click-memo="goToDetail" />
    <BottomNav />
  </div>
</template>

<script setup>
import HeaderComponent from '@/components/common/HeaderComponent.vue'
import MemoList from '@/components/memo/MemoList.vue'
import BottomNav from '@/components/common/BottomNav.vue'

import MemoAPI from '@/api/memoAPI'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const memoList = ref([])
const router = useRouter()

onMounted(async () => {
  try {
    const res = await MemoAPI.all()
    memoList.value = res.data // API에서 받아온 데이터 저장
  } catch (err) {
    console.error('메모 불러오기 실패:', err)
  }
})

const goToDetail = (memoId) => {
  console.log('선택된 메모:', memoId) // 로그 찍어보기
  router.push(`/memo/detail/${memoId}`)
}
</script>
<style>
.container{
  font-family: 'Pretendard', sans-serif;

}
</style>