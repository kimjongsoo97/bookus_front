<template>
  <div class="contents-page">
    <HeaderComponent title="우리들의 컨텐츠" />

    <div class="tab-bar">
      <button :class="{ active: sort === 'latest' }" @click="sort = 'latest'">
        최신 순
      </button>
      <button :class="{ active: sort === 'due' }" @click="sort = 'due'">
        마감 순
      </button>
    </div>

    <main class="content-list">
      <ContentListItem
        v-for="(item, i) in sortedContents"
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



const authData = JSON.parse(localStorage.getItem("auth"));
console.log(authData.user.id)
const userId = authData.user.id;

// ✅ 로그인 사용자 ID 가져오는 함수 (예시용)
function getCurrentUserId() {

  return parseInt(userId); // 또는 Pinia, Vuex에서 가져오기
}

const route = useRoute();
const router = useRouter();
const contents = ref([]);
const meetingLeaderId = ref(null); // 모임장 ID 저장
const sort = ref("latest")
const sortedContents = computed(() => {
  return [...contents.value].sort((a, b) => {
    const dateA = new Date(a.reveal_date);
    const dateB = new Date(b.reveal_date);
    if (sort.value === "latest") {
      return dateB.getTime() - dateA.getTime(); // 최신순: 나중 날짜 우선
    } else if (sort.value === "due") {
      return dateA.getTime() - dateB.getTime(); // 마감순: 빠른 날짜 우선
    }
    return 0;
  });
});


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

.tab-bar {
  display: flex;
  justify-content: start; /* 왼쪽 정렬 */
  border-bottom: 1px solid #ddd;
  margin-left: 28px; /* 왼쪽 여백 */
  position: relative;
  gap: 16px; /* 버튼 사이 간격 */
}

.tab-bar button {
  background: none;
  border: none;
  padding: 12px 0;
  font-weight: bold;
  color: #999;
  cursor: pointer;
  font-size: 14px;
  position: relative;
}

.tab-bar button.active {
  color: #00a1fd;
}

.tab-bar button.active::after {
  content: "";
  display: block;
  height: 2px;
  background-color: #00a1fd;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%; /* 텍스트 길이 기준 */
}

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
