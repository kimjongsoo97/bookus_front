import { isAuthenticated } from '@/util/guard'

export default [
  {
    path: '/memo',
    name: 'MemoList',
    component: () => import('@/views/memo/MemoPage.vue'),
    // beforeEnter:isAuthenticated

  },

]