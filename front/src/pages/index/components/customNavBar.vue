<!--自定义navBar-->
<template>
  <div class="navBar" :style=" {'margin-top':safeAreaInsets?.top+'px'}">
    <uni-nav-bar size="20" shadow :left-icon="back?'left':''" :leftText="back?'返回':''" :rightText="rightText"
                 :title="title" height="90rpx"/>
  </div>

</template>

<script setup lang="ts">
import {defineProps} from 'vue'
// 获取屏幕边界到安全区域的距离
const {safeAreaInsets} = uni.getSystemInfoSync()
const props = defineProps({
  title: {
    type: String,
    default: '自定义导航'
  },
  rightText: {
    type: String,
    default: ''
  },
  // 是否可以返回,默认支持
  back: {
    type: Boolean,
    default: true
  }
})
</script>

<style scoped lang="less">
.navBar{
  background: @tabBac;
}
</style>
