<template>
  <div class="community-create-page">
    <!-- 공통 헤더 -->
    <HeaderComponent title="커뮤니티 생성 페이지" />

    <!-- 작성 폼 -->
    <main class="form">
      <div class="form-group">
        <label>사진</label>
        <input type="file" @change="handleImageUpload" />
        <img v-if="imagePreview" :src="imagePreview" alt="preview" class="preview-img" />
      </div>

      <div class="form-group">
        <label>제목</label>
        <input v-model="title" type="text" placeholder="제목을 입력하세요" />
      </div>

      <div class="form-group">
        <label>내용</label>
        <textarea v-model="body" rows="5" placeholder="내용을 입력하세요"></textarea>
      </div>
    </main>

    <!-- 하단 버튼 -->
    <footer class="footer">
      <button class="create-btn" @click="submitPost">생성하기</button>
    </footer>

    <!-- 하단 탭 -->
    <BottomNav />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import HeaderComponent from '@/components/common/HeaderComponent.vue'
import BottomNav from '@/components/common/BottomNav.vue'

const title = ref('')
const body = ref('')
const imagePreview = ref<string | null>(null)

function handleImageUpload(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      imagePreview.value = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

function submitPost() {
  alert(`제목: ${title.value}\n내용: ${body.value}`)
  // 실제 API 연동 또는 저장 로직 구현 가능
}
</script>

<style scoped>
.community-create-page {
  max-width: 375px;
  margin: 0 auto;
  font-family: 'Noto Sans KR', sans-serif;
  background: #fff;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.form {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
}
.form-group {
  margin-bottom: 16px;
}
label {
  display: block;
  font-weight: bold;
  margin-bottom: 6px;
}
input[type="text"],
textarea,
input[type="file"] {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border-radius: 10px;
  border: 1px solid #ccc;
  box-sizing: border-box;
}
.preview-img {
  width: 100%;
  max-height: 180px;
  object-fit: cover;
  margin-top: 8px;
  border-radius: 8px;
}
.footer {
  padding: 12px 16px;
  background: white;
  border-top: 1px solid #eee;
}
.create-btn {
  width: 100%;
  padding: 14px;
  font-size: 16px;
  font-weight: bold;
  background-color: #00a3ff;
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
}
</style>
