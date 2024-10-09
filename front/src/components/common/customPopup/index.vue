<!--自定义弹窗组件,支持slot-->
<script lang="ts" setup>
import {defineProps, ref} from 'vue'

 defineProps({
  height: {
    type: String,
    default: '90vh'
  }
})
const popupRef = ref()
const show = (direction: string) => {
  if (!direction) {
    popupRef.value.open('top')
  } else {
    popupRef.value.open(direction)
  }
}
const close = () => {
  popupRef.value.close()
}

// 这个是必须要暴露的
defineExpose({
  show,
  close
})
</script>
<template>
  <uni-popup ref="popupRef" background-color="#fff">
    <view class="popContainer" :style="{
      'height':height
    }">
      <slot></slot>
    </view>
  </uni-popup>

</template>

<style scoped lang="less">

.popContainer{
  display: flex;
  flex-direction: column;
  padding: @padding-n;
}
</style>