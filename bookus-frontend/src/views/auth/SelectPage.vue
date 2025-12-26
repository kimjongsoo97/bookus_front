<template>
  <div class="main-page">
    <img src="@/assets/bookus-logo.png" alt="Bookus Logo" class="logo" />

    <p class="subtitle">함께 만들어가는 독서생활</p>
    <h1 class="title">
      BOOK<span class="us">US</span>
    </h1>

<div class="button-group">
  <button class="btn signup" @click="goSignUp">회원가입</button>
  <button class="btn login" @click="goLogin">로그인</button>
<button class="btn kakao" @click="kakaoLogin">
  <img src="@/assets/kakao_login_medium_narrow.png" alt="카카오 로그인" class="kakao-img" />
</button>
</div>


    <!-- <div class="home-indicator"></div> -->
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';



const router=useRouter();
function goSignUp(){
 return router.push('/signup')
}
function goLogin(){
  return router.push('/login')
}

onMounted(() => {
  if (!window.Kakao.isInitialized()) {
    window.Kakao.init('') // 🔑
  }
})
function kakaoLogin() {
     console.log("kakaoLogin 호출됨")
  console.log("window.Kakao:", window.Kakao)
  console.log("window.Kakao.Auth:", window.Kakao?.Auth)

  if (!window.Kakao || !window.Kakao.Auth) {
    alert('⚠️ Kakao SDK가 아직 준비되지 않았습니다.')
    return
  }
  window.Kakao.Auth.login({
    scope: 'profile_nickname,account_email',
    success: function (authObj) {
            console.log('✅ 로그인 성공', authObj);  // ⭐ 이게 나와야 성공

      const access_token = authObj.access_token
      console.log(access_token)
      axios.post('/api/v1/accounts/kakao/login/', { access_token })
        .then(res => {
          const { access, refresh } = res.data
          localStorage.setItem('access_token', access)
          localStorage.setItem('refresh_token', refresh)

          router.push('/auth/kakaojoin') // 또는 '/mypage' 등 원하는 경로
        })
        .catch(err => {
          console.error('카카오 로그인 실패', err)
          alert('카카오 로그인 실패')
        })
    },
    fail: function (err) {
      console.error('카카오 로그인 에러', err)
    }
  })
}
</script>

<style scoped>
.main-page {
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  font-family: 'Pretendard', sans-serif;
  color: #222;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 80px;
  position: relative;
  box-sizing: border-box;
}

.logo {
  width: 96px;
  height: 96px;
  margin-bottom: 24px;
}

.subtitle {
  font-size: 16px;
  margin-bottom: 4px;
  color: #007BCE;
}

.title {
  font-size: 28px;
  font-weight: 800;
  letter-spacing: 1px;
  margin-bottom: 40px;
  color: #007BCE;
}

.title .us {
  color: #f7941e;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 80%;
  max-width: 300px;
  margin-top: auto;
  margin-bottom: 80px;
}

.btn {
  width: 100%;
  height: 48px;
  padding: 14px 0;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  box-sizing: border-box;
}


.signup {
  background-color: #f7941e;
  color: white;
}

.login {
  background-color: #00a3ff;
  color: white;
}
.kakao {
  background-color: transparent;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.kakao-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}

.icon {
  width: 20px;
  height: 20px;
}

.home-indicator {
  position: absolute;
  bottom: 20px;
  width: 134px;
  height: 5px;
  background-color: black;
  border-radius: 4px;
  opacity: 0.2;
}
</style>
