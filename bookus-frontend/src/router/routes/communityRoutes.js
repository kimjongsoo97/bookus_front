import { isAuthenticated } from '@/util/guard'

export default [
  {
    path: '/community',
    name: 'communityList',
    component: () => import('@/views/community/CommunityPage.vue')
  },
  {
    path: '/community/create',
    name: 'create',
    component: () => import('@/views/community/CommunityCreatePage.vue'),
    beforeEnter:isAuthenticated,
  },
  {
    path:'/community/detail/:id',
    name:'communitydetail',
    component:() => import('@/views/community/CommunityDetailPage.vue'),
    beforEnter:isAuthenticated
  },

]