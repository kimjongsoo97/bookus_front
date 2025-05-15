import { isAuthenticated } from '@/util/guard'

export default[
    {
        path:'/message',
        name:'MessageList',
        component:()=> import('@/views/message/MessageListPage.vue'),
        // beforeEnter:isAuthenticated

    }
]