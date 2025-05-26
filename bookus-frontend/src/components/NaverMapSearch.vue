<template>
  <div class="place-setting-page">
    <div class="header">장소 설정 페이지</div>

    <div id="map" class="map-container"></div>

    <div class="place-info">
      <div class="label">상세주소</div>
      <div class="place-name">{{ selectedPlace?.title || '장소를 검색하세요' }}</div>
      <div class="place-address">{{ selectedPlace?.address }}</div>
    </div>

    <div class="search-box">
      <input
        v-model="keyword"
        @keydown.enter="searchPlace"
        placeholder="장소를 입력하세요"
        class="search-input"
      />
      <button @click="searchPlace" class="search-button">검색</button>
    </div>

    <button class="register-button" @click="registerPlace">장소등록</button>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
const map = ref(null)
const marker = ref(null)
const infoWindow = ref(null)
const keyword = ref('')
const selectedPlace = ref(null)
const router=useRouter()
onMounted(async () => {
  await nextTick()

  if (window.naver && window.naver.maps) {
    map.value = new naver.maps.Map('map', {
      center: new naver.maps.LatLng(37.5665, 126.9780), // 서울
      zoom: 13,
    })
  } else {
    console.error('네이버 지도 스크립트가 로드되지 않았습니다.')
  }
})

async function searchPlace() {
  if (!keyword.value) {
    alert('검색어를 입력해주세요.')
    return
  }

  try {
    const res = await fetch(`http://localhost:8000/api/v1/meeting/naver/search/?query=${encodeURIComponent(keyword.value)}`)
    const data = await res.json()

    if (!data.items || data.items.length === 0) {
      alert('장소를 찾을 수 없습니다.')
      return
    }

    const item = data.items[0]

    const lng = parseFloat(item.mapx) / 10000000
    const lat = parseFloat(item.mapy) / 10000000
    const latlng = new window.naver.maps.LatLng(lat, lng)

    map.value.setCenter(latlng)
    map.value.setZoom(15)

    if (!marker.value) {
      marker.value = new window.naver.maps.Marker({
        position: latlng,
        map: map.value,
      })
    } else {
      marker.value.setPosition(latlng)
      marker.value.setMap(map.value)
    }

    const cleanTitle = item.title.replace(/<[^>]*>?/g, '')

    // if (!infoWindow.value) {
    //   infoWindow.value = new window.naver.maps.InfoWindow({
    //     content: `<div style="padding:8px;font-size:13px;">${cleanTitle}</div>`,
    //   })
    // } else {
    //   infoWindow.value.setContent(`<div style="padding:8px;font-size:13px;">${cleanTitle}</div>`)
    // }

    // infoWindow.value.open(map.value, marker.value)

    selectedPlace.value = {
      title: cleanTitle,
      address: item.address,
      x: lng,
      y: lat,
    }

  } catch (err) {
    console.error('검색 실패:', err)
    alert('장소 검색 중 오류가 발생했습니다.')
  }
}

function registerPlace() {
  if (!selectedPlace.value) {
    alert('먼저 장소를 검색해주세요.')
    return
  }

  router.push({
    name: 'MeetingCreate',
    query: {
      placeName: selectedPlace.value.title,
      placeAddress: selectedPlace.value.address,
      x: selectedPlace.value.x,
      y: selectedPlace.value.y,
    },
  })
}
</script>

<style scoped>
.place-setting-page {
  max-width: 375px;
  margin: 0 auto;
  padding: 16px;
  font-family: 'Pretendard', sans-serif;
  background: #fff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.header {
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 12px;
}
.map-container {
  width: 100%;
  height: 200px;
  border: 1px solid #ddd;
  border-radius: 8px;
}
.place-info {
  margin-top: 16px;
  padding: 12px;
  border: 1px solid #eee;
  border-radius: 8px;
  background: #f9f9f9;
}
.label {
  font-size: 13px;
  color: #888;
  margin-bottom: 4px;
}
.place-name {
  font-weight: bold;
  font-size: 15px;
}
.place-address {
  font-size: 14px;
  color: #666;
}
.search-box {
  display: flex;
  gap: 8px;
  margin-top: 16px;
}
.search-input {
  flex: 1;
  padding: 8px;
  font-size: 14px;
  border-radius: 6px;
  border: 1px solid #ccc;
}
.search-button {
  padding: 8px 12px;
  font-size: 14px;
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
.register-button {
  margin-top: auto;
  margin-bottom: 12px;
  width: 100%;
  padding: 12px;
  font-size: 16px;
  font-weight: bold;
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
</style>
