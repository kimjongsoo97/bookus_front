<template>
  <div class="answer-card">
    <div class="answer-header">
      <span class="nickname">{{ answer.user_nickname }}</span>
      <span class="date">{{ formatDate(answer.created_at) }}</span>
    </div>
    <p class="answer-body">{{ answer.body }}</p>

    <!-- 삭제 버튼 (작성자일 경우에만 보임) -->
    <div v-if="canDelete" class="delete-row">
      <button class="delete-btn" @click="deleteAnswer">삭제</button>
    </div>
  </div>
</template>

<script setup>
import ContentAPI from "@/api/contentAPI";
import { useLoginStore } from "@/stores/login";
import { computed } from "vue";
import { useRoute } from "vue-router";


const route=useRoute()
// Props 정의
const props = defineProps({
  answer: {
    type: Object,
    required: true,
  },
  contentId: {
    type: Number,
    required: true,
  },
  meetingId: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
    validator: (value) => ["DISCUSSION", "QUIZ", "BOOK_REVIEW"].includes(value),
  },
});

const emit = defineEmits(["deleted"]);

const auth = useLoginStore();

// 현재 로그인 유저가 작성자인지 확인
const canDelete = computed(() => {
  return props.answer.user === auth.userId;
});

// 날짜 포맷 함수
function formatDate(dateString) {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString("ko-KR", options);
}



// 삭제 요청
async function deleteAnswer() {
  if (!confirm("정말 삭제하시겠습니까?")) return;

  try {
    const meetingId = route.params.meetingId || route.params.meeting_id;
    const contentId = route.params.id || route.params.contentId;
    const typeLower = props.type.toLowerCase(); // 대문자(DISCUSSION) → 소문자(discussion)
    const replyId = props.answer.id;

    let response;
    switch (typeLower) {
      case "discussion":
        response = await ContentAPI.deleteDiscussionReply(
          meetingId,
          contentId,
          replyId
        );
        break;
      case "quiz":
        response = await ContentAPI.deleteQuizReply(
          meetingId,
          contentId,
          replyId
        );
        break;
      case "book_review":
        response = await ContentAPI.deleteBookReview(
          meetingId,
          contentId,
          replyId
        );
        break;
      default:
        throw new Error("알 수 없는 컨텐츠 타입입니다.");
    }

    alert("답글이 삭제되었습니다.");
    emit("deleted", replyId); // 삭제된 답글 ID를 부모에게 알림
  } catch (err) {
    console.error("삭제 실패:", err);
    alert(err.response?.data?.detail || "삭제에 실패했습니다.");
  }
}
</script>
<style scoped>
.answer-card {
  padding: 12px;
  border: 1px solid #eee;
  border-radius: 10px;
  margin-bottom: 12px;
  background-color: #f9f9f9;
}

.answer-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 13px;
  color: #555;
}

.nickname {
  font-weight: bold;
}

.answer-body {
  font-size: 14px;
  white-space: pre-wrap;
}

.delete-row {
  margin-top: 10px;
  text-align: right;
}

.delete-btn {
  background-color: #ff5c5c;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
}
</style>
