<template>
  <div class="community-create-page">
    <HeaderComponent title="게시글 수정" />

    <main class="form">
      <div class="form-group">
        <label>사진</label>
        <input type="file" @change="handleImageUpload" />
        <img v-if="imgPreview" :src="imgPreview" alt="preview" class="preview-img" />
      </div>

      <div class="form-group">
        <label>제목</label>
        <input v-model="title" type="text" />
      </div>

      <div class="form-group">
        <label>내용</label>
        <textarea v-model="content" rows="5"></textarea>
      </div>
    </main>

    <footer class="footer">
      <button class="create-btn" @click="updatePost">수정 완료</button>
    </footer>

    <BottomNav />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import CommunityAPI from '@/api/communityAPI'
import HeaderComponent from '@/components/common/HeaderComponent.vue'
import BottomNav from '@/components/common/BottomNav.vue'

const router = useRouter()
const route = useRoute()
const postId = route.params.id

const title = ref('')
const content = ref('')
const imgFile = ref(null)
const imgPreview = ref(null)

onMounted(async () => {
  try {
    const res = await CommunityAPI.get(postId)
    const post = res.data
    title.value = post.title
    content.value = post.content
    imgPreview.value = `http://localhost:8000${post.img}`
  } catch (err) {
    console.error('수정 페이지 데이터 불러오기 실패:', err)
  }
})

function handleImageUpload(event) {
  const file = event.target.files?.[0]
  if (file) {
    imgFile.value = file
    const reader = new FileReader()
    reader.onload = (e) => {
      imgPreview.value = e.target?.result
    }
    reader.readAsDataURL(file)
  }
}

async function updatePost() {
  const formData = new FormData()
  formData.append('title', title.value)
  formData.append('content', content.value)
  if (imgFile.value) {
    formData.append('img', imgFile.value)
  }

  try {
    await CommunityAPI.update(formData, postId)
    alert('게시글이 수정되었습니다.')
    router.push(`/community/detail/${postId}`)
  } catch (err) {
    console.error('수정 실패:', err)
    alert('수정 중 오류가 발생했습니다.')
  }
}
</script>

<style scoped>
.community-create-page {
  max-width: 375px;
  margin: 0 auto;
  font-family: 'Pretendard', sans-serif;
  background: #fff;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.form {
  flex: 1;
  padding: 16px;
}
.form-group {
  margin-bottom: 16px;
}
input,
textarea {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border-radius: 10px;
  border: 1px solid #ccc;
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
