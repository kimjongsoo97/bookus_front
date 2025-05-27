import { useLoginStore } from '@/stores/login'

export const isAuthenticated = (to, from, next) => {
  const auth = useLoginStore()

  if (!auth.isLogin) {
    console.log(' 로그인 필요')
    next({ name: 'login', query: { next: to.fullPath } })
  } else {
    console.log(' 로그인 인증됨')
    next()
  }
}