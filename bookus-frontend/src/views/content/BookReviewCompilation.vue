<template>
  <div class="book-review-compilation-page">
    <HeaderComponent title="독후감 합본" />
    <transition name="slide-up" mode="out-in">
      <div class="compilation-content">
        <div v-if="isLoading" class="loading">로딩 중...</div>
        <div v-else-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>
        <div v-else-if="compilation" class="compiled-body">
          <h2 class="completion-message" style="align-items: center;">
            여러분들의 독후감입니다
          </h2>
          <pre>{{ compilation.compiled_body }}</pre>
        </div>
        <div v-else class="no-compilation">작성된 독후감이 없습니다.</div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import HeaderComponent from "@/components/common/HeaderComponent.vue";
import ContentAPI from "@/api/contentAPI";

// 상태 변수
const compilation = ref(null);
const isLoading = ref(false);
const errorMessage = ref("");

const router = useRouter();
const route = useRoute();

// API 호출 함수
const fetchCompilation = async () => {
  isLoading.value = true;
  const meetingId = route.params.meetingId || route.params.meeting_id;
  const contentId = route.params.id || route.params.contentId;

  try {
    const response = await ContentAPI.getBookReviewCompilation(
      meetingId,
      contentId
    );
    console.log("Compilation API Response:", response.data);
    if (response.status === 200) {
      compilation.value = response.data;
      errorMessage.value = "";
    } else {
      if (
        response.data?.detail === "아직 독후감 합본이 공개되지 않았습니다."
      ) {
        errorMessage.value =
          "아직 독후감 공개 날짜가 되지 않았어요 조금 만 더 기다려주세요!";
      } else {
        errorMessage.value =
          response.data?.detail || "독후감 합본을 불러오지 못했습니다.";
      }
    }
  } catch (err) {
    console.error("Compilation fetch failed:", err);
    if (
      err.response?.data?.detail ===
      "아직 독후감 합본이 공개되지 않았습니다."
    ) {
      errorMessage.value =
        "아직 독후감 공개 날짜가 되지 않았어요 조금 만 더 기다려주세요!";
    } else {
      errorMessage.value =
        err.response?.data?.detail || "독후감 합본을 불러오지 못했습니다.";
    }
  } finally {
    isLoading.value = false;
  }
};

// 마운트 시 실행
onMounted(() => {
  fetchCompilation();
});
</script>

<style scoped>

.book-review-compilation-page {
  padding: 16px;
  padding-bottom: 80px;
  background: transparent; /* 배경 투명으로 종이 질감 노출 */
  font-family: "Pretendard", sans-serif;
  max-width: 800px;
  margin: 0 auto;
  min-height: 100vh; /* 전체 높이 채우기 */
   background: url("@/assets/paperboard-texture.jpg") no-repeat center center
    fixed;
  background-size: cover;
  margin: 0;
  padding: 0;
}

.compilation-content {
  margin-top: 24px;
  background: rgba(255, 255, 255, 0.85); /* 반투명 흰색으로 질감 살짝 보이게 */
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05); /* 최소한의 그림자 */
  transition: all 0.2s ease-in-out;
}

.compilation-content:hover {
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.loading,
.error-message,
.no-compilation {
  text-align: center;
  font-size: 16px;
  color: #666;
  padding: 20px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  display: inline-block; /* 텍스트 크기에 맞게 조정 */
  position: relative;
}

.loading::after,
.error-message::after,
.no-compilation::after {
  content: "";
  position: absolute;
  bottom: -4px;
  left: 10%;
  right: 10%;
  height: 2px;
  background: linear-gradient(
    to right,
    transparent,
    #8b4513 30%,
    #8b4513 70%,
    transparent
  ); /* 연필 느낌 밑줄 */
  
}

.error-message {
  color: #d32f2f;
  font-weight: 500;
}

.no-compilation {
  color: #999;
}

.completion-message {
  font-size: 20px;
  font-weight: bold;
  color: #1d4ed8;
  margin-bottom: 20px;
  text-align: center;
  position: relative;
  display: inline-block;
}

.completion-message::after {
  content: "";
  position: absolute;
  bottom: -20px;
  left: 10%;
  right: 10%;
  height: 2px;
}

.compiled-body pre {
  white-space: pre-wrap;
  word-wrap: break-word;
  background: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 8px;
  font-size: 15px;
  line-height: 1.6;
  color: #333;
  font-family: "Nanum Pen Script", "Pretendard", sans-serif; /* 손글씨 폰트 추가 */
  position: relative;
}

.compiled-body pre::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 20px;
  right: 20px;
  height: 2px;
}

.back-btn {
  display: block;
  margin: 20px auto;
  padding: 12px 24px;
  background-color: #1d4ed8;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.back-btn:hover {
  background-color: #1e40af;
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
