import { isAuthenticated } from '@/util/guard'

export default [
  {
    path: '/content',
    name: 'Content',
    component: () => import('@/views/content/ContentsPage.vue')
  },
  {
    path: '/content/create',
    name: 'CreateContent',
    component: () => import('@/views/content/CreateContentPage.vue'),
    // beforeEnter:isAuthenticated
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
  {
    path:'/content/detail/:id',
    name:'ContentDetail',
    component:()=> import ('@/views/content/ContentDetailPage.vue')
  }
]