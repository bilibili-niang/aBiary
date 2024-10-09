<script setup lang="ts">
import { computed, ref } from 'vue'
import Text from '@/components/common/Text/index.vue'

const props = defineProps({
  title: {
    type: String,
    default: '首页'
  }
})

//整体顶部导航栏的高度
const navHeight = ref<number | undefined>(0)
//状态栏高度
const barHeight = ref<number | undefined>(0)

const init = () => {
  //获取手机系统的信息（在这主要是获取状态栏和胶囊的高度）
  let { statusBarHeight, system } = uni.getSystemInfoSync()
  barHeight.value = Number(statusBarHeight) + 10
  navHeight.value = statusBarHeight! + (system.indexOf('iOS') > -1 ? 44 : 48) + 10
}
const topStyle = computed(() => {
  return {
    height: navHeight.value + 'rpx',
    paddingTop: barHeight.value + 'rpx'
  }
})

init()

</script>

<template>
  <div class="topBar ice-row justBetween alignCenter" :style="topStyle">
    <div class="leftBlock">

    </div>
    <div class="centerBlock">
      <Text>
        {{ props.title }}
      </Text>
    </div>
    <div class="rightBlock">

    </div>
  </div>
</template>

<style scoped lang="less">
.topBar {
  border-bottom: @themeColor-heightLight 1px solid;
}

</style>