<script setup lang="ts">
import IceIcon from '@/components/common/iceIcon/index.vue'

defineProps({
  title: {
    type: String,
    default: '暂无数据'
  }
})

</script>

<template>
  <div class="emptyData">
    <div class="ice-text ice-row justCenter">
      {{ title }}
    </div>
    <div class="emptyIcon">
      <IceIcon icon="empty" size="50"/>
    </div>
    <div class="ice-column">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="less">
.emptyIcon{
  display: flex;
  width: 100%;
  height: fit-content;
  border-radius: @radio-m;
  background: @bacColor;
  justify-content: center;
  align-items: center;
}

</style>