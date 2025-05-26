<template>
  <div class="home">
    <!-- Header -->
    <div class="home-header">
      <h1 class="logo">BOOK<span class="highlight">US</span></h1>
      <button class="menu-btn">☰</button>
    </div>

    <!-- Book Carousel -->
    <div class="carousel">
      <div class="carousel-item active" v-for="(randombook,index) in randomBooks" :key="randombook.id">
          <img :src="getImageUrl(randombook.img)" alt="book cover" />

        <div class="carousel-title">{{randomBooks.title}}</div>
        <div class="carousel-author">{{randomBooks.author}}</div>
      </div>
    </div>

    <!-- Recent Groups -->
    <div class="section">
      <div class="section-title">
        <span>최근 생성된 모임</span>
        <span class="link" @click="goToMeeting">전체보기 ></span>
      </div>

      <transition name="slide-up" mode="out-in">
      <template v-if="recentMeetings.length > 0">
        <div class="recent-group" :key="currentMeetingIndex" @click="goToMeetingDetail(recentMeetings[currentMeetingIndex].id)">
          <div>{{ recentMeetings[currentMeetingIndex].name }}</div>
          <span class="count">{{ recentMeetings[currentMeetingIndex].current_member_count }}명</span>
        </div>
      </template>
      <template v-else>
        <div class="recent-group">모임 정보 없음</div>
      </template>
    </transition>

    </div>

    <!-- Best Sellers -->
    <div class="section">
      <div class="section-title">
        <span>금주의 베스트셀러</span>
      </div>
      <div class="bestsellers">
        <div class="book" v-for="(book, index) in bestSellers" :key="book.id">
          <div class="rank">{{ index + 1 }}</div>
          <img :src="getImageUrl(book.img)" alt="book cover" />
          <div class="book-info">
            <div class="title">{{ book.title }}</div>
            <div class="author">{{ book.author }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Hot Community -->
    <div class="section">
      <div class="section-title">
        <span>최근 작성된 커뮤니티</span>
        <span class="link" @click="goToCommunity">전체보기 ></span>
      </div>
      
      <div v-if="hotPosts.length > 0">
        <div
          class="community-post"
          v-for="post in hotPosts"
          :key="post.id"
        >
          <div class="post-item">
            <img
              v-if="post.img"
              :src="getImageUrl(post.img)"
              alt="thumbnail"
              class="post-image"
            />
            <div class="post-text">
              <div class="title">{{ post.title }}</div>
              <div class="desc">{{ post.content }}</div>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="community-post">커뮤니티 글 없음</div>
    </div>

    <!-- Bottom Navigation -->
    <BottomNav />
  </div>
</template>

<script setup>
import BottomNav from '@/components/common/BottomNav.vue'
import { ref, onMounted, onUnmounted }  from 'vue'
import { useRouter } from 'vue-router';

import MeetingAPI from '@/api/meetingAPI';
import CommunityAPI from '@/api/communityAPI';
import BookAPI from '@/api/bookAPI';

const router = useRouter();

const recentMeetings = ref([])
const currentMeetingIndex = ref(0)
let intervalId = null

const hotPosts = ref([])
const bestSellers = ref([])
const randomBooks=ref([])
onMounted(async () => {
  try {
    const meetingRes = await MeetingAPI.all()
    recentMeetings.value = meetingRes.data.slice(0, 5)


    if (recentMeetings.value.length > 0) {
      intervalId = setInterval(() => {
        currentMeetingIndex.value = (currentMeetingIndex.value + 1) % recentMeetings.value.length
      }, 7000)
    }
    const resRandomBook=await BookAPI.allRandom({limit:10})
    randomBooks.value=resRandomBook.data
    console.log(randomBooks.value)
    console.log(resRandomBook.data)
    console.log(resRandomBook.data)

    const bookRes = await BookAPI.all({ ordering: 'best_seller_rank', limit: 10 })
    bestSellers.value = bookRes.data


    const communityRes = await CommunityAPI.all()
    hotPosts.value = communityRes.data.slice(0, 2)

  } catch (err) {
    console.error('홈 데이터 불러오기 실패:', err)
  }
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})

const goToMeeting = () => {
  router.push("/meeting")
}

const goToCommunity = () => {
  router.push("/community")
}

const goToMeetingDetail = (meetingId) => {
  router.push(`/meeting/detail/${meetingId}`)
}
const BASE_URL = 'http://localhost:8000'
function getImageUrl(path) {
  if (!path) return ''
  return path.startsWith('http') ? path : `${BASE_URL}${path}`
}
// 캐러셀 이동 함수
const prevBook = () => {
  currentIndex.value = (currentIndex.value - 1 + randomBooks.value.length) % randomBooks.value.length
}
</script>

<style scoped>
.home {
  padding: 16px;
  padding-bottom: 80px;
  background-color: #fff;
  font-family: sans-serif;
}

.home-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logo {
  font-size: 24px;
  font-weight: bold;
  color: #1d4ed8;
}
.highlight {
  color: #f97316;
}
.menu-btn {
  font-size: 24px;
  background: none;
  border: none;
  cursor: pointer;
}

.carousel {
  margin: 16px 0;
  text-align: center;
}
.carousel-item img {
  width: 150px;
  height: 220px;
  object-fit: cover;
  border-radius: 12px;
}
.carousel-title {
  margin-top: 8px;
  font-weight: bold;
}
.carousel-author {
  font-size: 14px;
  color: #666;
}

.section {
  margin-top: 24px;
}
.section-title {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-weight: bold;
}
.link {
  font-size: 14px;
  color: #888;
  cursor: pointer;
}

.recent-group {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f5f5f5;
  padding: 8px;
  border-radius: 8px;
}
.count {
  margin-left: auto;
  font-size: 14px;
  color: #999;
}

.bestsellers {
  display: flex;
  overflow-x: auto;
  gap: 16px;
  padding-bottom: 8px;
  scroll-snap-type: x mandatory;
  scrollbar-width: thin;
}
.bestsellers::-webkit-scrollbar {
  height: 8px;
}
.bestsellers::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 4px;
}
.bestsellers .book {
  flex: 0 0 auto;
  width: 120px; /* 책 항목 너비 */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  scroll-snap-align: start;
}
.bestsellers .book img {
  width: 60px;
  height: 90px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 8px;
}
.rank {
  font-size: 16px;
  color: #f43f5e;
  font-weight: bold;
  margin-bottom: 4px;
}
.book-info {
  text-align: left;
}
.book-info .title {
  font-size: 14px;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100px;
}
.book-info .author {
  font-size: 12px;
  color: #666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100px;
}

.community-post {
  background: #f9f9f9;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 12px;
}
.community-post .title {
  font-weight: bold;
  margin-bottom: 4px;
}
.community-post .desc {
  font-size: 14px;
  color: #555;
}

.post-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}
.post-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
  flex-shrink: 0;
}
.post-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.4s ease;
}
.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
.slide-up-enter-to,
.slide-up-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>