<template>
  <button class="fab" @click="goToTarget">
    +
  </button>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const props = defineProps({
  to: {
    type: String,
    required: true
  }
})

function goToTarget() {
  router.push(props.to)
}
</script>

<style scoped>
.fab {
  position: fixed;
  bottom: 80px;
  right: 20px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: #00a1fd;
  color: white;
  font-size: 28px;
  font-weight: bold;
  border: none;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  cursor: pointer;
  z-index: 1000;
}
</style>
