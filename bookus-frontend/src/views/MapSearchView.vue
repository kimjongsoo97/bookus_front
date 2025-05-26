<template>
  <div>
    <h1>지도페이지</h1>
    <NaverMapSearch />
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
