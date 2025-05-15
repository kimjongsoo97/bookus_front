<template>
  <div>
    <h1>지도페이지</h1>
    <NaverMap />
  </div>
</template>

<script>
import NaverMap from '@/components/NaverMap.vue'

export default {
  name: 'MapView',
  components: {
    NaverMap,
  },
}
</script>
