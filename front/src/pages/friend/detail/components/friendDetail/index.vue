<script setup lang="ts">
import iceAvatar from '@/components/common/avatar'
import {defineEmits, defineProps, ref, Ref} from 'vue'
import {baseUrl, cardColor} from "@/utils/config";
import iceInput from '@/components/common/iceInput'
import alertConfirm from "@/components/common/alertConfirm"
import customPopup from "@/components/common/customPopup/index.vue";
import api from "@/utils/api";
import {friendDetailInfo, resType} from "@/components/type/common";

const props = defineProps({
  item: {
    type: Object,
    default: () => ({})
  },
  /**
   * @description 模式
   * @example{mode}
   * detail (默认) 仅仅展示,无法修改
   * edit 展示并可以修改
   */
  mode: {
    type: String,
    default: 'detail'
  }
})
let data: Ref<friendDetailInfo> = ref({})
const init = () => {
  data.value = props.item
}

/**
 * 完成的提交
 */
const complete = async () => {
  await api.updateFriendBirthday({
    name: data.value.name,
    lunaBirthday: data.value
  })
      .then(res => {
        if (res.success) {
          uni.showToast({
            duration: 1300,
            icon: 'none',
            title: res?.message + ''
          })
          setTimeout(() => {
            emits('update')
          }, 1400)
        }
      })
      .catch(e => {
        console.log("e:")
        console.log(e)
      })
}
// 点击生日展开日期选择面板
let calendar = ref()
// 当进入编辑时,保存最初始的数据
let tempObj = ref()
const showCanlender = () => {
  if (props.mode === 'detail') {
    console.log(props.mode)
    return
  } else {
    calendar.value.open()
    tempObj.value = JSON.parse(JSON.stringify(data.value))
  }
}
const birthdayChange = (val: any) => {
  let {lunar = null} = val
  data.value.birthday = val.fulldate
  if (lunar) {
    data.value.lunaBirthday = lunar
    data.value.animalSign = lunar.Animal
    data.value.lunaBirthdayText = data.value.lunaBirthday?.IMonthCn + data.value.lunaBirthday?.IDayCn
  }
}

let alertConfirmRef = ref()

// 点击了重置,将data中的数据恢复到原来
const resetData = () => {
  alertConfirmRef.value.show()
  if (tempObj.value) {
    data.value = JSON.parse(JSON.stringify(tempObj.value))
  }
}

let customPopupRef = ref()
/**
 * 头像被点击了
 */
const avatarClick = () => {
  customPopupRef.value.show();
}


// 更换头像
const chooseImage = () => {
  uni.chooseImage({
    count: 1,
    async success(res) {
      if (res.tempFilePaths.length > 0) {
        let filePath = res.tempFilePaths[0]
        uni.uploadFile({
          url: baseUrl + '/file/upload', //仅为示例，非真实的接口地址
          filePath: filePath,
          name: 'file',
          formData: {
            'friendId': data.value.friendId
          },
          success: (uploadResult) => {
            const res: resType = JSON.parse(uploadResult.data)
            if (res.success) {
              uni.showToast({
                duration: 1300,
                icon: 'none',
                title: res.message
              })
              customPopupRef.value.close();
              emits('update')
              // 重新获取当前用户数据
            } else {
              uni.showToast({
                duration: 1300,
                icon: 'none',
                title: res.message
              })
            }
          },
          fail: (err) => {
            console.log(err)
          }
        });
      }
    }

  })

}

// 查看头像
const checkAvatar = () => {
  let imgsArray = [];
  imgsArray[0] = baseUrl + props.item.avatar;
  uni.previewImage({
    current: 0,
    urls: imgsArray
  });
}

const emits = defineEmits(['update'])
init()
</script>

