<template>
  <div class="wrapper">
    <HeaderComponent title="내가 참여한 모임" />
    <div class="meeting-list-page">
      <ul class="meeting-list">
        <li
          v-for="(item, i) in meetings"
          :key="i"
          class="meeting-item"
          @click="goToDetail(item.id)"
        >
          <img v-if="item.book_img" :src="item.book_img" class="book-img" />
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
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import HeaderComponent from "@/components/common/HeaderComponent.vue";
import BottomNav from "@/components/common/BottomNav.vue";
import MeetingAPI from "@/api/meetingAPI";
import BookAPI from "@/api/bookAPI";

const router = useRouter();
const meetings = ref([]);

function goToDetail(id) {
  router.push({ name: "MeetingDetail", params: { id } });
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

onMounted(async () => {
  try {
    const response = await MeetingAPI.my();
    const fetchedMeetings = response.data;
    const enrichedMeetings = await Promise.all(
      fetchedMeetings.map(async (meeting) => {
        if (meeting.book) {
          try {
            const bookRes = await BookAPI.get(meeting.book);
            meeting.book_img = bookRes.data.img;
          } catch (e) {
            console.error("책 정보 가져오기 실패:", e);
            meeting.book_img = "";
          }
        } else {
          meeting.book_img = "";
        }
        return meeting;
      })
    );
    meetings.value = enrichedMeetings;
  } catch (error) {
    console.error("내 모임 목록 불러오기 실패:", error);
  }
});
</script>

<style scoped>

.wrapper {
  max-width: 375px;
  margin: 0 auto;
  font-family: "Pretendard", sans-serif;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: white;
}

.meeting-list-page {
  flex: 1;
  overflow-y: auto;
  padding: 8px 16px 80px;
  padding-top: 20px;
}

.meeting-list {
  list-style: none;
  padding: 0;
  margin-top: 12px;
}

.meeting-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  min-height: 100px;
}

.book-img {
  width: 72px;
  height: 100px;
  object-fit: cover;
  border-radius: 6px;
  flex-shrink: 0;
}

.meeting-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
}

.meeting-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: -20px;
  margin-top: -10px;
}

.meeting-title {
  font-size: 14px;
  font-weight: bold;
  color: #222;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.meeting-date {
  font-size: 12px;
  color: #888;
  white-space: nowrap;
  margin-left: 8px;
  flex-shrink: 0;
}

.meeting-desc {
  font-size: 13px;
  color: #666;
  line-height: 1.4;
  max-width: 375px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.meeting-footer {
  font-size: 10px;
  color: #555;
  text-align: right;
}
</style>
