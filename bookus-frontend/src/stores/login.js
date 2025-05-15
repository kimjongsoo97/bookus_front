import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

const initState = {
  token: '',
  user: {
    id: '',
    name: '',
    nickname: '',
  }
}

export const useLoginStore = defineStore('auth', () => {
  const state = ref({ ...initState })

  const isLogin = computed(() => !!state.value.user.id)
  const userId = computed(() => state.value.user.id)
  const userName = computed(() => state.value.user.name)
  const nickname = computed(() => state.value.user.nickname)

  const decodeTokenToUser = (token) => {
    const payload = jwtDecode(token)
    return {
      userId: payload.userId,
      name:payload.userName,
      nickname:payload.nickname
    }
  }

  const login = async (member) => {
    const { data } = await axios.post('/api/auth/login', member)
    state.value = { ...data }
    localStorage.setItem('auth', JSON.stringify(state.value))
  }

  const logout = () => {
    localStorage.clear()
    state.value = { ...initState }
  }

  const getToken = () => state.value.token

  const changeProfile = (member) => {
    state.value.user.name = member.name
    state.value.user.nickname = member.nickname
    localStorage.setItem('auth', JSON.stringify(state.value))
  }

  const load = () => {
    const auth = localStorage.getItem('auth')
    if (auth !== null) {
      state.value = JSON.parse(auth)
      console.log('🔄 Auth loaded:', state.value)
    }
  }

  load()

  return {
    state,
    userId,
    userName,
    nickname,
    isLogin,
    login,
    logout,
    getToken,
    changeProfile,
  }
})
