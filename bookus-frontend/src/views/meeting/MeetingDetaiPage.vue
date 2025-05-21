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

      <!-- AI 추천 멘트 -->
      <div class="ai-box">
        <p>💡 AI가 추천하는 한마디</p>
        <strong>함께하면 더 재밌는 모임! 북어스를 시작해보세요!</strong>
      </div>

      <!-- 장소 및 날짜 -->
      <section class="section">
        <p class="label">모임장소 및 날짜</p>
        <!-- <img :src="meeting.map_image_url" class="map-img" /> -->
        <p class="desc">
          📍 {{ meeting.location }}<br />
          🕒 {{ formatDate(meeting.meeting_date) }}
        </p>
      </section>

      <!-- 우리들만의 챌린지 -->
      <section class="section">
        <p class="label">
          우리들만의 챌린지 <span class="more">전체보기 ></span>
        </p>
        <div class="challenge-list">
          <!-- 추후 챌린지 배열 받아서 v-for 처리 가능 -->
          <div class="challenge">
            <span>5월<br />4</span>
            <p>책을 읽었을 때 가장 먼저 떠오른 이미지를 말해주세요!</p>
          </div>
          <div class="challenge">
            <span>5월<br />9</span>
            <p>같이 독후감을 작성해볼까요? 한 줄평 환영!</p>
          </div>
        </div>
      </section>

      <!-- 추천 모임 -->
      <section class="section">
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
        <button class="create-btn">모임 만들기</button>
      </section>
    </div>

    <!-- 고정 하단 버튼 -->
    <footer class="bottom-fixed">
      <button class="join-btn">모임 참여하기</button>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import MeetingAPI from "@/api/meetingAPI";
import BookAPI from "@/api/bookAPI";

const route = useRoute();
const meeting = ref({
  name: "",
  creator_nickname: "",
  description: "",
  meeting_date: "",
  location: "",
  book: "",
});

const book = ref({
  title: "",
  author: "",
  img: "",
});

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
}

onMounted(async () => {
  const id = route.params.id;
  try {
    const res = await MeetingAPI.get(id);
    meeting.value = res.data;

    // meeting에 book ID가 있으면 책 정보 불러오기
    if (meeting.value.book) {
      const bookRes = await BookAPI.get(meeting.value.book);
      book.value = bookRes.data;
    }
  } catch (err) {
    console.error("모임 상세 정보 조회 실패:", err);
  }
});
</script>

<style scoped>
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
