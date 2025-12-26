<template>
  <div>카카오 로그인 처리 중...</div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { onMounted } from 'vue'
import axios from 'axios'

const route = useRoute()
const router = useRouter()

onMounted(() => {
  const code = route.query.code

  axios.post('/accounts/kakao/callback/', { code })
    .then(res => {
      const { access, refresh } = res.data
      localStorage.setItem('access_token', access)
      localStorage.setItem('refresh_token', refresh)
      router.push('/home')
    })
    .catch(err => {
      console.error('카카오 로그인 실패', err)
      alert('로그인 실패')
    })
})
</script>
