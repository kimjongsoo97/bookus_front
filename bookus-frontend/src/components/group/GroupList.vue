<template>
  <div>
    <GroupCard
      v-for="group in groups"
      :key="group.id"
      :group="group"
    />
  </div>
</template>

<script setup>
import GroupCard from './GroupCard.vue'

const props = defineProps({
  groups: Array
})
</script>
