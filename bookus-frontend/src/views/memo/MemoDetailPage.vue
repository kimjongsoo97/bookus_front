<template>
  <div class="container">
    <HeaderComponent title="메모 상세" />

    <div v-if="isLoading" class="loading">불러오는 중...</div>
    <div v-else class="memo-detail">
      <p class="date">{{ formatDate(memo.created_at) }}</p>

      <!-- 🎧 오디오 플레이어 -->
      <div v-if="memo.audio_url" class="audio-player">
        <audio :src="memo.audio_url" controls />
      </div>

      <!-- 📝 내용 보기/수정 -->
      <div v-if="!isEditing">
        <p class="content">{{ memo.content }}</p>
        <button class="edit-btn" @click="isEditing = true">✏️ 수정</button>
        <!-- 🎙️ 음성 수정 버튼 -->
        <button class="mic-btn" @click="isRecording ? stopRecording() : startRecording()">
          🎤 {{ isRecording ? '녹음 중지' : '음성으로 수정' }}
        </button>
      </div>

      <div v-else>
        <textarea v-model="editedContent" class="edit-textarea" />
        <div class="btn-group">
          <button class="save-btn" @click="saveEdit">저장</button>
          <button class="cancel-btn" @click="cancelEdit">취소</button>
        </div>
      </div>
    </div>

    <BottomNav />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import MemoAPI from '@/api/memoAPI'
import HeaderComponent from '@/components/common/HeaderComponent.vue'
import BottomNav from '@/components/common/BottomNav.vue'

const route = useRoute()
const router = useRouter()
const memoId = route.params.id

const memo = ref({})
const isLoading = ref(true)
const isEditing = ref(false)
const editedContent = ref('')

const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  return date.toLocaleString('ko-KR')
}

onMounted(async () => {
  try {
    const res = await MemoAPI.get(memoId)
    memo.value = res.data
    editedContent.value = res.data.content
  } catch (err) {
    alert('메모를 불러오는 데 실패했습니다.')
    console.error(err)
  } finally {
    isLoading.value = false
  }
})

const saveEdit = async () => {
  try {
    await MemoAPI.update({ content: editedContent.value }, memoId)
    memo.value.content = editedContent.value
    isEditing.value = false
    alert('메모가 수정되었습니다.')
  } catch (err) {
    alert('메모 수정에 실패했습니다.')
    console.error(err)
  }
}

const cancelEdit = () => {
  editedContent.value = memo.value.content
  isEditing.value = false
}

// 🎙️ 음성 녹음 관련
const isRecording = ref(false)
let mediaRecorder = null
let audioChunks = []

const startRecording = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    mediaRecorder = new MediaRecorder(stream)

    mediaRecorder.ondataavailable = (e) => {
      audioChunks.push(e.data)
    }

    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(audioChunks, { type: 'audio/wav' })
      const formData = new FormData()
      formData.append('audio', audioBlob)

      try {
        const response = await fetch(`/api/v1/memo/${memoId}/audio/`, {
          method: 'POST', // 또는 PUT (백엔드에 맞게)
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
          body: formData,
        })

        const result = await response.json()
        if (response.ok) {
          memo.value.content = result.content
          editedContent.value = result.content
          alert('음성으로 메모가 업데이트되었습니다.')
        } else {
          alert(result.error || 'STT 실패')
        }
      } catch (err) {
        alert('STT 오류 발생')
        console.error(err)
      }
    }

    audioChunks = []
    mediaRecorder.start()
    isRecording.value = true
  } catch (err) {
    alert('마이크 권한이 필요합니다.')
  }
}

const stopRecording = () => {
  if (mediaRecorder && isRecording.value) {
    mediaRecorder.stop()
    isRecording.value = false
  }
}
</script>

<style scoped>
.container {
  max-width: 375px;
  margin: 0 auto;
  padding: 24px 16px;
  background-color: #fff;
  min-height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  font-family: 'Pretendard', sans-serif;

}

.memo-detail {
  flex: 1;
  margin-top: 16px;
}

.date {
  font-size: 12px;
  color: #999;
  margin-bottom: 8px;
}

.content {
  font-size: 14px;
  line-height: 1.5;
  white-space: pre-wrap;
}

.audio-player {
  margin-bottom: 12px;
}

audio {
  width: 100%;
}

.edit-textarea {
  width: 100%;
  padding: 12px;
  font-size: 14px;
  border-radius: 10px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  background-color: #f9f9f9;
  resize: none;
  height: 120px;
  margin-bottom: 10px;
}

.edit-btn {
  margin-top: 12px;
  background: none;
  border: none;
  color: #00a3ff;
  cursor: pointer;
  font-size: 14px;
  text-decoration: underline;
}

.mic-btn {
  margin-top: 8px;
  padding: 8px 12px;
  font-size: 14px;
  border: 1px solid #00a3ff;
  background-color: #e6f4ff;
  color: #007acc;
  border-radius: 8px;
  cursor: pointer;
}

.btn-group {
  display: flex;
  gap: 8px;
}

.save-btn,
.cancel-btn {
  flex: 1;
  padding: 10px;
  font-size: 14px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
}

.save-btn {
  background-color: #00a3ff;
  color: white;
}

.cancel-btn {
  background-color: #eee;
  color: #555;
}
</style>
