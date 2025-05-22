import { isAuthenticated } from '@/util/guard'

export default[
    {
        path:'/message',
        name:'MessageList',
        component:()=> import('@/views/message/MessageListPage.vue'),
        beforeEnter:isAuthenticated

    },
    {
        path:'/message/create',
        name:'MessageCreate',
        component:()=> import ('@/views/message/MessageCreatePage.vue'),
        beforeEnter:isAuthenticated
    },
    {
        path: '/message/:id',
        name: 'MessageDetail',
        component: () => import('@/views/message/MessageDetailPage.vue') 
    }


]