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

]