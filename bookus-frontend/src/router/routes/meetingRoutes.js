export default [
  {
    path: '/meeting',
    name: 'MeetingList',
    component: () => import('@/views/meeting/MeetingListPage.vue')
  },
  {
    path: '/meeting/detail/:id',
    name: 'MeetingDetail',
    component: () => import('@/views/meeting/MeetingDetaiPage.vue')
  },
  {
    path:'/content/quiz/:id',
    name:'QuizDetail',
    component:() => import('@/views/content/QuizDetailPage.vue')
  },
  {
    path:'/content/review/:id',
    name:'ReviewDetail',
    component:()=> import('@/views/content/ReviewDetailPage.vue')
  },
]