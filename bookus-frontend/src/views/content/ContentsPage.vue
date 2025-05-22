<template>
  <div class="contents-page">
    <HeaderComponent title="우리들의 컨텐츠" />

    <main class="content-list">
      <ContentListItem
        v-for="(item, i) in contents"
        :key="item.id"
        :item="item"
        @click="goToDetail(item.id)"
        class="content-item"
      />
    </main>

    <footer class="footer">
      <button class="create-btn" @click="goToCreate">생성하기</button>
    </footer>

    <BottomNav />
  </div>
</template>

<script setup >
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import HeaderComponent from '@/components/common/HeaderComponent.vue'
import BottomNav from '@/components/common/BottomNav.vue'
import ContentListItem from '@/components/contents/ContentListItem.vue'
import MeetingAPI from '@/api/meetingAPI'  // 실제 API 모듈 경로 맞게 수정

const route = useRoute()
const router = useRouter()

const contents = ref([])

onMounted(async () => {
  try {
    const meetingId = route.params.meetingId || route.params.id // 라우트 파라미터명 확인
    const res = await MeetingAPI.getContents(meetingId)
    console.log(res.data)

    contents.value = (res.data || []).map(item => {
      const date = new Date(item.reveal_date)
      return {
        ...item,
        month: date.getMonth() + 1,
        day: date.getDate(),
        replies: (item.discussion_replies?.length || 0) + (item.quiz_replies?.length || 0) + (item.book_reviews?.length || 0),
      }
    })
  } catch (err) {
    console.error('컨텐츠 목록 조회 실패:', err)
  }
})

const goToCreate = () => {
  const meetingId = route.params.meetingId || route.params.id
  router.push(`/meeting/${meetingId}/contents/create`)
}
function goToDetail(id) {
  const meetingId = route.params.meetingId || route.params.id

  router.push(`/meeting/${meetingId}/contents/detail/${id}`)
}

</script>

<style scoped>
.content-item {
  cursor: pointer;
}

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
