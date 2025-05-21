<template>
  <div class="container">
    <HeaderComponent title="메모 생성 페이지" />

    <!-- Form -->
    <div class="form-section">
      <!-- 내용 입력 -->
      <div class="form-group">
        <label>내용</label>
        <textarea v-model="body" placeholder="메모를 입력하거나 음성으로 기록하세요."></textarea>
        <button class="mic-button" @click="isRecording ? stopRecording() : startRecording()">
          🎤 {{ isRecording ? '녹음 중지' : '음성 메모 시작' }}
        </button>
      </div>
    </div>

    <!-- Submit Button -->
    <div class="submit-button">
      <button @click="submitMemo">생성하기</button>
    </div>

    <BottomNav />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import HeaderComponent from '@/components/common/HeaderComponent.vue'
import BottomNav from '@/components/common/BottomNav.vue'
import MemoAPI from '@/api/memoAPI'

const body = ref('')
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
        const response = await fetch('/api/v1/memo/memo/audio/', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
          body: formData,
        })

        const result = await response.json()
        if (response.ok) {
          body.value = result.content
        } else {
          alert(result.error || 'STT 실패')
        }
      } catch (err) {
        alert('오류 발생')
        console.error(err)
      }
    }

    audioChunks = []
    mediaRecorder.start()
    isRecording.value = true
  } catch (err) {
    alert('마이크 권한이 필요합니다')
  }
}

const stopRecording = () => {
  if (mediaRecorder && isRecording.value) {
    mediaRecorder.stop()
    isRecording.value = false
  }
}

const submitMemo = async () => {
  try {
    await MemoAPI.create({ content: body.value })
    alert('메모가 성공적으로 생성되었습니다.')
    body.value = ''
  } catch (error) {
    alert('메모 생성 중 오류가 발생했습니다.')
    console.error(error)
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
}

.form-section {
  flex: 1;
  margin-top: 16px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  font-size: 14px;
}

textarea {
  width: 100%;
  padding: 12px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-sizing: border-box;
  background-color: #f9f9f9;
  resize: none;
  height: 100px;
}

.mic-button {
  margin-top: 8px;
  padding: 8px 12px;
  font-size: 14px;
  border: 1px solid #00a3ff;
  background-color: #e6f4ff;
  color: #007acc;
  border-radius: 8px;
  cursor: pointer;
}

.submit-button {
  padding: 16px 0;
  background: #fff;
  border-top: 1px solid #eee;
}

.submit-button button {
  width: 100%;
  padding: 14px 0;
  background-color: #00a3ff;
  color: white;
  font-weight: bold;
  font-size: 16px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
}
</style>