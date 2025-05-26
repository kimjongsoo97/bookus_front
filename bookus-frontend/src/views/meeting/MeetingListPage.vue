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

      <FloatingButton to="/meeting/create" />

      <BottomNav />
    </div>
  </template>

  <script setup>
  import { ref, computed, onMounted } from "vue";
  import { useRouter } from "vue-router";
  import HeaderComponent from "@/components/common/HeaderComponent.vue";
  import BottomNav from "@/components/common/BottomNav.vue";
  import MeetingAPI from "@/api/meetingAPI";
  import BookAPI from "@/api/bookAPI";
  import FloatingButton from "@/components/common/FloatingButton.vue";

  const router = useRouter();

  const sort = ref("latest");
  const meetings = ref([]);

  function goToDetail(id) {
    router.push({ name: "MeetingDetail", params: { id } });
  }

  function formatDate(dateStr) {
    const date = new Date(dateStr);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}`;
  }

  // 정렬된 리스트 반환
  const sortedMeetings = computed(() => {
    return [...meetings.value].sort((a, b) => {
      if (sort.value === "latest") {
        return new Date(b.created_at) - new Date(a.created_at);
      } else if (sort.value === "due") {
        return new Date(a.meeting_date) - new Date(b.meeting_date);
      }
      return 0;
    });
  });

  // 전체 모임 및 책 이미지 불러오기
  onMounted(async () => {
    try {
      const response = await MeetingAPI.all();
      const fetchedMeetings = response.data;

      // 각 모임에 대해 책 정보 요청
      const enrichedMeetings = await Promise.all(
        fetchedMeetings.map(async (meeting) => {
          if (meeting.book) {
            try {
              const bookRes = await BookAPI.get(meeting.book);
              meeting.book_img = bookRes.data.img; // 이미지 속성 추가
            } catch (e) {
              console.error("책 정보 가져오기 실패:", e);
              meeting.book_img = ""; // 실패 시 빈 이미지 처리
            }
          } else {
            meeting.book_img = "";
          }
          return meeting;
        })
      );

      meetings.value = enrichedMeetings;
    } catch (error) {
      console.error("모임 목록 불러오기 실패:", error);
    }
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
  padding-bottom: 60px;
}

/* 탭 필터 버튼 */
.tab-bar {
  display: flex;
  justify-content: flex-start;
  border-bottom: 1px solid #ddd;
  margin-left: 28px;
  position: relative;
  gap: 16px;
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
  width: 100%;
}

/* 모임 리스트 */
.meeting-list {
  list-style: none;
  padding: 0 16px;
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

/* 제목과 날짜 */
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

/* 설명 */
.meeting-desc {
  font-size: 13px;
  color: #666;
  line-height: 1.4;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 인원 수 */
.meeting-footer {
  font-size: 10px;
  color: #555;
  text-align: right;
}

/* 마감 임박용 색상 (추후 확장용) */
.meeting-due {
  font-size: 14px;
  color: #ff962d;
  margin-left: 8px;
  white-space: nowrap;
}

/* 하단 고정 내비게이션 */
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

/* 기타 영역 */
.post-list {
  flex: 1;
  overflow-y: auto;
  padding: 8px 16px 80px; /* 하단 네비/버튼 가려짐 방지 */
}
</style>
