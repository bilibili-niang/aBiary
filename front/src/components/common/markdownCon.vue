<template>
  <!--  markdown文章预览并渲染-->
  <view class="markdownCon">
    <view class="MarkdownDetail">
      <view class="item title">
        title>
        {{ item.title }}
      </view>
      <view class="item des">描述>
        {{ item.description }}
      </view>
      <view class="item time">updatedAt>{{ item.updatedAt }}</view>
    </view>
    <br>
    <view class="content">
    </view>
    <view class="content markdown" v-html="content"></view>

    <!--{{ item }}-->
  </view>
</template>

<script setup lang="ts">
import api from "@/utils/api";
import {defineProps, ref} from "vue";

const props = defineProps({
  item: {
    type: Object,
    default: () => {
      return {}
    }
  }
})

// markdown的html内容
let content = ref('')
const init = async () => {
  console.log(props.item)
  const contentTemp = await api.getMarkdownContent({id: props.item.id})
  if (contentTemp.success) {
    content.value = contentTemp.result + ''
  }
  console.log(content.value)
}

setTimeout(() => {
  init()
}, 300)
</script>

<style scoped lang="less">
.markdownCon{
  .MarkdownDetail{
    .flex-row(column);

    .item{
      white-space: pre-wrap;
    }

    .title, .des, .time{
      margin-bottom: @margin-m;
    }
  }
}
</style>
