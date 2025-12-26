<template>
  <div class="splash-container">
    <img src="@/assets/bookus-logo.png" alt="Bookus Logo" class="logo" />
    <p class="subtitle">함께 만들어가는 독서생활</p>
    <h1 class="title">BOOKUS</h1>
    <div class="home-indicator"></div>
  </div>
</template>

<script setup lang="ts">
// 이 컴포넌트는 props나 로직 없이 정적인 splash 화면입니다
</script>

<style scoped>
.splash-container {
  width: 100vw;
  height: 100vh;
  background-color: #00A3FF;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  color: white;
  font-family: 'Pretendard', sans-serif;
  overflow: hidden;
}

.logo {
  width: 96px;
  height: 96px;
  margin-bottom: 24px;
}

.subtitle {
  font-size: 16px;
  margin-bottom: 8px;
}

.title {
  font-size: 28px;
  font-weight: 800;
  letter-spacing: 1px;
}

.home-indicator {
  position: absolute;
  bottom: 20px;
  width: 134px;
  height: 5px;
  background-color: white;
  border-radius: 4px;
  opacity: 0.6;
}
</style>
