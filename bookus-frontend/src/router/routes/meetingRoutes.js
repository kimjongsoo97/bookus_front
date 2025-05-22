import { isAuthenticated } from '@/util/guard'

export default [
  {
    path: '/meeting',
    name: 'MeetingList',
    component: () => import('@/views/meeting/MeetingListPage.vue')
  },
  {
    path:'/meeting/create',
    name:'MeetingCreate',
    component:()=>import('@/views/meeting/MeetingCreatePage.vue')
  },
  {
    path: '/meeting/detail/:id',
    name: 'MeetingDetail',
    component: () => import('@/views/meeting/MeetingDetaiPage.vue')
  },
  {
    path:'/contents/quiz/:id',
    name:'QuizDetail',
    component:() => import('@/views/content/QuizDetailPage.vue')
  },
  {
    path:'/contents/review/:id',
    name:'ReviewDetail',
    component:()=> import('@/views/content/ReviewDetailPage.vue')
  },
]