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
      <button class="create-btn" @click="handleCreate">생성하기</button>
    </footer>

    <BottomNav />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import HeaderComponent from "@/components/common/HeaderComponent.vue";
import BottomNav from "@/components/common/BottomNav.vue";
import ContentListItem from "@/components/contents/ContentListItem.vue";
import MeetingAPI from "@/api/meetingAPI";

// ✅ 로그인 사용자 ID 가져오는 함수 (예시용)
function getCurrentUserId() {
  return parseInt(localStorage.getItem("userId")); // 또는 Pinia, Vuex에서 가져오기
}

const route = useRoute();
const router = useRouter();
const contents = ref([]);
const meetingLeaderId = ref(null); // 모임장 ID 저장

onMounted(async () => {
  try {
    const meetingId = route.params.meetingId || route.params.id;

    const res = await MeetingAPI.getContents(meetingId);
    contents.value = (res.data || []).map((item) => {
      const date = new Date(item.reveal_date);
      return {
        ...item,
        month: date.getMonth() + 1,
        day: date.getDate(),
        replies:
          (item.discussion_replies?.length || 0) +
          (item.quiz_replies?.length || 0) +
          (item.book_reviews?.length || 0),
      };
    });

    // 👇 첫 번째 컨텐츠 creator를 모임장으로 간주
    if (contents.value.length > 0) {
      meetingLeaderId.value = contents.value[0].creator;
    }
  } catch (err) {
    console.error("컨텐츠 목록 조회 실패:", err);
  }
});

const goToCreate = () => {
  const meetingId = route.params.meetingId || route.params.id;
  router.push(`/meeting/detail/${meetingId}/contents/create`);
};

const goToDetail = (id) => {
  const meetingId = route.params.meetingId || route.params.id;
  router.push(`/meeting/detail/${meetingId}/contents/detail/${id}`);
};

// ✅ 생성 버튼 클릭 시 모임장 여부 확인
const handleCreate = () => {
  const currentUserId = getCurrentUserId();

  if (currentUserId !== meetingLeaderId.value) {
    alert("컨텐츠는 모임장만 생성할 수 있습니다.");
    return;
  }

  goToCreate();
};
</script>

<style scoped>
.contents-page {
  position: relative;
  padding-bottom: 120px; /* BottomNav + 버튼 공간 확보 */
}

.create-btn {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 70px; /* BottomNav 높이보다 위에 배치 */
  margin: 0 auto;
  width: 90%;
  max-width: 500px;
  padding: 12px 20px;
  background-color: #00a3ff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}
</style>
