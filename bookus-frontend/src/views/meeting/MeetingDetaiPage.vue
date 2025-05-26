<template>
  <div class="meeting-detail-page">
    <!-- 상단 헤더 -->
    <header class="header">
      <button class="back-btn" @click="$router.back()">←</button>
      <h1>{{ meeting.name }}</h1>
      <button class="search-btn">🔍</button>
    </header>

    <!-- 스크롤 영역 -->
    <div class="scroll-container">
      <!-- 썸네일 이미지 -->
      <!-- <img :src="meeting.thumbnail_url" class="thumbnail" alt="모임 이미지" /> -->

      <!-- 모임장 / 소개 -->
      <section class="section" v-if="book.title">
        <p class="label">📚 선정된 책</p>
        <div class="book-info">
          <img :src="book.img" alt="책 커버" class="book-cover" />
        </div>
      </section>

      <section class="section">
        <p class="label">
          모임장: <strong>{{ meeting.creator_nickname }}</strong>
        </p>
        <p class="desc">모임소개: {{ meeting.description }}</p>
      </section>
      <section class="section" v-if="isParticipant && meeting.members">
        <p class="label">👥 참여 중인 멤버</p>
        <ul>
          <li v-for="member in meeting.members" :key="member.id">
            {{ member.user_nickname }}
          </li>
        </ul>
      </section>

      <!-- AI 추천 멘트 -->
      <div class="ai-box">
        <p>💡 AI가 추천하는 한마디</p>
        <strong>함께하면 더 재밌는 모임! 북어스를 시작해보세요!</strong>
      </div>

      <!-- 장소 및 날짜 -->
      <section class="section">
        <p class="label">모임장소 및 날짜</p>
        <!-- <img :src="meeting.map_image_url" class="map-img" /> -->
<!-- 상위 컴포넌트에서 조건 추가 -->
<NaverMap
  v-if="meeting.map_directions && meeting.map_directions.x && meeting.map_directions.y"
  :lat="Number(meeting.map_directions.y)"
  :lng="Number(meeting.map_directions.x)"
  :title="meeting.map_directions.title"
/>
<p class="desc">
  📍 {{ meeting.map_directions?.title || "모임 장소 미정" }}<br />
  📌 {{ meeting.map_directions?.address || meeting.location || "주소 정보 없음" }}<br />
  🕒 {{ formatDate(meeting.meeting_date) }}
</p>

      </section>

      <!-- 우리들만의 챌린지 -->
      <section class="section">
        <p class="label">
          우리들만의 챌린지
          <span v-if="contents.length" class="more" @click="goToContentsPage"
            >전체보기 ></span
          >
        </p>

        <!-- 컨텐츠 리스트가 존재하는 경우 -->
        <div v-if="contents.length" class="challenge-list">
          <div
            class="challenge"
            v-for="(item, i) in contents.slice(0, 2)"
            :key="i"
            @click="goToDetail(item.id)"
          >
            <span>{{ item.month }}월<br />{{ item.day }}</span>
            <p>{{ item.title }}</p>
          </div>
        </div>

        <!-- 컨텐츠 없고, 내가 참여자인 경우 -->
        <div v-else-if="isParticipant">
          <p>아직 컨텐츠가 없어요. 첫 컨텐츠를 생성해보세요!</p>
          <button
            class="create-btn"
            v-if="isCreator"
            @click="goToCreateContents"
          >
            컨텐츠 생성하기
          </button>
        </div>
      </section>

      <section class="section" v-if="!isParticipant">
        추천 모임
        <p class="label">이런 모임도 추천해요</p>
        <ul class="recommend-list">
          <li class="recommend">
            <div class="info">
              <strong>왕자 릴 사람</strong>
              <p>진심과 감정이 녹아있는...</p>
            </div>
            <span class="due">D-17</span>
          </li>
          <li class="recommend">
            <div class="info">
              <strong>온다온다 소년이 온다</strong>
              <p>6월 추천도서로 등록된 작품...</p>
            </div>
            <span class="due">D-17</span>
          </li>
        </ul>
        <section v-if="!isParticipant">
          <strong>마음에 드는 모임이 없나요?</strong>
          <p>모임을 직접 만들어 보세요</p>
          <button class="create-btn" @click="goToCreate">모임 만들기</button>
        </section>
      </section>
    </div>
    <button v-if="isParticipant && meeting.members" @click="withdrawMeeting">
      탈퇴하기
    </button>
    <!-- 고정 하단 버튼 -->
    <footer class="bottom-fixed" v-if="!isParticipant">
      <button class="join-btn" @click="joinMeeting">모임 참여하기</button>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import MeetingAPI from "@/api/meetingAPI";
import BookAPI from "@/api/bookAPI";
import { useLoginStore } from "@/stores/login"; // 실제 경로에 맞게 수정
import MeetingCreatePage from "./MeetingCreatePage.vue";
import NaverMap from "@/components/NaverMap.vue";
const loginStore = useLoginStore();
const router = useRouter();
const route = useRoute();

const myUserId = loginStore.userId;

const meeting = ref({
  name: "",
  creator_nickname: "",
  description: "",
  meeting_date: "",
  location: "", // fallback용
  book: "",
  members: [],
  map_directions: {
    title: "",
    address: "",
    x: "",
    y: "",
  }
});

const book = ref({
  title: "",
  author: "",
  img: "",
});

const contents = ref([]);

// 참여 여부 확인
const isParticipant = computed(() => {
  return meeting.value.members?.some((member) => member.user === myUserId);
});

