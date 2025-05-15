export default[
    {
        path:'/mypage',
        name:'MyPage',
        component:()=> import('@/views/mypage/MyPage.vue')
    },
    {
        path:'/mypage/group',
        name:'MyGroupPage',
        component:()=> import('@/views/mypage/MyGroupPage.vue')
    },
    // {
    //     path:'/message/detail/:id',
    //     name:'MessageDetail',
    //     component:()=> import('@/views/message/MessageDetailPage.vue')
    // },

]