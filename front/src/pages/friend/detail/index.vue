<!--联系人列表页面,进入该页面为修改联系人信息-->
<script setup lang="ts">
import {onLoad, onPullDownRefresh} from "@dcloudio/uni-app"
import {ref, Ref} from 'vue'
import api from "@/utils/api";
import emptyData from "@/components/common/emptyData"
import friendDetail from "./components/friendDetail/index.vue"
import {cardColor} from "@/utils/config";
import customPopup from "@/components/common/customPopup/index.vue";


let friendId: Ref<String> = ref('')
onLoad((data: any) => {
  console.log("onload data.friendId", data.friendId)
  friendId.value = data.friendId
  init()
})
let data: Ref<any> = ref(null)
const init = async () => {
  if (!friendId.value) {
    uni.showToast({
      duration: 1300,
      icon: 'none',
      title: '参数错误'
    })
    return
  }
  await api.getFriendDetailById({
    friendId: friendId.value
  })
      .then(res => {
        uni.stopPullDownRefresh();
        if (res.success) {
          data.value = res.result
          mode.value = 'detail'
        }
      })
      .catch(e => {
        console.log("e:")
        console.log(e)
      })
}

// 下拉再次获取数据
onPullDownRefresh(() => {
  init()
})
let mode = ref('detail')
/**
 * 修改当前模式
 */
const changeMode = () => {
  if (mode.value === 'detail') {
    mode.value = 'edit'
  } else {
    mode.value = 'detail'
  }
}
// 动画
let ani = ref()


let customPopupRef = ref()
// 消息推送弹窗
const messagePushAlert = () => {
  customPopupRef.value.show();
}

</script>

<template>
  <div class="friendDetail">
    <emptyData v-if="!data"></emptyData>
    <div class="ice-column friendLim" v-if="data">
      <uni-transition ref="ani" :mode-class="['fade']" :duration="900" show>
        <friendDetail :item="data[0]?data[0]:data" :bacColor="cardColor" timingFunction="ease" :mode="mode"
                      @update="init"></friendDetail>
      </uni-transition>

      <div class="operate ice-column">
        <uni-section title="操作" subTitle="编辑联系人信息?" type="line">
          <div class="ice-row widthFit">
            <div class="mainBtn" @click="changeMode()">
              {{ mode === 'detail' ? '编辑' : '取消' }}
            </div>
            <!--
            <div class="verticalBlock"></div>
           <div class="mainBtn danger">
                          删除
                        </div>-->
            <div class="verticalBlock"></div>
            <div class="mainBtn">
              分享
            </div>
            <div class="verticalBlock"></div>
            <div class="mainBtn" @click="messagePushAlert">
              消息推送
            </div>


          </div>

        </uni-section>
      </div>

    </div>

    <!--消息推送的弹窗-->

    <customPopup ref="customPopupRef" height="70vh">
    </customPopup>
  </div>

</template>

<style scoped lang="less">
.friendDetail{
  .friendLim{

    .operate{
      background: @bacColor-bleak-bleak;
      border-radius: @radio-m;

      .widthFit{
        padding: @padding-n;
      }
    }
  }
}

</style>