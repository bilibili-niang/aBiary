<template>
  <view class="iceSwiper">
    <swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="true" interval="30000"
            duration="1500"
            @change="durationChange"
    >
      <swiper-item v-for="(item,index) in list" :key="index" :class="['swiperCon']">
        <!-- <view
                    :class="[
                        activeIndex===index?'active':'noActive'
                    ]"
                    :style="{
                  'background': 'url(http://localhost:89'+item.headImg+')'
                }" class="swiperImg"/>-->
        <view
            :class="[
                activeIndex===index?'active':'noActive'
            ]"
            :style="{
          'background': 'url(https://blog.icestone.work'+item.headImg+')'
        }" class="swiperImg"/>

        <view class="title" :class="[
                activeIndex===index?'activeTitle':'noActive'
            ]">
          {{ item.title }}
        </view>
        <view class="time" :class="[
                activeIndex===index?'activeTime':'noActive'
            ]">
          {{ item.updatedAt }}
        </view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script setup lang="ts">
import {defineProps, ref} from "vue";

const props = defineProps({
  list: {
    type: Array
  }
})
const activeIndex = ref(0)

// 传递当前激活的index
const emits = defineEmits(['index'])

const indicatorDots = ref(true)

// 使用uniHelper提供的类型来声明
const durationChange: UniHelper.SwiperOnChange = (event) => {
  // 获取index
  // console.log(event.detail?.current)
  // 非空断言,表示detail不可能为空
  activeIndex.value = event.detail!.current
  emits('index', event.detail!.current)
}

</script>

<style scoped lang="less">
.iceSwiper{
  border-radius: @radio-ls;
  overflow: hidden;
  padding-top: @padding-n;
  padding-bottom: @padding-n;
}

.active{
  width: 95% !important;
  opacity: 1 !important;
}

.swiperCon{
  display: flex;
  width: 95vw;
  justify-content: center;
  border-radius: @radio-ls;
  position: relative;
  align-items: center;

  .swiperImg{
    display: flex;
    height: 100%;
    width: 85%;
    border-radius: @radio-ls;
    background-size: auto 100%;
    background-repeat: no-repeat;
    background-position: center;
    transition-duration: .7s;
    opacity: 0;
  }

  .title{
    position: absolute;
    bottom: -180rpx;
    left: 40rpx;
    z-index: 2;
    color: @themeActiveColor;
    font-weight: bolder;
    transition-duration: .8s;
    opacity: 0;
  }

  .time{
    position: absolute;
    bottom: -130rpx;
    left: 40rpx;
    color: @themeActiveColor;
    transition-duration: 1s;
    opacity: 0;
  }

}

.activeTitle{
  bottom: 80rpx !important;
}

.activeTime{
  bottom: 30rpx !important;
}

.activeTitle, .activeTime{
  opacity: 1 !important;
}

swiper{
  height: 25vh;

  swiper-item{
    height: 25vh;
  }
}
</style>
