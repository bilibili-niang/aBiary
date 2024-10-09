<script setup lang="ts">
import { defineProps, ref } from 'vue'
import { baseUrl, cardColor } from '@/utils/config.js'
import customPopup from '@/components/common/customPopup/index.vue'
import connectionUs from '../connectionUs/index.vue'
import friendCard from '@/pages/index/components/friendCard/index.vue'

const props = defineProps({
  info: {
    type: Object,
    default: () => {
      return {
        username: '张三',
        randomId: 1,
        avatar: '',
        word: ''
      }
    }
  }
})

let customPopupRef = ref()
const userCardClick = () => {
  customPopupRef.value.show()
}
const goEditMein = () => {
  uni.navigateTo({ url: '/pages/mine/edit/index' })
}

const cleanStorage = () => {
  uni.clearStorage()
  // 重启
  uni.reLaunch({
    url: '/pages/mine/index'
  })
}

// 获取用户允许
const getUserAccept = () => {
  uni.requestSubscribeMessage({
    tmplIds: ['MhGH9WzBzCdl_OSN7XqTcjkln3rHnNXohJDmr8J6uQE', 'ltxevW8pi3z7-pYMqKmuaiCk7B3hxZyksZyeWjVsnbA'],
    success(res) {
      console.log(res)
    }
  })
}


</script>

<template>
  <div class="userCard">
    <div class="ice-row white">
      <div class="ice-text">
        关于我
      </div>
    </div>


    <friendCard :avatar="baseUrl+info?.avatar" :bacColor="cardColor" @click="userCardClick">
      <div class="ice-row justBetween">
        <div class="ice-text-l">
          {{ info.name }}
        </div>
      </div>
    </friendCard>
    <!--// TODO 需要支持点击跳转手机拨号-->
    <div class="userInfo ice-column">
      <div class="ice-row white justBetween">
        <div class="ice-text">手机号:</div>
        <div class="ice-text">{{ info?.phone || '-' }}</div>
      </div>
      <div class="ice-row white justBetween">
        <div class="ice-text">生日:</div>
        <div class="ice-text">{{ info?.birthday || '-' }}</div>
      </div>
    </div>

    <customPopup ref="customPopupRef" height="70vh">
      <div class="ice-column layoutColumn alertMarginTop">

        <div class="ice-row layoutLine" @click="getUserAccept">
          <div class="icon">></div>
          <div class="mainBtn">
            消息订阅
          </div>
        </div>

        <div class="ice-row layoutLine" @click="goEditMein">
          <div class="icon">></div>
          <div class="mainBtn">
            编辑我的信息
          </div>
        </div>

        <div class="ice-row layoutLine">
          <div class="icon">></div>
          <div class="mainBtn" @click="cleanStorage">
            clean
          </div>
        </div>
      </div>

      <connectionUs/>
    </customPopup>
  </div>
</template>

<style scoped lang="less">
@import "src/static/css/variable.less";

.userCard {
  box-sizing: border-box;
  border-radius: @radio-m;
}

.layoutColumn {
  .layoutLine {
    justify-content: space-between;
    align-items: center;
  }
}
</style>