<template>
  <view class="recommendMarkdown">
    <view v-for="(item, index) in list" :key="index">
      <view class="item" :class="[
        activeIndex === index ? 'active' : ''
      ]">
        <view class="tag">
          <uni-tag :inverted="true" text="title" type="primary"/>
        </view>
        <button size="mini">
          {{ item.title }}
        </button>
      </view>
    </view>

  </view>
</template>

<script setup lang="ts">
import {defineProps} from 'vue'
const props = defineProps({
  list: {
    type: Array,
    default: () => {
      return []
    }
  },
  activeIndex: {
    type: Number,
  }
})
</script>

<style scoped lang="less">
.recommendMarkdown {
  .active {
    padding-left: 30rpx !important;

    &:after {
      opacity: 1 !important;
      left: 0 !important;
    }
  }

  .item {
    transition-duration: .6s;
    position: relative;
    .flex-row();
    align-items: center;
    margin-top: @margin-m;
    margin-bottom: @margin-m;

    &:after {
      content: '';
      position: absolute;
      display: flex;
      width: 10rpx;
      left: -100%;
      background-color: @themeActiveColor;
      height: 100%;
      z-index: -1;
      opacity: 0;
      transition-duration: .6s;
    }

    .tag {
      min-width: 15vw;
      align-items: center;
      height: 100%;
      display: flex;
    }

    button {
      padding-left: 10rpx;
      margin-left: 0;
    }

    /*    .btn {
          display: flex;
          width: 60vw;
          justify-content: flex-start;
        }*/
  }
}
</style>
