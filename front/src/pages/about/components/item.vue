<template>
  <view class="itemCon">
    <image class="coverImg" mode="aspectFill" @error="errFun" :src="baseUrl+childrenItem.headImg"></image>
    <view class="coverBac"></view>
    <view class="coverCon">
      <view class="title">
        {{ childrenItem.title }}
      </view>
      <view class="time">
        {{ childrenItem.updatedAt }}
      </view>
      <view class="des">
        {{ childrenItem.description ? childrenItem.description : '-' }}
      </view>
      <view class="operate">
        <view @tap="goToRead(childrenItem.id)" class="mainBtn">read</view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import {defineProps, ref} from "vue";
import {baseUrl} from "@/utils/config";

const props = defineProps({
  item: {
    type: Object,
    default: () => {
      return {}
    }
  }
})

const childrenItem = ref()

// 图片加载失败时调用
const errFun = () => {
  childrenItem.value.headImg = baseUrl + '/defaultBac.png'
}

// 跳转阅读
const goToRead = (id: number) => {
  uni.setStorageSync('readId', id)
  uni.navigateTo({
    url: '/pages/read/index?id=' + id
  })
}

childrenItem.value = props.item
childrenItem.value.headImg = baseUrl + props.item?.headImg
</script>

<style scoped lang="less">
.itemCon{
  overflow: hidden;
  margin-bottom: @margin-m;
  border-radius: @radio-ls;
  background-size: cover;
  position: relative;


  .coverImg{
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    height: 100%;
    width: 100%;
    border-radius: @radio-m;
    z-index: -1;
  }

  .coverBac{
    position: absolute;
    display: flex;
    width: 100%;
    height: 100%;
    filter: blur(50rpx);
    z-index: 5;
  }

  .coverCon{
    box-sizing: border-box;
    z-index: 10;
    width: 95%;
    display: flex;
    border-radius: @radio-ls;
    .flex-row(column);
    padding: @padding-s;
    margin: @margin-s;
    margin-top: 170rpx;
    background: @bacColor;


    .title, .time{
      border-radius: @radio-ls;
      z-index: 5;
    }

    .des{
      z-index: 5;
      font-size: @font-m;
    }

    .operate{
      z-index: 5;
      .flex-row();
      width: 100%;
      justify-content: flex-start;
      margin-top: @margin-m;

      /deep/ button{
        margin: 0;
      }
    }
  }
}
</style>
