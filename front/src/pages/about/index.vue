<template>
  <!--tag的关于页面-->
  <view class="about">
    <view class="title">
      <view class="bigTitle">
        {{ tag }}
      </view>
    </view>

    <view class="context">
      <view v-if="data">
        <view class="itemLim" v-for="(item,index) in data" :key="index">
          <item :item="item"></item>
        </view>
      </view>
    </view>
  </view>
<!--  <tabBar/>-->
</template>

<script setup lang="ts">

import {onLoad, onPullDownRefresh} from "@dcloudio/uni-app";
import {nextTick, ref} from "vue";
import api from "@/utils/api";
import Item from "@/pages/about/components/item.vue";


let tag = ref('')
const data = ref()
const init = async () => {
  onLoad((opt: any) => {
    tag.value = opt.value
    uni.setStorageSync('tags', opt.value)
  })
  tag.value = uni.getStorageSync("tags")
  // 这里tag只有一个
  const res = await api.aboutTags({tags: [tag.value]})
  data.value = res.result
  console.log(data.value)
  uni.stopPullDownRefresh();
}


// 下拉触发刷新
onPullDownRefresh(() => {
  init()
})

nextTick(() => {
  init()
})
</script>

<style scoped lang="less">
.about {
  .padding-lr-20();
  padding-top: @padding-n;

  .context {
    .itemLim {
      margin-top: 25rpx;
      background: @bacColor-bleak;
      border-radius: @radio-ls;
      padding: @padding-s;
      background: @bacColor;
    }
  }
}
</style>
