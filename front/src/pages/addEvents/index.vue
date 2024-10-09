<template>
  <customNavBar :back="false" :title="'事件'+flag"></customNavBar>
  <view class="addEvents">
    <view class="formLim" v-if="flag==='add'">
      <view class="formItem">
        <view class="title">
          今日时间
        </view>
        <view class="time">
          {{ time }}
        </view>
      </view>

      <view class="formItem">
        <view class="title">
          content
        </view>
        <view class="time">
          <uni-easyinput type="textarea" v-model="events.content" :clearable="false"
                         placeholder="请输入内容"></uni-easyinput>
        </view>
      </view>

      <view class="formItem">
        <view class="title">
          name
        </view>
        <view class="time">
          <uni-easyinput v-model="events.name" :clearable="false" placeholder="请输入内容"></uni-easyinput>
        </view>
      </view>

      <view class="formItem">
        <view class="title">
          description
        </view>

        <view class="time">
          <uni-easyinput type="textarea" :clearable="false" v-model="events.description"
                         placeholder="请输入内容"></uni-easyinput>
        </view>
      </view>
      <view class="formItem">
        <view class="title">
          tag1
        </view>
        <view class="time">
          <uni-easyinput v-model="events.tag1" :clearable="false" placeholder="请输入内容"></uni-easyinput>
        </view>
      </view>

      <view class="formItem">
        <view class="title">
          tag2
        </view>
        <view class="time">
          <uni-easyinput v-model="events.tag2" :clearable="false" placeholder="请输入内容"></uni-easyinput>
        </view>
      </view>

      <view class="formItem">
        <view class="title">
          tag3
        </view>
        <view class="time">
          <uni-easyinput v-model="events.tag3" :clearable="false" placeholder="请输入内容"></uni-easyinput>
        </view>
      </view>

      <view class="formItem">
        <view class="title">
          tomorrow
        </view>
        <view class="time">
          <uni-easyinput v-model="events.tomorrow" :clearable="false" placeholder="请输入内容"></uni-easyinput>
        </view>
      </view>
      <view class="btns">
        <view class="mainBtn" @tap="post">
          post!
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">

import {reactive, ref} from "vue";
import dayjs from "dayjs";
import api from "@/utils/api";
import CustomNavBar from "@/pages/index/components/customNavBar.vue";

const now = dayjs();
// 当前模式 view为浏览
let flag = ref('view')

const time = ref('')
const content = ref('')

const events = reactive({
  op: "add",
  name: "今日测试事件",
  description: "这个是测试事件的描述",
  content: "今天还是写代码发呆,困得很,一直在看代码,bug真多,不知道到明天有多困",
  tag1: "today",
  tag2: "nothing",
  tag3: "上班",
  tomorrow: "暂无计划,明天周五,看地狱乐,打游戏"
})

const post = async () => {
  console.log('post!')

  const res = await api.postEvents({})

}


const init = () => {
  const year = now.year();
  const month = now.month() + 1; // 月份是从 0 开始的，所以需要加 1
  const date = now.date();
  const hours = now.hour();
  const minutes = now.minute();
  const seconds = now.second();
  time.value = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`
}

init()
</script>

<style scoped lang="less">
.addEvents {
  .padding-lr-20();
  padding-bottom: 20vh;

}
</style>
