import { isAuthenticated } from '@/util/guard'

export default[
    {
        path:'/mypage',
        name:'MyPage',
        component:()=> import('@/views/mypage/MyPage.vue'),
        beforeEnter:isAuthenticated
    },
    {
        path:'/mypage/group',
        name:'MyGroupPage',
        component:()=> import('@/views/mypage/MyGroupPage.vue'),
        beforeEnter:isAuthenticated

    },
    // {
    //     path:'/message/detail/:id',
    //     name:'MessageDetail',
    //     component:()=> import('@/views/message/MessageDetailPage.vue')
    // },

]