import { createRouter, createWebHistory } from 'vue-router'
import MapView from '../views/MapView.vue'
import authRoutes from './routes/authRoutes'
import bookRoutes from './routes/bookRoutes'
import communityRoutes from './routes/communityRoutes'
import contentRoutes from './routes/contentRoutes'
import meetingRoutes from './routes/meetingRoutes'
import memoRoutes from './routes/memoRoutes'
import messageRoutes from './routes/messageRoutes'
import mypageRoutes from './routes/mypageRoutes'
import BookSplash from '@/views/BookSplash.vue'
import HomeView from '@/views/HomeView.vue'
import KakaoRedirectPage from '@/views/auth/KakaoRedirectPage.vue'
import KakaoJoinPage from '@/views/auth/KakaoJoinPage.vue'

const routes = [
  ...authRoutes,
  ...bookRoutes,
  ...communityRoutes,
  ...contentRoutes,
  ...meetingRoutes,
  ...memoRoutes,
  ...messageRoutes,
  ...mypageRoutes,
  {
    path: '/loading',
    name: 'loading',
    component: BookSplash,
  },
  {
    path: '/maps',
    name: 'maps',
    component: MapView
  },
  {
    path:'/',
    name:'home',
    component:HomeView
  },
    {
    path: '/auth/kakaojoin',
    name: 'KakaoRedirect',
    component: KakaoRedirectPage,
  }, 
   {
    path: '/auth/kakaojoin',
    name: 'KakaoJoin',
    component: KakaoJoinPage
  },
]


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
  
})

export default router
