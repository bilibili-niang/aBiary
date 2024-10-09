import { defineStore } from 'pinia'

export const globalState = defineStore('account', {
  state: () => {
    return {
      // 当前激活的tab页面
      activeKey: 1
    }
  },
  actions: {
    changeKey(keyValue: number) {
      this.activeKey = keyValue
    }
  }
})
