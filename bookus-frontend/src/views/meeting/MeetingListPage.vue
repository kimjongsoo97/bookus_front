<template>
  <div class="meeting-list-page">
    <HeaderComponent title="모임 전체 페이지" />

    <!-- 탭 필터 -->
    <div class="tab-bar">
      <button :class="{ active: sort === 'latest' }" @click="sort = 'latest'">
        최신 순
      </button>
      <button :class="{ active: sort === 'due' }" @click="sort = 'due'">
        마감 순
      </button>
    </div>

    <!-- 모임 리스트 -->
    <ul class="meeting-list">
      <li
        v-for="(item, i) in sortedMeetings"
        :key="i"
        class="meeting-item"
        @click="goToDetail(item.id)"
      >
        <div class="meeting-info">
          <div class="meeting-header">
            <h3 class="meeting-title">{{ item.name }}</h3>
            <span class="meeting-date">{{
              formatDate(item.meeting_date)
            }}</span>
          </div>

          <p class="meeting-desc">{{ item.description }}</p>

          <div class="meeting-footer">
            <span class="member-count"
              >인원수: {{ item.current_member_count }} /
              {{ item.max_members }}</span
            >
          </div>
        </div>
      </li>
    </ul>

    <BottomNav />
  </div>
</template>

<script setup lang="ts">
import HeaderComponent from "@/components/common/HeaderComponent.vue";
import BottomNav from "@/components/common/BottomNav.vue";
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import MeetingAPI from "@/api/meetingAPI";

const router = useRouter();

function goToDetail(id: number) {
  router.push({ name: "MeetingDetail", params: { id } });
}

const sort = ref("latest");
const meetings = ref([]);

onMounted(async () => {
  try {
    const response = await MeetingAPI.all();
    meetings.value = response.data;
  } catch (error) {
    console.error("모임 목록 불러오기 실패:", error);
  }
});

// 날짜 포맷 함수
function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(date.getDate()).padStart(2, "0")}`;
}

// 정렬된 목록 반환 (sort 값에 따라 동작)
const sortedMeetings = computed(() => {
  return [...meetings.value].sort((a, b) => {
    if (sort.value === "latest") {
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    } else if (sort.value === "due") {
      return (
        new Date(a.meeting_date).getTime() - new Date(b.meeting_date).getTime()
      );
    }
    return 0;
  });
});
</script>
<style scoped>
.meeting-list-page {
  width: 100vw;
  max-width: 375px;
  margin: 0 auto;
  font-family: "Pretendard", sans-serif;
  background: #fff;
  color: #1a1a1a;
  box-sizing: border-box;
}

.back-btn,
.search-btn {
  font-size: 18px;
  background: none;
  border: none;
  cursor: pointer;
}

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

.meeting-list {
  list-style: none;
  padding: 0 16px;
  margin-top: 12px;
}

.meeting-item {
  display: flex;
  align-items: flex-start;
  padding: 12px 0;
  border-bottom: 1px solid #eee;
}

.book-img {
  width: 60px;
  height: 90px;
  object-fit: cover;
  margin-right: 12px;
  border-radius: 6px;
}

.meeting-info {
  flex: 1;
  height: 95px;
}

.meeting-title {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 4px;
}

.meeting-desc {
  font-size: 12px;
  color: #666;
}

.meeting-due {
  font-size: 14px;
  color: #ff962d;
  margin-left: 8px;
  white-space: nowrap;
}

.bottom-nav {
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 375px;
  background: #fff;
  border-top: 1px solid #ddd;
  display: flex;
  justify-content: space-around;
  padding: 6px 0;
  font-size: 12px;
}

.bottom-nav button {
  background: none;
  border: none;
  text-align: center;
  color: #333;
}
</style>
