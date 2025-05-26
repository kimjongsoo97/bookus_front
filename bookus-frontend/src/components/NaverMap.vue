<template>
  <div class="place-setting-page">
    <div id="map" class="map-container"></div>
  </div>
</template>

<script setup>
import { onMounted, nextTick } from 'vue'

const props = defineProps({
  lat: {
    type: Number,
    required: true,
  },
  lng: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    default: '',
  },
})

let map = null
let marker = null

// ✅ 네이버 지도 스크립트 로드 대기 함수
function waitForNaverScript(callback, maxWait = 3000) {
  const interval = 100
  let waited = 0

  const check = () => {
    if (window.naver && window.naver.maps) {
      callback()
    } else if (waited < maxWait) {
      setTimeout(() => {
        waited += interval
        check()
      }, interval)
    } else {
      console.error('❌ 네이버 지도 스크립트 로드 실패 또는 시간 초과')
    }
  }

  check()
}

onMounted(async () => {
  await nextTick()

  waitForNaverScript(() => {
    const mapContainer = document.getElementById('map')
    const lat = Number(props.lat)
    const lng = Number(props.lng)

    if (!mapContainer || isNaN(lat) || isNaN(lng)) {
      console.error('🛑 DOM 또는 좌표가 유효하지 않습니다.', { lat, lng, mapContainer })
      return
    }

    const position = new naver.maps.LatLng(lat, lng)

    map = new naver.maps.Map(mapContainer, {
      center: position,
      zoom: 15,
    })

    marker = new naver.maps.Marker({
      position,
      map: map,
    })

    if (props.title) {
      const infoWindow = new naver.maps.InfoWindow({
        content: `<div style="padding:8px;font-size:13px;">${props.title}</div>`,
      })
      infoWindow.open(map, marker)
    }
  })
})
</script>

<style scoped>
.place-setting-page {
  max-width: 375px;
  margin: 0 auto;
  padding: 16px;
  font-family: 'Pretendard', sans-serif;
  background: #fff;
  display: flex;
  flex-direction: column;
}

.map-container {
  width: 100%;
  height: 200px;
  border: 1px solid #ddd;
  border-radius: 8px;
}
</style>
