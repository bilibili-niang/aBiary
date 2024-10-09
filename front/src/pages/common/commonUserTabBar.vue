<template>
  <view class="tab-bar">
    <view v-for="(tab, index) in tabs" :key="index" @click="switchTab(tab)">
      <image :src="currentTab === tab.pagePath ? tab.selectedIconPath : tab.iconPath" mode="aspectFit"></image>
      <text :class="currentTab === tab.pagePath ? 'active' : ''">{{ tab.text }}</text>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    currentTab: {
      type: String,
      required: true
    }
  },
  computed: {
    tabs () {
      return [
        {
          pagePath: '/pages/index/index',
          text: '首页'
        },
        {
          pagePath: 'pages/list/index',
          text: '列表'
        },
        {
          text: 'add',
          pagePath: '/pages/addEvents/index'
        },
      ]
    }
  },
  methods: {
    switchTab (tab) {
      uni.reLaunch({
        url: tab.pagePath
      })
    }
  }
}
</script>
