<template>
  <div class="content-detail-page">
    <HeaderComponent title="컨텐츠 상세" />
    <div class="question-title">
      <h1>{{ content.title }}</h1>
    </div>
    <div class="question-box">
      {{ content.body }}
    </div>
    <div class="reply-form">
      <h3>
        {{
          content.type === "DISCUSSION"
            ? "토론 답변"
            : content.type === "QUIZ"
            ? "퀴즈 답변"
            : "독후감"
        }}
      </h3>

      <form @submit.prevent="submitReply">
        <textarea
          v-model="newReply"
          :placeholder="placeholderText"
          required
        ></textarea>
        <button type="submit">제출</button>
      </form>
    </div>
    <div class="answers">
      <h3 v-if="content.type === 'QUIZ'">퀴즈 답변</h3>
      <h3 v-else-if="content.type === 'DISCUSSION'">토론 답변</h3>
      <h3 v-else>독후감</h3>
      <div v-if="isLoading" class="loading">로딩 중...</div>
      <div v-else-if="filteredAnswers.length === 0" class="no-answers">
        아직 답변이 없습니다.
      </div>
      <AnswerCard
        v-for="a in filteredAnswers"
        :key="a.id"
        :answer="a"
        :content_id="contentId"
        :meeting_id="meetingId"
        :type="content.type"
        @deleted="handleDeleted"
      />
      <button
        v-if="content.type === 'BOOK_REVIEW'"
        @click="goToCompilation"
        class="compilation-btn"
      >
        완성된 독후감 확인하러 가기
      </button>
    </div>
    <button @click="deleteContent" class="delete-btn">삭제하기</button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useLoginStore } from "@/stores/login";
import HeaderComponent from "@/components/common/HeaderComponent.vue";
import AnswerCard from "@/components/contents/AnswerCard.vue";
import ContentAPI from "@/api/contentAPI";

// 상태 선언
const content = ref({ type: "", title: "", body: "" });
const answers = ref([]);
const newReply = ref("");
const isLoading = ref(false);
const loginStore=useLoginStore();

// 라우터 관련
const router = useRouter();
const route = useRoute();

// 로그인 사용자 정보
const auth = useLoginStore();
const contentId = route.params.id || route.params.contentId;
const meetingId = route.params.meeting_id || route.params.meetingId;

// 답변 필터링 (BOOK_REVIEW는 본인 것만)
const filteredAnswers = computed(() => {
  if (content.value.type === "BOOK_REVIEW") {
    const currentUserId = auth.userId;
    if (!currentUserId) return [];
    return answers.value.filter((answer) => {
      const answerUserId = answer.user || answer.user_id || answer.username;
      return answerUserId === currentUserId;
    });
  }
  return answers.value;
});

// 입력창 placeholder
const placeholderText = computed(() => {
  switch (content.value.type) {
    case "DISCUSSION":
      return "토론에 대한 답변을 입력하세요...";
    case "QUIZ":
      return "퀴즈 답변을 입력하세요...";
    case "BOOK_REVIEW":
      return "독후감을 입력하세요...";
    default:
      return "답변을 입력하세요...";
  }
});

// 답변 제출
const submitReply = async () => {
  if (!newReply.value.trim()) {
    alert("답변을 입력해주세요.");
    return;
  }

  try {
    let response;
    const payload = { body: newReply.value };

    switch (content.value.type) {
      case "DISCUSSION":
        response = await ContentAPI.createDiscussionReply(meetingId, contentId, payload);
        break;
      case "QUIZ":
        response = await ContentAPI.createQuizReply(meetingId, contentId, payload);
        break;
      case "BOOK_REVIEW":
        response = await ContentAPI.createBookReview(meetingId, contentId, payload);
        break;
      default:
        throw new Error("알 수 없는 컨텐츠 타입입니다.");
    }

    if (response.status === 201 || response.data?.detail?.includes("성공적으로")) {
      alert("답변이 성공적으로 제출되었습니다.");

      answers.value.push({
        body: newReply.value,
        user: auth.userId,
        user_nickname: auth.state.user.nickname  || "익명",
        created_at: new Date().toISOString(),
      });
      newReply.value = "";
    } else {
      alert("답변 제출에 실패했습니다.");
    }
  } catch (error) {
    console.error("답변 제출 실패:", error);
    alert(error.response?.data?.detail || "답변 제출 중 오류가 발생했습니다.");
  }
};

