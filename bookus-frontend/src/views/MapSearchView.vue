<template>
  <div>
    <h1>지도페이지</h1>
    <NaverMap />
  </div>
</template>

<script>
import NaverMapSearch from '@/components/NaverMapSearch.vue';

export default {
  name: 'MapSearchView',
  components: {
    NaverMapSearch,
  },
}

</script>
