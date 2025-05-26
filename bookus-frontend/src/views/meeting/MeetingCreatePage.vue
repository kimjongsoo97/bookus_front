<template>
  <div class="container">
    <HeaderComponent title="모임 생성 페이지" />

    <!-- Form -->
    <div class="form-section">
      <!-- 모임 이름 -->
      <div class="form-group">
        <label>모임 이름</label>
        <input
          type="text"
          v-model="form.name"
          placeholder="모임 이름을 입력해주세요."
        />
      </div>

      <!-- 모임 설명 -->
      <div class="form-group">
        <label>모임 설명</label>
        <textarea
          v-model="form.description"
          placeholder="모임 설명을 입력해주세요."
        ></textarea>
      </div>

      <!-- 책 선택 카드 -->
      <div class="card clickable" @click="goToChooseBook">
        <div class="icon-text">
          <img
            v-if="bookDetail?.image"
            :src="bookDetail.image"
            alt="책 표지"
            class="icon"
          />
          <div>
            <p class="label">책 선택</p>
            <p class="value">
              {{
                bookDetail
                  ? bookDetail.title + " - " + bookDetail.author
                  : "Choose Book"
              }}
            </p>
          </div>
        </div>
        <ChevronRightIcon class="chevron" />
      </div>

      <!-- 날짜 & 시간 -->
      <div class="card clickable" @click="showDatePicker = true">
        <div class="icon-text">
          <!-- <img src="/icons/calendar-icon.png" alt="달력 아이콘" class="icon" /> -->
          <div>
            <p class="label">날짜 & 시간</p>
            <p class="value">
              {{ form.meeting_date || "Choose date and time" }}
            </p>
          </div>
        </div>
        <ChevronRightIcon class="chevron" />
      </div>

      <!-- 최대 인원수 -->
      <div class="form-group">
        <label>최대 인원수</label>
        <input
          type="number"
          v-model.number="form.max_members"
          min="1"
          max="6"
          placeholder="최대 인원 (1~6)"
        />
      </div>

      <!-- 모임 장소 -->
      <div class="card">
        <div class="icon-text">
          <!-- <img src="/icons/location-icon.png" alt="위치 아이콘" class="icon" /> -->
          <div class="flex-grow" @click="goNaverMap">
            <p class="label">모임 장소</p>
           <p class="value strong">{{ form.map_directions.title || "오렌지 카페" }}</p>
<p class="value small">{{ form.map_directions.address || "역삼역 222동 22번지" }}</p>
            <button class="change-button" @click="changePlace">Change</button>
          </div>
          <ChevronRightIcon class="chevron" />
        </div>
      </div>
    </div>

    <!-- Submit Button -->
    <div class="submit-button">
      <button @click="createMeeting">모임 생성</button>
    </div>
    <DateTimePickerSheet
      v-if="showDatePicker"
      :min="new Date()"
      @select="onDateSelected"
      @close="showDatePicker = false"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { ChevronRightIcon } from "lucide-vue-next";
import HeaderComponent from "@/components/common/HeaderComponent.vue";
import MeetingAPI from "@/api/meetingAPI";
import BookAPI from "@/api/bookAPI";
import DateTimePickerSheet from "@/components/common/DateTimePickerSheet.vue";
import { useRoute, useRouter } from "vue-router";

const form = ref({
  book: "",
  name: "",
  description: "",
  meeting_date: "",
  meeting_directions: "강남역 근처 오렌지카페",
  map_directions: {
    title: "오렌지카페",
    address: "서울 강남구 강남대로 123",
    x: "127.027",
    y: "37.497",
  },
  max_members: 3,
});

const router = useRouter();
const route = useRoute();

const bookDetail = ref(null);
const goNaverMap=()=>{
  router.push('/maps')
}
onMounted(async () => {
  const { placeName, placeAddress, x, y } = route.query;

  const hasPlaceQuery = placeName && placeAddress && x && y;
  const saved = localStorage.getItem("meetingForm");

  if (saved) {
    const parsed = JSON.parse(saved);
    form.value = {
      ...form.value,
      ...parsed,
    };

    // ✅ map_directions는 query가 없을 때만 반영 (query 우선 유지)
    if (!hasPlaceQuery && parsed.map_directions) {
      form.value.map_directions = parsed.map_directions;
    }
  }

  // ✅ query가 있으면 최종적으로 덮어씌움
  if (hasPlaceQuery) {
    form.value.map_directions = {
      title: placeName,
      address: placeAddress,
      x,
      y,
    };
  }

  // 책 ID로 책 정보 불러오기
  const selectedBookId = route.query.book;
  if (selectedBookId) {
    form.value.book = selectedBookId;
    try {
      const response = await BookAPI.get(selectedBookId);
      bookDetail.value = response.data;
    } catch (error) {
      console.error("책 정보 불러오기 실패:", error);
    }
  }

  // 나머지 쿼리도 반영
  if (route.query.name) form.value.name = route.query.name;
  if (route.query.description) form.value.description = route.query.description;
});

const showDatePicker = ref(false);
const onDateSelected = ({ date, time }) => {
  // 날짜와 시간을 결합하여 form.datetime에 저장
  form.value.meeting_date = `${date} ${time}`;
  showDatePicker.value = false; // 시트 닫기
};

const goToChooseBook = () => {
  localStorage.setItem("meetingForm", JSON.stringify(form.value));
  router.push({
    name: "ChooseBook",
  }); // name 확인 필요
};

const createMeeting = async () => {
  try {
    console.log("모임 생성 요청 데이터:", form.value);

    const response = await MeetingAPI.create(form.value);
    localStorage.removeItem("meetingForm"); // ✅ 생성 성공 시 폼 제거

    console.log("모임 생성 성공:", response.data);
    if (!response.data.id) {
      console.error("응답에 id없음:", response.data);
      return;
    }
    // 생성된 모임 ID 등 활용하여 상세 페이지로 이동하거나 알림
    router.push({
      name: "MeetingDetail",
      params: { id: response.data.id },
    });
  } catch (error) {
    console.error("모임 생성 실패:", error.response?.data || error.message);
    alert("모임 생성에 실패했습니다. 입력 값을 확인해주세요.");
  }
};

const changePlace = () => {
  alert("장소 변경 기능은 추후 구현됩니다.");
};
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
