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

const memoList = [
  {
    id: 1,
    image: 'book1.jpg',
    title: '모순',
    content: '사람은 참 모순적인 것 같다...',
    date: '25/04/10',
  },
  {
    id: 2,
    image: 'book2.jpg',
    title: '반전',
    content: 'KT가 범인이라니... 말도 안돼 ㅠㅠ',
    date: '25/04/14',
  },
  {
    id: 3,
    image: 'book3.jpg',
    title: '무소유',
    content: '부자의 정의란 음음...',
    date: '25/04/20',
  },
  {
    id: 4,
    image: 'book4.jpg',
    title: '빛과 실',
    content: '한작가님의 노벨상 수상 기념으로 독서 시작',
    date: '25/04/25',
  },
]
</script>
