import { isAuthenticated } from "@/util/guard";

export default [
  {
    path: "/meeting/detail/:meetingId/contents",
    name: "Content",
    component: () => import("@/views/content/ContentsPage.vue"),
    // 모임별 컨텐츠 리스트 페이지
  },
  {
    path: "/meeting/detail/:meetingId/contents/create",
    name: "CreateContent",
    component: () => import("@/views/content/CreateContentPage.vue"),
    beforeEnter: isAuthenticated, // 인증 가드 활성화 추천
  },
  {
    path: "/meeting/detail/:meetingId/contents/quiz/:id",
    name: "QuizDetail",
    component: () => import("@/views/content/QuizDetailPage.vue"),
  },
  {
    path: "/meeting/detail/:meetingId/contents/review/:id",
    name: "ReviewDetail",
    component: () => import("@/views/content/ReviewDetailPage.vue"),
  },
  {
    path: "/meeting/detail/:meetingId/contents/detail/:id",
    name: "ContentDetail",
    component: () => import("@/views/content/ContentDetailPage.vue"),
  },
];
