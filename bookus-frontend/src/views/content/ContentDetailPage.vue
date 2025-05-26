<template>
  <div class="content-detail-page">
    <HeaderComponent title="컨텐츠 상세" />
    <div class="question-title">
      ({{ content.type }})
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
      <div v-else-if="answers.length === 0" class="no-answers">
        아직 답변이 없습니다.
      </div>
      <AnswerCard
        v-for="a in answers"
        :key="a.id"
        :answer="a"
        :content-id="contentId"
        :meeting-id="meetingId"
        :type="content.type"
        @deleted="handleDeleted"
      />
    </div>
    <button @click="deleteContent">삭제하기</button>
    <!-- <BottomNav /> -->
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import HeaderComponent from "@/components/common/HeaderComponent.vue";
import BottomNav from "@/components/common/BottomNav.vue";
import AnswerCard from "@/components/contents/AnswerCard.vue";
import ContentAPI from "@/api/contentAPI";

function handleDeleted(deletedId) {
  answers.value = answers.value.filter((a) => a.id !== deletedId);
}
const content = ref({
  type: "",
  title: "",
  body: "",
});
const answers = ref([]);
const newReply = ref("");
const isLoading = ref(false);
const router = useRouter();
const route = useRoute();
const authData = JSON.parse(localStorage.getItem("auth"));

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

const submitReply = async () => {
  const meetingId = route.params.meetingId || route.params.meeting_id;
  const contentId = route.params.id || route.params.contentId;

  if (!newReply.value.trim()) {
    alert("답변을 입력해주세요.");
    return;
  }

  try {
    let response;
    const payload = { body: newReply.value };

    switch (content.value.type) {
      case "DISCUSSION":
        response = await ContentAPI.createDiscussionReply(
          meetingId,
          contentId,
          payload
        );
        break;
      case "QUIZ":
        response = await ContentAPI.createQuizReply(
          meetingId,
          contentId,
          payload
        );
        break;
      case "BOOK_REVIEW":
        response = await ContentAPI.createBookReview(
          meetingId,
          contentId,
          payload
        );
        break;
      default:
        throw new Error("알 수 없는 컨텐츠 타입입니다.");
    }

    if (
      response.status === 201 ||
      response.data?.detail?.includes("성공적으로")
    ) {
      alert("답변이 성공적으로 제출되었습니다.");
      answers.value.push({
        body: newReply.value,
        author: authData?.user?.username || "익명",
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

const deleteContent = async () => {
  const meetingId = route.params.meetingId || route.params.meeting_id;
  const contentId = route.params.id || route.params.contentId;

  try {
    const response = await ContentAPI.deleteContent(meetingId, contentId);
    if (
      response.status === 200 ||
      response.status === 204 ||
      (response.data?.detail &&
        response.data.detail.includes("컨텐츠가 성공적으로 삭제되었습니다"))
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

onMounted(async () => {
  isLoading.value = true;
  const contentId = route.params.id || route.params.contentId;
  const meetingId = route.params.meeting_id || route.params.meetingId;
  try {
    const res = await ContentAPI.getContentDetail(meetingId, contentId);
    console.log("API Response:", res.data);
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
    console.log("Answers:", answers.value);
  } catch (err) {
    console.error("컨텐츠 상세 조회 실패:", err);
    alert("컨텐츠를 불러오지 못했습니다.");
  } finally {
    isLoading.value = false;
  }
});
</script>

<style scoped>
.reply-form {
  margin: 20px 0;
}
.reply-form textarea {
  width: 100%;
  min-height: 100px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
}
.reply-form button {
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.reply-form button:hover {
  background-color: #0056b3;
}
.loading,
.no-answers {
  text-align: center;
  padding: 20px;
  color: #888;
}
</style>
