<!--全局icon-->
<template>
  <i :class="['iconfont' ,'icon-'+props.icon]" :style="iconStyle"></i>
</template>
<script lang="ts" setup>
import { computed } from 'vue'

const iconStyle = computed(() => {
  const { size, color } = props
  return {
    fontSize: `${size}px`, // 使用模板字符串保持代码清晰
    color // 直接使用color作为键名
  }
})

const props = defineProps({
  icon: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: '40'
  },
  color: {
    type: String,
    default: '#333'
  }
})
</script>

<style lang="less" scoped>
.iconfont {
  transition-duration: @time-s;

  &:before {
    transition-duration: @time-s;
    font-size: inherit !important;
    color: inherit !important; // 确保颜色继承自父元素或样式属性
  }
}
</style>