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
    path: '/',
    name: 'home',
    component: BookSplash,
  },
  {
    path: '/maps',
    name: 'maps',
    component: MapView
  },

]


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
  
})

export default router
