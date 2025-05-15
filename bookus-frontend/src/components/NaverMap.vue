<template>
  <!-- <div ref="mapContainer" style="width: 100%; height: 400px;"></div> -->
  <div id="map" style="width:100%;height:400px;"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue'


onMounted(() => {


    var mapOptions = {
        center: new naver.maps.LatLng(37.3595704, 127.105399),
        zoom: 10
    };

    var map = new naver.maps.Map('map', mapOptions);
})
</script>