<template>
  <div class="friendDetail">
    <div class="friendInfo ice-column" :style="{ 'backgroundColor': cardColor }">
      <div class="avatarLim ice-row alignCenter" @click="avatarClick">
        <iceAvatar :url="baseUrl+item.avatar"></iceAvatar>
      </div>
      <div class="ice-row">
        <div class="ice-tag">
          名字:
        </div>
        <div class="lineLeft">
          <ice-input v-model="data.name" :disable="mode==='detail'"></ice-input>
        </div>
      </div>
      <div class="ice-row">
        <div class="ice-tag">
          关系:
        </div>
        <div class="lineLeft">
          <ice-input v-model="data.relationship" :disable="mode==='detail'"></ice-input>
        </div>
      </div>
      <div class="ice-row" @click="showCanlender">
        <div class="ice-tag">
          生日:
        </div>
        <div class="ice-row justBetween birthdayLim" v-if="mode === 'edit'">
          <div class="lineLeft">
            <!-- <ice-input v-model="data.birthday" disable></ice-input>-->
            <div class="ice-text">
              {{ data.cYear }}-{{ data.cMonth }}-{{ data.cDay }}
            </div>
          </div>
          <div class="ice-tag">
            点击更改
          </div>
        </div>

        <div class="lineLeft" v-else>
          <div class="ice-text">
            {{ data.cYear }}-{{ data.cMonth }}-{{ data.cDay }}
          </div>
        </div>

      </div>
      <div class="ice-row">
        <div class="ice-tag">
          阴历:
        </div>
        <div class="lineLeft">
          <!-- <ice-input v-model="data.lunaBirthday" disable></ice-input>-->
          <div class="ice-text">
            {{ data.IMonthCn }}-{{ data.IDayCn }}
          </div>
        </div>
      </div>
      <div class="ice-row">
        <div class="ice-tag">
          生肖:
        </div>
        <div class="lineLeft">
          <ice-input v-model="data.Animal" disable></ice-input>
        </div>
      </div>
      <div class="ice-row">
        <div class="ice-tag">
          星座:
        </div>
        <div class="lineLeft">
          <ice-input v-model="data.astro" disable></ice-input>
        </div>
      </div>
      <div class="ice-row">
        <div class="ice-tag">
          手机号:
        </div>
        <div class="lineLeft">
          <ice-input v-model="data.phone" :disable="mode==='detail'"></ice-input>
        </div>
      </div>
    </div>
    <div class="operate ice-column" v-if="mode==='edit'">
      <div class="ice-row widthFit">
        <div class="mainBtn" @click="complete">
          完成
        </div>
        <div class="verticalBlock"></div>
        <div class="mainBtn" @click="resetData">
          重置
        </div>
      </div>
    </div>
    <uni-calendar
        ref="calendar"
        :insert="false"
        :showMonth="false"
        lunar
        @confirm="birthdayChange"
    />
    <alertConfirm ref="alertConfirmRef" text="确定要重置吗,这会丢失当前已经修改的"></alertConfirm>
    <!--底部的弹窗,头像点击触发-->
    <customPopup ref="customPopupRef" height="40vh">
      <div class="operateAvatar ice-column">
        <div class="ice-row justBetween" @click="checkAvatar">
          <div class="ice-tag">
            >
          </div>
          <div class="mainBtn">
            查看头像
          </div>
        </div>
        <div class="transverseBlock"></div>
        <div class="ice-row justBetween" @click="chooseImage">
          <div class="ice-tag">
            >
          </div>
          <div class="mainBtn">
            更换头像
          </div>
        </div>
      </div>
    </customPopup>
  </div>
</template>

<style lang="less">
.friendDetail{
  margin: @margin-m;
  box-sizing: border-box;

  .friendInfo{
    padding: @padding-s-s;
    border-radius: @radio-m;

    .avatarLim{
      justify-content: center !important;
      width: fit-content;
      margin: @margin-m auto;
      overflow: hidden;
      transform: scale(1.2);
    }

    .ice-row{
      justify-content: space-between;
      margin-bottom: @margin-s;

      .lineLeft{
        width: 70%;
        max-width: 70%;
        height: 2.1rem;
        display: flex;
        align-items: center;

        ice-input{
          width: 100%;
        }
      }
    }

    .birthdayLim{
      width: 70%;
    }
  }

  .operate{
    padding: @padding-s-s;
    background: @bacColor-bleak-bleak;
    border-radius: @radio-m;
    margin-top: @margin-m;
  }

}

</style>