<template>
  <div class="home">
    <!-- Header -->
    <div class="home-header">
      <h1 class="logo">BOOK<span class="highlight">US</span></h1>
      <button class="search-btn" @click="goSearch"><i class="fa-brands fa-sistrix"></i></button>
    </div>

<!-- Book Carousel -->
<div class="carousel">
  <button class="nav-btn left" @click="prevBook">‹</button>

  <div class="carousel-wrapper">
    <div class="carousel-track" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
      <div
        class="carousel-item"
        v-for="(book, index) in randomBooks"
        :key="book.id"
        :class="{ active: index === currentIndex }"
        @click="goToDetailRandom(book.id)"
        >
        <img :src="getImageUrl(book.img)" alt="book cover" />
        <div class="carousel-title">{{ book.title }}</div>
        <div class="carousel-author">{{ book.author }}</div>
      </div>
    </div>
  </div>

  <button class="nav-btn right" @click="nextBook">›</button>
</div>

<!-- Recent Groups -->
<div class="section">
  <div class="section-title">
    <span>최근 생성된 모임</span>
    <span class="link" @click="goToMeeting">전체보기 ></span>
  </div>

  <transition name="slide-up" mode="out-in">
    <template v-if="recentMeetings.length > 0">
      <div
        class="recent-group-card"
        :key="currentMeetingIndex"
        @click="goToMeetingDetail(recentMeetings[currentMeetingIndex].id)"
      >
        <img
          v-if="recentMeetings[currentMeetingIndex].book_img"
          :src="getImageUrl(recentMeetings[currentMeetingIndex].book_img)"
          class="avatar"
          alt="book"
        />
        <div class="group-name">{{ recentMeetings[currentMeetingIndex].name }}</div>
        <span class="member-count">{{ recentMeetings[currentMeetingIndex].current_member_count }}명</span>
      </div>
    </template>
    <template v-else>
      <div class="recent-group-card">모임 정보 없음</div>
    </template>
  </transition>
</div>

    <!-- Best Sellers -->
    <div class="section">
      <div class="section-title">
        <span>금주의 베스트셀러</span>
      </div>
      <div class="bestsellers">
        <div class="book" v-for="(book, index) in bestSellers" :key="book.id" @click="goToDetail(book.id)">
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
      @click="goToCommunityDetail(post.id)"
    >
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

  <div v-else class="community-post empty">커뮤니티 글 없음</div>
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
const goSearch=() => router.push('/books/search')
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
const goToDetailRandom=(randomBookId)=>{
  router.push(`/books/detail/${randomBookId}`)
}
const goToDetail=(bookId)=>{
  router.push(`/books/detail/${bookId}`)
}
const goToMeetingDetail = (meetingId) => {
  router.push(`/meeting/detail/${meetingId}`)
}
const BASE_URL = 'http://localhost:8000'
function getImageUrl(path) {
  if (!path) return '/assets/bookus-logo.png';
  return path.startsWith('http') ? path : `${BASE_URL}${path}`
}
const currentIndex = ref(0)

const nextBook = () => {
  currentIndex.value = (currentIndex.value + 1) % randomBooks.value.length
}
const prevBook = () => {
  currentIndex.value =
    (currentIndex.value - 1 + randomBooks.value.length) % randomBooks.value.length
}
</script>

<style scoped>
.home {
  padding: 16px;
  padding-bottom: 80px;
  background-color: #fff;
  font-family: 'Pretendard', sans-serif;
}

.home-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* border-bottom: 1px solid #e6dada; */
  margin-bottom: 20px;
  
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
  position: relative;
  width: 100%;
  overflow: hidden;
  height: 300px;
}

.carousel-wrapper {
  width: 100%;
  overflow: hidden;
}

.carousel-track {
  display: flex;
  transition: transform 0.5s ease;
  width: 100%;
}

.carousel-item {
  flex: 0 0 100%;
  text-align: center;
  opacity: 0.5;
  transform: scale(0.8);
  transition: all 0.4s ease;
}

.carousel-item.active {
  opacity: 1;
  transform: scale(1);
}

.carousel-item img {
  width: 150px;
  height: 220px;
  object-fit: cover;
  border-radius: 12px;
  margin: auto;
}
.search-btn {
  font-size: 18px;
  background: none;
  border: none;
}
.carousel-title {
  margin-top: 8px;
  font-weight: bold;
}
.carousel-author {
  font-size: 14px;
  color: #666;
}

.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.8);
  border: none;
  font-size: 24px;
  cursor: pointer;
  z-index: 2;
  width: 32px;
  height: 32px;
  border-radius: 50%;
}
.nav-btn.left {
  left: 8px;
}
.nav-btn.right {
  right: 8px;
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

.recent-group-card {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 12px;
  padding: 10px 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  gap: 12px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.recent-group-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.group-name {
  flex: 1;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.member-count {
  font-size: 13px;
  color: #999;
  white-space: nowrap;
}

/* .count {
  margin-left: auto;
  font-size: 14px;
  color: #999;
} */

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
  display: flex;
  align-items: flex-start;
  background: #fff;
  padding: 12px;
  border-radius: 10px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.06);
  margin-bottom: 12px;
  gap: 12px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.community-post:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.community-post.empty {
  justify-content: center;
  color: #999;
  font-size: 14px;
  box-shadow: none;
  text-align: center;
}

.post-image {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 8px;
  flex-shrink: 0;
}

.post-text {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.post-text .title {
  font-size: 14px;
  font-weight: 600;
  color: #111;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.post-text .desc {
  font-size: 13px;
  color: #666;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 최대 2줄 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
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