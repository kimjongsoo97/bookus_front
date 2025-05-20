import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

const initState = {
  token: '',
  user: {
    id: '',
    email: '',
    nickname: '',
  }
}

export const useLoginStore = defineStore('auth', () => {
  const state = ref({ ...initState })

  const isLogin = computed(() => !!state.value.user.id)
  const userId = computed(() => state.value.user.id)
  const userEmail = computed(() => state.value.user.email)
  const nickname = computed(() => state.value.user.nickname)

  const decodeTokenToUser = (token) => {
    try {
      const payload = jwtDecode(token)
      return {
        id: payload.user_id || payload.userId || '',
        email: payload.email || '',
        nickname: payload.nickname || '',
      }
    } catch (e) {
      console.error('토큰 디코딩 실패:', e)
      return { id: '', email: '', nickname: '' }
    }
  }

  const login = async (user) => {
    try {
      const { data } = await axios.post('/api/v1/accounts/login/', user)
        console.log('서버 응답:', data); 
      if (!data.token) throw new Error('토큰이 없습니다')

      state.value.token = data.token
      state.value.user = data.user || decodeTokenToUser(data.token)

      localStorage.setItem('auth', JSON.stringify(state.value))
    } catch (error) {
      console.error('로그인 실패:', error)
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem('auth')
    state.value = { ...initState }
  }

  const getToken = () => state.value.token

  const load = () => {
    const auth = localStorage.getItem('auth')
    if (auth) {
      try {
        const parsed = JSON.parse(auth)
        state.value.token = parsed.token
        state.value.user = parsed.user || decodeTokenToUser(parsed.token)
      } catch (e) {
        console.warn('auth 파싱 실패:', e)
        logout()
      }
    }
  }

  load()

  return {
    state,
    userId,
    userEmail,
    nickname,
    isLogin,
    login,
    logout,
    getToken,
  }
})
