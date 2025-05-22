<template>
  <div class="container">
    <HeaderComponent title="모임 생성 페이지"/>

    <!-- Form -->
    <div class="form-section">
      <!-- 모임 이름 -->
      <div class="form-group">
        <label>모임 이름</label>
        <input type="text" v-model="form.name" placeholder="할 거 없으면 같이 책 읽자" />
      </div>

      <!-- 모임 설명 -->
      <div class="form-group">
        <label>모임 설명</label>
        <textarea v-model="form.description" placeholder="할 거 없으면 같이 책 읽자"></textarea>
      </div>

      <!-- 책 선택 -->
      <div class="card clickable">
        <div class="icon-text">
          <!-- <img src="/icons/book-icon.png" alt="책 아이콘" class="icon" /> -->
          <div>
            <p class="label">책 선택</p>
            <p class="value">{{ form.book || 'Choose Book' }}</p>
          </div>
        </div>
        <ChevronRightIcon class="chevron" />
      </div>

      <!-- 날짜 & 시간 -->
      <div class="card clickable">
        <div class="icon-text">
          <!-- <img src="/icons/calendar-icon.png" alt="달력 아이콘" class="icon" /> -->
          <div>
            <p class="label">날짜 & 시간</p>
            <p class="value">{{ form.datetime || 'Choose date and time' }}</p>
          </div>
        </div>
        <ChevronRightIcon class="chevron" />
      </div>

      <!-- 모임 장소 -->
      <div class="card">
        <div class="icon-text">
          <!-- <img src="/icons/location-icon.png" alt="위치 아이콘" class="icon" /> -->
          <div class="flex-grow">
            <p class="label">모임 장소</p>
            <p class="value strong">{{ form.placeName || '오렌지 카페' }}</p>
            <p class="value small">{{ form.place || '역삼역 222동 22번지' }}</p>
            <button class="change-button" @click="changePlace">Change</button>
          </div>
          <ChevronRightIcon class="chevron" />
        </div>
      </div>
    </div>

    <!-- Submit Button -->
    <div class="submit-button">
      <button @click="createGroup">모임 생성</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ChevronRightIcon } from 'lucide-vue-next'
import HeaderComponent from '@/components/common/HeaderComponent.vue'
import MeetingAPI from '@/api/meetingAPI'


const form = ref({
  name: '',
  description: '',
  book: '',
  datetime: '',
  place: '',
  placeName: '',
})

const createGroup = () => {
  console.log('모임 생성', form.value)
  // TODO: 서버에 전송 로직 추가
}

const changePlace = () => {
  alert('장소 변경 기능은 추후 구현됩니다.')
}
</script>

<style scoped>
.container {
  max-width: 375px;
  margin: 0 auto;
  padding: 24px 16px;
  background-color: #fff;
  min-height: 100vh;
  box-sizing: border-box;
}

.form-section {
  margin-top: 24px;
}

.form-group {
  margin-bottom: 24px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  font-size: 14px;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 12px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 12px;
  background-color: #f9f9f9;
  box-sizing: border-box;
}

.form-group textarea {
  resize: none;
  height: 100px;
}

.card {
  background-color: #fff;
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
}

.clickable {
  cursor: pointer;
}

.icon-text {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.icon {
  width: 20px;
  height: 20px;
  margin-top: 4px;
}

.label {
  font-size: 12px;
  color: #888;
  margin-bottom: 4px;
}

.value {
  font-size: 14px;
  margin: 0;
}

.value.strong {
  font-weight: bold;
}

.value.small {
  font-size: 12px;
  color: #aaa;
}

.change-button {
  font-size: 12px;
  color: #007bff;
  background: none;
  border: none;
  text-decoration: underline;
  margin-top: 4px;
  cursor: pointer;
  padding: 0;
}

.chevron {
  width: 16px;
  height: 16px;
  color: #ccc;
}

.submit-button {
  margin-top: 40px;
}

.submit-button button {
  width: 100%;
  padding: 14px 0;
  background-color: #007bff;
  color: white;
  font-weight: bold;
  font-size: 16px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
}
</style>