<template>
  <div>
    <HeaderComponent title="쪽지함" />
    <SortTabs :tabs="['받은 쪽지', '보낸 쪽지']" v-model="selectedTab" />
    <MessageList :messages="filteredMessages" />
    <FloatingButton to="/message/create/" />
    <BottomNav />
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import HeaderComponent from '@/components/common/HeaderComponent.vue'
import SortTabs from '@/components/common/SortTabs.vue'
import MessageList from '@/components/message/MessageList.vue'
import BottomNav from '@/components/common/BottomNav.vue'
import MessageAPI from '@/api/messageAPI'
import FloatingButton from '@/components/common/FloatingButton.vue'

const selectedTab = ref('받은 쪽지')
const allMessages = ref([])
const isLoading = ref(false)

const fetchMessages = async () => {
  isLoading.value = true
  try {
    const res =
      selectedTab.value === '받은 쪽지'
        ? await MessageAPI.all() // 받은 쪽지
        : await MessageAPI.send() // 보낸 쪽지
    allMessages.value = res.data
  } catch (error) {
    console.error('쪽지 불러오기 실패:', error)
  } finally {
    isLoading.value = false
  }
}

// 탭 변경될 때마다 호출
watch(selectedTab, () => {
  fetchMessages()
})

// 최초 로딩 시 받은 쪽지 호출
onMounted(() => {
  fetchMessages()
})

const filteredMessages = computed(() =>
  allMessages.value.map(msg => ({
    id: msg.id,
    title: msg.title,
    preview: msg.content.slice(0, 30),
    sender: selectedTab.value === '받은 쪽지' ? msg.owner_nickname : msg.counterpart_nickname,
    date: new Date(msg.created_at).toLocaleDateString('ko-KR', {
      month: 'long',
      day: 'numeric'
    }),
    type: selectedTab.value === '받은 쪽지' ? 'received' : 'sent'
  }))
)
const messageActions = [
  {
    label: '쪽지 보내기',
    path: '/messages/send',
    icon: '✉️',
    color: '#00a1fd',
  }
]
</script>

    