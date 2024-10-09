<template>
  <!--首页分类-->
  <view class="classify">
    <view class="classifyLim">
      <view v-for="(it,index) in item" :key="index">
        <view class="itemLim" v-if="index<=6" @tap="goReadTags(it)">
          <view class="icon">
            {{ it.length > 2 ? it.slice(0, 2) : it }}
          </view>
          <view class="title">
            {{ it }}
          </view>
        </view>
      </view>
      <view class="itemLim" @tap="showMore">
        <view class="icon">
          <uni-icons type="more-filled" size="30"></uni-icons>
        </view>
        <view class="title">
          更多
        </view>
      </view>
      <view class="itemLim"></view>
      <view class="itemLim"></view>
      <uni-popup ref="popup" type="bottom">
        <view class="popupLim" :style="{'padding-top':safeAreaInsets?.top+'px'}">
          <view class="itemLim">
            <view class="icon redIcon red" @tap="closePopup">
              close
            </view>
            <view class="title red">
              关闭
            </view>
          </view>
          <view class="itemLim" v-for="(it,index) in item" :key="index" @tap="goReadTags(it)">
            <view class="icon">
              {{ it.length > 2 ? it.slice(0, 2) : it }}
            </view>
            <view class="title">
              {{ it }}
            </view>
          </view>
          <view class="itemLim"></view>
          <view class="itemLim"></view>
          <view class="itemLim"></view>
        </view>
      </uni-popup>

    </view>

  </view>
</template>

<script setup lang="ts">
import {defineProps, ref} from "vue";

// 获取屏幕边界到安全区域的距离
const {safeAreaInsets} = uni.getSystemInfoSync()

const props = defineProps({
  item: {
    type: Array,
    default: []
  }
})
// 弹出层
const popup = ref()

const showMore = () => {
  popup.value?.open('top')
}

const closePopup = () => {
  popup.value?.close()
}

// 通过传入的分类,前往阅读
const goReadTags = (item: string) => {
  uni.setStorageSync('tags', item)
  uni.navigateTo({
    url: `/pages/about/index?tags=${item}`
  })
}


</script>

<style scoped lang="less">
.classify{
  .classifyLim{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;

    .itemLim{
      margin: @margin-s;
      .flex-row(column);
      width: 130rpx;
      justify-content: center;
      align-items: center;

      .icon{
        .flex-row();
        justify-content: center;
      }

      .redIcon{
        box-shadow: 5rpx 5rpx 10rpx 10rpx #dd524d;
      }

      .title{
        font-size: @font-s;
        .flex-row();
        justify-content: center;
      }
    }
  }

  /deep/ .popupLim{
    flex-wrap: wrap;
    flex-direction: row !important;
    justify-content: center;
    background: @bacColor;

    .itemLim{
      max-width: 140rpx;
      justify-content: center;
      align-items: center;

      .icon{
        background: @themeColor-heightLight !important;
      }
    }
  }
}
</style>
