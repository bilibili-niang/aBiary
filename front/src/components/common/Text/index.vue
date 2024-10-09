<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  size: {
    type: String,
    default: '17'
  },
  weight: {
    type: Number,
    default: 600
  },
  color: {
    type: String,
    default: 'rgba(0,0,0,1)'
  }
})

const textStyle = computed(() => {
  const { size, weight, color } = props
  return {
    fontSize: size + 'px',
    fontWeight: weight,
    color: color
  }
})
</script>

<template>
  <div class="Text" :style=textStyle>
    <slot></slot>
  </div>
</template>

<style scoped lang="less">

</style>