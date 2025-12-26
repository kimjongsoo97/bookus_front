// src/api/contentApi.js
import api from "@/api";

const BASE_URL = "/api/v1/meeting";

const ContentAPI = {
  // 전체 컨텐츠 조회
  getContents(meetingId) {
    return api.get(`${BASE_URL}/detail/${meetingId}/contents/`);
  },

  // 컨텐츠 상세 조회
  getContentDetail(meetingId, contentId) {
    return api.get(
      `${BASE_URL}/detail/${meetingId}/contents/detail/${contentId}/`
    );
  },

  // 컨텐츠 생성
  createContent(meetingId, data) {
    return api.post(`${BASE_URL}/detail/${meetingId}/contents/create/`, data);
  },

  // 컨텐츠 삭제
  deleteContent(meetingId, contentId) {
    return api.delete(
      `${BASE_URL}/detail/${meetingId}/contents/delete/${contentId}/`
    );
  },

  // 토론 답글 등록
  createDiscussionReply(meetingId, contentId, data) {
    return api.post(
      `${BASE_URL}/detail/${meetingId}/contents/${contentId}/discussion/replies/`,
      data
    );
  },

  // 토론 답글 삭제
  deleteDiscussionReply(meetingId, contentId, replyId) {
    return api.delete(
      `${BASE_URL}/detail/${meetingId}/contents/${contentId}/discussion/replies/delete/${replyId}/`
    );
  },

  // 퀴즈 답글 등록
  createQuizReply(meetingId, contentId, data) {
    return api.post(
      `${BASE_URL}/detail/${meetingId}/contents/${contentId}/quiz/replies/`,
      data
    );
  },

  // 퀴즈 답글 삭제
  deleteQuizReply(meetingId, contentId, replyId) {
    return api.delete(
      `${BASE_URL}/detail/${meetingId}/contents/${contentId}/quiz/replies/delete/${replyId}/`
    );
  },

  // 독후감 등록
  createBookReview(meetingId, contentId, data) {
    return api.post(
      `${BASE_URL}/detail/${meetingId}/contents/${contentId}/book-reviews/`,
      data
    );
  },

  // 독후감 삭제
  deleteBookReview(meetingId, contentId, replyId) {
    return api.delete(
      `${BASE_URL}/detail/${meetingId}/contents/${contentId}/book-review/delete/${replyId}/`
    );
  },

  // 독후감 합본 조회
  getBookReviewCompilation(meetingId, contentId) {
    return api.get(
      `${BASE_URL}/detail/${meetingId}/contents/${contentId}/book-reviews/compilation/`
    );
  },
};

export default ContentAPI;
