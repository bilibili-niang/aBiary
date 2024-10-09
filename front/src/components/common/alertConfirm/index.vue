<!--弹出窗,是否确认-->
<script setup lang="ts">
import {defineExpose, defineProps, ref} from 'vue'
import {baseUrl} from "@/utils/config";
import iceAvatar from '@/components/common/avatar'

const props = defineProps({
  title: {
    type: String,
    default: '请确认操作'
  },
  text: {
    type: String,
    default: '请确认操作'
  },
  // 弹窗类型,默认为警告
  type: {
    type: String,
    default: 'danger'
  }
})
let showFlag = ref(false)
const emits = defineEmits(['cancelTrigger', 'confirmTrigger'])
const confirm = () => {
  close();
  emits('confirmTrigger')
}
const cancel = () => {
  close();
  emits('cancelTrigger')
}
const show = () => {
  console.log("show!")
  showFlag.value = true
}
const close = () => {
  showFlag.value = false
}

defineExpose({
  show,
  close
})
</script>

<template>
  <div class="alertConfirm">
    <div class="outLim"
         :class="[
        showFlag ? 'show' : 'hide',
        type
    ]"
    >
      <div class="bacCover"></div>
      <div class="alertWindow">
        <div class="ice-column">
          <div class="ice-row alignCenter">
            <div class="icon">
              <iceAvatar :url="baseUrl + '/danger.png'" size="s"></iceAvatar>
            </div>
            <div class="ice-text">
              {{ title }}
            </div>
          </div>
          <div class="lineBottom75"></div>
        </div>
        <div class="bottomText ice-column">
          <div class="ice-column">
            <div class="alertText ice-text">
              {{ text }}
            </div>
            <div class="ice-row">
              <div class="mainBtn" @click="confirm">确认</div>
              <div class="verticalBlock"></div>
              <div class="mainBtn" @click="cancel">取消</div>
            </div>
          </div>

        </div>

      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.alertConfirm{

  .hide{
    z-index: -1;
    opacity: 0;
    //width: 0%;
    height: 0%;
  }

  .show{
    opacity: 1;
    //width: 100%;
    height: 100%;
    z-index: 20;
  }

  .danger{
    .icon{
      background: linear-gradient(to right bottom, @dangerColor 9%, transparent 20%) !important;
    }
  }

  .outLim{
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    transition-duration: @time-m;

    .bacCover{
      position: absolute;
      width: 100%;height: 100%;
      background: @bacColor-dark-bleak;
      z-index: 5;
      opacity: @bacOpacity;
    }


    .alertWindow{
      position: absolute;
      top: 40%;
      z-index: 20;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 75vw;
      max-width: 400px;
      border-radius: @radio-m;
      border: none;
      background: @bacColor;
      padding: @padding-n;

      .icon{
        padding: @padding-l-s !important;
      }

      .bottomText{
        margin-top: @margin-l;

        .alertText{
          padding: @padding-n;
        }
      }

    }
  }
}
</style>