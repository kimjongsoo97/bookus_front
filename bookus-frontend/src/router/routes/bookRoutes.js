import { isAuthenticated } from '@/util/guard'
export default [
  {
    path: '/books',
    name: 'books',
    component: () => import('@/views/books/BookListPage.vue')
  },
  {
    path: '/books/detail/:id',
    name: 'detail',
    component: () => import('@/views/books/BookDetailPage.vue')
  },
  {
    path : '/books/search',
    name:'bookSearch',
    component:()=>import('@/views/books/BookSearch.vue')
  },
  {
    path:'/books/favorite',
    name:'bookFavorite',
    component:()=>import('@/views/books/BookFavoriteListPage.vue'),
    beforeEnter:isAuthenticated
  }
]