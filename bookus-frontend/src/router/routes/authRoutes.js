export default [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/auth/LoginPage.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('@/views/auth/SignUpPage.vue')
  },
  {
    path:'/select',
    name:'Select',
    component:() => import('@/views/auth/SelectPage.vue')
  },
  {
    path:'/welcome',
    name:'welcome',
    component:()=> import('@/views/auth/WelcomePage.vue')
  },
]