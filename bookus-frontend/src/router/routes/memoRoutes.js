import { isAuthenticated } from '@/util/guard'

export default [
  {
    path: '/memo',
    name: 'MemoList',
    component: () => import('@/views/memo/MemoPage.vue'),
    beforeEnter:isAuthenticated

  },
  {
    path: '/memo/create',
    name: 'MemoCreate',
    component: () => import('@/views/memo/MemoCreatePage.vue'),
    beforeEnter:isAuthenticated 
  },
  {
    path: '/memo/detail/:id',
    name: 'MemoDetail',
    component: () => import('@/views/memo/MemoDetailPage.vue'),
    beforeEnter:isAuthenticated 
  }

]