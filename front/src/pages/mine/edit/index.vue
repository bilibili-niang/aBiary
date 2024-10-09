<script lang="ts" setup>
import {computed, ref, Ref} from "vue"
import api from "@/utils/api";
import {baseUrl, cardColor} from "@/utils/config.js";
import {resType, userInfo} from "@/components/type/common";
import iceAvatar from '@/components/common/avatar/index.vue'
import iceInput from '@/components/common/iceInput/index.vue'
import {onLoad, onPullDownRefresh} from "@dcloudio/uni-app"
import customPopup from "@/components/common/customPopup/index.vue";
import {useMemberStore} from "@/stores";

let data: Ref<userInfo> = ref({})

const init = async () => {
  await api.loginByToken()
      .then(res => {
        if (res.success) {
          data.value = res.result
        }
      })
      .catch(e => {
        console.log("e:")
        console.log(e)
      })
}
let customPopupRef = ref()
/**
 * 头像被点击了
 */
const avatarClick = () => {
  customPopupRef.value.show();
}
let mode = ref('edit')
// 查看头像
const checkAvatar = () => {
  let imgsArray = [];
  imgsArray[0] = baseUrl + data.value.avatar;
  uni.previewImage({
    current: 0,
    urls: imgsArray
  });
}
const emits = defineEmits(['update'])
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
            'friendId': '0'
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

init()
/**
 * 获取当前用户的手机号
 */
const onGetPhoneNumber = async (e: any) => {
  if (e.detail.errMsg == "getPhoneNumber:fail user deny") {
    //用户决绝授权
    uni.showToast({
      title: '用户取消授权',
      icon: 'loading',
      duration: 1300
    })
  } else {
    //允许授权
    await api.decryptPhone({
      encryptedData: e.detail.encryptedData,
      iv: e.detail.iv,
      openId: openId.value
    })
        .then(res => {
          if (res.success) {
            init();
            uni.showToast({
              title: res.message,
              icon: 'success',
              duration: 1300
            })
            /**
             * 重新获取用户数据
             */
          } else {
            uni.showToast({
              title: res.message,
              icon: 'error',
              duration: 1300
            })
          }
        })
        .catch(e => {
          console.log("e:")
          console.log(e)
        })
  }
}
/**
 * 获取openid
 */
let openId = ref('')
const getUserNew = () => {
  uni.login({
    provider: 'weixin',
    onlyAuthorize: true,
    success: res => {
      openId.value = res.code
    }
  });
  uni.stopPullDownRefresh();
}
onLoad(() => {
  getUserNew();
})

onPullDownRefresh(() => {
  init();
})
// 是否阻塞
let obstruct = ref(false)
const saveData = async () => {
  if (!obstruct) {
    return false;
  } else {
    await submit()
  }
}

const store = useMemberStore()

const getUserInfo = async () => {
  const token: string = uni.getStorageSync("token");

  if (!token) {
    uni.showToast({
      duration: 1300,
      icon: 'none',
      title: '当前没有用户登录'
    })
    uni.stopPullDownRefresh();
    return false
  } else {
    await api.loginByToken(token)
        .then(res => {
          store.setProfile(res.result);
          data.value = res.result
        })
    uni.stopPullDownRefresh();
  }
}
const submit = async () => {
  obstruct.value = true
  await api.updateUserInfo(data.value)
      .then(res => {
        uni.showToast({
          duration: 1300,
          icon: res?.success ? 'success' : 'none',
          title: res?.message + ''
        })
        // 重新获取用户数据
        getUserInfo();
      })
}
const imageUrl = computed(() => {
  return data.value?.avatar ? baseUrl + data.value.avatar : ''
})
// 打开日历
let calendar = ref();
const openCalendar = () => {
  calendar.value.open()
}
// 生日弹窗的确认
const calendarConfirm = (value) => {
  console.log(value)
  data.value.birthday = value.fulldate
}

</script>

<template>
  <div class="editMine">
    <div class="userEditForm ice-column" :style="{'backgroundColor': cardColor }">
      <div class="avatarLim ice-row justCenter" @click="avatarClick">
        <ice-avatar :url="imageUrl"></ice-avatar>
      </div>
      <div class="ice-row justBetween">
        <div class="ice-tag">
          昵称:
        </div>
        <div class="lineLeft">
          <ice-input v-model="data.name" :disable="mode==='detail'"></ice-input>
        </div>
      </div>
      <div class="ice-row justBetween">
        <div class="ice-tag">
          真实姓名:
        </div>
        <div class="lineLeft">
          <ice-input v-model="data.realName" :disable="mode==='detail'"></ice-input>
        </div>
      </div>

      <div class="ice-row justBetween">
        <div class="ice-tag">
          手机号:
        </div>
        <div class="lineLeft">
          <div class="ice-text" v-if="data.phone"> {{ data.phone }}</div>
          <div class="ice-text" v-else>
            <button open-type="getPhoneNumber" @getphonenumber="onGetPhoneNumber">唤起授权</button>
          </div>
        </div>
      </div>
      <div class="ice-row">
        <div class="ice-text danger">注意,这里的手机号会作为您多平台登录的唯一标识</div>
      </div>

      <div class="ice-row justBetween">
        <div class="ice-tag">
          邮箱:
        </div>
        <div class="lineLeft">
          <ice-input v-model="data.email" :disable="mode==='detail'"></ice-input>
        </div>
      </div>

      <div class="ice-row justBetween" @click="openCalendar">
        <div class="ice-tag">
          生日:
        </div>
        <div class="lineLeft">
          {{ data.birthday || "-" }}
        </div>
      </div>
      <div class="ice-row margin-top-s">
        <div class="buttomBtns">
          <div class="mainBtn" @click="saveData">
            保存
          </div>
        </div>
      </div>
    </div>
    <uni-calendar ref="calendar"
                  :insert="false"
                  :clear-date="true"
                  lunar
                  @confirm="calendarConfirm" @close="close"/>

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

<style scoped lang="less">
.editMine{
  padding-left: @padding-n;
  padding-right: @padding-n;

  .userEditForm{
    border-radius: @radio-m;
    padding: 0 @padding-l @padding-n;

    .avatarLim{
      padding-top: @padding-n;
    }
  }
}
</style>