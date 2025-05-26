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

onMounted(async () => {
  await nextTick()

  const mapContainer = document.getElementById('map')

  if (window.naver && window.naver.maps && props.lat && props.lng && mapContainer) {
    const position = new naver.maps.LatLng(props.lat, props.lng)

    map = new naver.maps.Map(mapContainer, {
      center: position,
      zoom: 15,
    })

    marker = new naver.maps.Marker({
      position,
      map: map,
    })

 
  } else {
    console.error()
  }
})
</script>



<style scoped>
.place-setting-page {
  max-width: 375px;
  margin: 0 auto;
  padding: 16px;
  font-family: 'sans-serif';
  background: #fff;
  min-height: 50;
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
