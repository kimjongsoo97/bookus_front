<template>
  <div class="community-create-page">
    <!-- 공통 헤더 -->
    <HeaderComponent title="커뮤니티 생성 페이지" />

    <!-- 작성 폼 -->
    <main class="form">
      <div class="form-group">
        <label>사진</label>
        <input type="file" @change="handleImageUpload" />
        <img
          v-if="imgPreview"
          :src="imgPreview"
          alt="preview"
          class="preview-img"
        />
      </div>

      <div class="form-group">
        <label>제목</label>
        <input v-model="title" type="text" placeholder="제목을 입력하세요" />
      </div>

      <div class="form-group">
        <label>내용</label>
        <textarea
          v-model="content"
          rows="5"
          placeholder="내용을 입력하세요"
        ></textarea>
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

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import HeaderComponent from "@/components/common/HeaderComponent.vue";
import BottomNav from "@/components/common/BottomNav.vue";
import CommunityAPI from "@/api/communityAPI";

const router = useRouter();

const title = ref("");
const content = ref("");
const imgFile = ref(null); // 실제 파일
const imgPreview = ref(null); // 미리보기 용

function handleImageUpload(event) {
  const file = event.target.files?.[0];
  if (file) {
    imgFile.value = file;

    const reader = new FileReader();
    reader.onload = (e) => {
      imgPreview.value = e.target?.result;
    };
    reader.readAsDataURL(file);
  }
}

async function submitPost() {
  if (!title.value || !content.value) {
    alert("제목과 내용을 입력해주세요.");
    return;
  }

  const formData = new FormData();
  formData.append("title", title.value);
  formData.append("content", content.value);
  if (imgFile.value) {
    formData.append("img", imgFile.value);
  }

  try {
    const res = await CommunityAPI.create(formData);
    alert("커뮤니티 글 작성이 완료되었습니다.");

    const newCommunityId = res.data.id;
    title.value = "";
    content.value = "";
    imgFile.value = null;
    imgPreview.value = "";

    router.push(`/community/detail/${newCommunityId}`);
  } catch (err) {
    console.error("커뮤니티 글 작성 실패:", err);
    alert("글 작성 중 오류가 발생했습니다.");
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
  margin-bottom: 70px;
  font-size: 16px;
  font-weight: bold;
  background-color: #00a3ff;
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
}
</style>
