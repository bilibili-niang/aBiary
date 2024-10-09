<template>
  <view class="tabBar">
    <view class="tabCon">
      <view class="Lim" v-for="(item, index) in list" :key="index"
            :class="[('/' + currentRoute) ===item.path?'active':'']">
        <view :class="['item',global.$state.activeKey===item.key && 'activeItem']" @click="navigate(item.key)">
          <IceIcon :icon="item.icon" size="20" :color="global.$state.activeKey===item.key?'#ffffff':'#333'"/>
          <view class="title">{{ item.title }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { globalState } from '@/stores/modules/gloal'
import IceIcon from '@/components/common/iceIcon/index.vue'

// 获取当前打开过的页面路由数组
let currentRoutes = getCurrentPages()
//获取当前页面路由
let currentRoute = currentRoutes[currentRoutes.length - 1].route

const list = reactive([
  {
    title: '首页',
    path: '/pages/index/index',
    icon: 'indexHome',
    activeIcon: '',
    key: 1
  },
  {
    title: '更多',
    path: '/pages/list/index',
    icon: 'gengduo',
    activeIcon: '',
    key: 2
  },
  {
    title: '我',
    path: '/pages/mine/index',
    icon: 'a-accountcircle',
    activeIcon: '',
    key: 3
  }
])

const global = globalState()

// 添加跳转逻辑
const navigate = (key: number) => {
  global.changeKey(key)
}
</script>

<style scoped lang="less">
.tabBar {
  display: flex;
  position: fixed;
  bottom: 20px;
  left: 0;
  z-index: 5;
  width: 100vw;

  .tabCon {
    background: rgba(0, 0, 0, .1);
    .flex-row();
    justify-content: space-around;
    width: 95%;
    margin: 0 auto;
    padding-top: @padding-l;
    padding-bottom: @padding-l;
    border-radius: 30px;
    overflow: hidden;
  }

  .Lim {
    border-bottom: rgba(0, 0, 0, 0) 0 solid;
    transition-duration: .5s;
    width: 30%;

    .item {
      border-radius: 30px;
      margin-left: @margin-m;
      margin-right: @margin-m;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      padding: @padding-s @padding-l;
      transition-duration: .5s;
      flex-direction: column;

      .title {
        font-size: @font-s;
        white-space: nowrap;
        font-weight: normal;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 5px;
      }
    }

    .activeItem {
      background: @themeActiveColor;
      transition-duration: .3s;

      .title {
        transition-duration: .3s;
        color: #ffffff;
      }
    }
  }
}

</style>