// 컨텐츠 삭제
const deleteContent = async () => {
  try {
    const response = await ContentAPI.deleteContent(meetingId, contentId);
    if (
      response.status === 200 ||
      response.status === 204 ||
      response.data?.detail?.includes("성공적으로")
    ) {
      alert(response.data?.detail || "컨텐츠가 성공적으로 삭제되었습니다.");
      router.push(`/meeting/detail/${meetingId}/contents/`);
    } else {
      alert("삭제에 실패했습니다. 다시 시도해주세요.");
    }
  } catch (error) {
    console.error("삭제 요청 실패:", error);
    alert(error.response?.data?.detail || "알 수 없는 에러가 발생했습니다.");
  }
};

// 독후감 합본 페이지로 이동
const goToCompilation = () => {
  router.push(`/meeting/detail/${meetingId}/contents/${contentId}/book-review-compilation`);
};

// 답변 삭제 시 리스트 갱신
const handleDeleted = (deletedId) => {
  answers.value = answers.value.filter((a) => a.id !== deletedId);
};

// 초기 데이터 불러오기
onMounted(async () => {
  isLoading.value = true;
  try {
    const res = await ContentAPI.getContentDetail(meetingId, contentId);
    content.value = {
      type: res.data.content_type || "",
      title: res.data.title || "",
      body: res.data.body || "",
    };
    answers.value = [
      ...(res.data.discussion_replies || []),
      ...(res.data.quiz_replies || []),
      ...(res.data.book_reviews || []),
    ];
  } catch (err) {
    console.error("컨텐츠 상세 조회 실패:", err);
    alert("컨텐츠를 불러오지 못했습니다.");
  } finally {
    isLoading.value = false;
  }
});
</script>

<style scoped>
.content-detail-page {
  max-width: 375px;
  padding: 0 16px; /* 좌우 간격 16px */
  font-family: "Pretendard", sans-serif;
  margin: 0 auto; /* 페이지 가운데 정렬 */
  background-color: #ffffff; /* 명시적 배경색 설정 */
}

.question-title,
.question-box {
  text-align: left; /* 텍스트 왼쪽 정렬 */
}

.reply-form {
  margin: 20px 0;
  text-align: left; /* 폼 전체 왼쪽 정렬 */
}

.reply-form form {
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* 폼 내부 요소 왼쪽 정렬 */
  width: 100%; /* 부모 컨테이너에 맞춤 */
}

.reply-form textarea {
  width: 100%; /* 전체 너비 */
  min-height: 100px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
  font-family: "Pretendard", sans-serif; /* Pretendard 폰트 */
  margin-bottom: 10px; /* 버튼과의 간격 */
  box-sizing: border-box; /* 패딩 포함 너비 계산 */
}

.reply-form button {
  padding: 8px 16px;
  background-color: #00A1FD;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-family: "Pretendard", sans-serif; /* Pretendard 폰트 */
  align-self: flex-start; /* 버튼 왼쪽 정렬 */
}

.reply-form button:hover {
  background-color: #0081CC; /* 호버 색상 */
}

.loading,
.no-answers {
  text-align: center; /* 로딩 및 답변 없음 텍스트 가운데 정렬 */
  padding: 20px;
  color: #888;
  font-family: "Pretendard", sans-serif; /* Pretendard 폰트 적용 */
}

.compilation-btn {
  width: 100%;
  padding: 14px;
  background-color: #00A1FD;
  color: white;
  border: none;
  border-radius: 12px;
  font-family: "Pretendard", sans-serif; /* Pretendard 폰트 적용 */
  text-align: center; /* 버튼 텍스트 가운데 정렬 */
  cursor: pointer;
}

.delete-btn {
  width: 100%;
  padding: 12px 0;
  background-color: #f44336;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 12px;
  transition: background-color 0.3s ease;
  font-family: "Pretendard", sans-serif; /* Pretendard 폰트 적용 */
  text-align: center; /* 버튼 텍스트 가운데 정렬 */
}

/* AnswerCard 내부 요소 가운데 정렬 */
.answers {
  text-align: center; /* AnswerCard 및 기타 요소 가운데 정렬 */
}

.answers h3 {
  text-align: left; /* 답변 제목은 왼쪽 정렬 */
}
</style>