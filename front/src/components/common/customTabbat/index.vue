<script setup lang="ts">
const props = defineProps({
  // tabbar的数组
  lists: {
    type: Array,
    default: () => []
  },
  // 当前激活的item index
  current: {
    type: Number,
    default: 0
  },
  // 背景颜色
  backgroundColor: {
    type: String,
    default: '#ffffff'
  },
  // 默认的文字颜色
  color: {
    type: String,
    default: '#333333'
  },
  // 激活时候的文字颜色
  activeColor: {
    type: String,
    default: '#333333'
  },
  // 圆角
  borderRadius: {
    type: String,
    default: '0'
  }
})


</script>

<template>
  <div class="customTabBar">

  </div>
</template>

<style scoped lang="less">

</style>