const goToCreateContents = () => {
  router.push(`/meeting/detail/${route.params.id}/contents/create`);
};

const joinMeeting = async () => {
  const id = route.params.id;

  try {
    const response = await MeetingAPI.join(id);
    if (response.data?.success) {
      alert("모임에 성공적으로 참여하였습니다!");
      router.go(0); // 새로고침
    } else {
      alert("참여에 실패했습니다. 다시 시도해주세요.");
    }
  } catch (error) {
    if (error.response && error.response.data?.detail) {
      alert(error.response.data.detail);
    } else {
      alert("알 수 없는 에러가 발생했습니다.");
    }
    console.error("참여 요청 실패:", error);
  }
};

const withdrawMeeting = async () => {
  const id = route.params.id;

  try {
    const response = await MeetingAPI.withdraw(id);
    if (
      response.data?.detail.includes("성공적으로 탈퇴되었습니다") ||
      response.data?.detail.includes("모임장이 탈퇴하여 모임이 삭제되었습니다")
    ) {
      alert(response.data.detail); // 백엔드 메시지 표시
      router.push("/"); // 홈페이지로 리다이렉트
    } else {
      alert("탈퇴에 실패했습니다. 다시 시도해주세요.");
    }
  } catch (error) {
    if (error.response && error.response.data?.detail) {
      alert(error.response.data.detail);
    } else {
      alert("알 수 없는 에러가 발생했습니다.");
    }
    console.error("탈퇴 요청 실패:", error);
  }
};

const isCreator = computed(() => {
  return meeting.value.creator === myUserId;
});

const goToCreate = () => {
  router.push(`/meeting/create`);
};
const goToContentsPage = () => {
  router.push(`/meeting/detail/${route.params.id}/contents/`);
};

function goToDetail(contentId) {
  const meetingId = route.params.meetingId || route.params.id;
  router.push(`/meeting/detail/${meetingId}/contents/detail/${contentId}/`);
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
}

onMounted(async () => {
  const id = route.params.id;
  console.log(meeting.map_directions)
  try {
    const res = await MeetingAPI.get(id);
    meeting.value = res.data;
        // ✅ map_directions가 문자열이면 파싱\
    if (typeof meeting.value.map_directions === 'string') {
      try {
        meeting.value.map_directions = JSON.parse(meeting.value.map_directions);
      } catch (e) {
        console.warn('map_directions 파싱 실패:', e);
        meeting.value.map_directions = {
          title: '',
          address: '',
          x: '',
          y: '',
        };
      }
    }

    console.log("📍 좌표 확인", meeting.value.map_directions); // 이제 y 출력됨
    if (meeting.value.book) {
      const bookRes = await BookAPI.get(meeting.value.book);
      book.value = bookRes.data;
    }

    const contentRes = await MeetingAPI.getContents(id);
    contents.value = (contentRes.data || []).map((item) => {
      const date = new Date(item.reveal_date);
      return {
        ...item,
        month: date.getMonth() + 1,
        day: date.getDate(),
      };
    });
  } catch (err) {
    console.error("모임 상세 정보 조회 실패:", err);
  }
});
</script>

<style scoped>
.content-item {
  cursor: pointer;
}

.meeting-detail-page {
  width: 100vw;
  max-width: 375px;
  margin: 0 auto;
  background-color: #fff;
  font-family: "Noto Sans KR", sans-serif;
  display: flex;
  flex-direction: column;
  height: 100vh;
  box-sizing: border-box;
  position: relative;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;
  font-size: 16px;
  font-weight: bold;
  border-bottom: 1px solid #eee;
}

.back-btn,
.search-btn {
  font-size: 18px;
  border: none;
  background: none;
  cursor: pointer;
}

.scroll-container {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
}

.thumbnail {
  width: 100%;
  border-radius: 8px;
  margin-bottom: 12px;
}

.section {
  margin-bottom: 24px;
}

.label {
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 6px;
}

.more {
  font-size: 12px;
  color: #007bce;
  float: right;
}

.desc {
  font-size: 13px;
  color: #555;
}

.ai-box {
  background-color: #f5f7fa;
  border-radius: 10px;
  padding: 12px;
  font-size: 13px;
  margin-bottom: 20px;
}

.map-img {
  width: 100%;
  border-radius: 10px;
  margin: 8px 0;
}

.challenge-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.challenge {
  background: #f0f0f0;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  gap: 12px;
  font-size: 13px;
}

.challenge span {
  background: white;
  border-radius: 6px;
  width: 48px;
  height: 48px;
  text-align: center;
  font-weight: bold;
  font-size: 12px;
  padding-top: 4px;
}

.recommend-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.recommend {
  display: flex;
  align-items: flex-start;
  margin-bottom: 12px;
}

.recommend img {
  width: 50px;
  height: 75px;
  border-radius: 6px;
  margin-right: 10px;
}

.recommend .info {
  flex: 1;
  font-size: 13px;
}

.due {
  font-size: 12px;
  color: orange;
}

.create-btn {
  margin-top: 12px;
  width: 100%;
  padding: 12px;
  background: #eee;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  font-size: 14px;
}

.bottom-fixed {
  padding: 12px 16px;
  border-top: 1px solid #eee;
  background: white;
}

.join-btn {
  width: 100%;
  padding: 14px;
  font-size: 16px;
  font-weight: bold;
  background-color: #00a3ff;
  color: white;
  border: none;
  border-radius: 12px;
}
</style>
