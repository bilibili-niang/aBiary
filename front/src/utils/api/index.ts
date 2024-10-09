import { useMemberStore } from '@/stores'
import home from './home'
import type { Data } from '@/types/data'
import env from './env'
import events from './events'
import user from '@/utils/api/user'
// @ts-ignore
import { baseUrl } from '../config.js'
import birthday from '@/utils/api/birthday'
import friend from '@/utils/api/friend'

// 添加拦截器
const httpInterceptor = {
  // 拦截前触发
  invoke(options: UniApp.RequestOptions) {
    options.header = {
      ...options.header,
      'source-client': 'miniapp',
    }
    // 添加token:
    const memberStore = useMemberStore()
    const token = memberStore.profile?.token || uni.getStorageSync('token')
    if (token) {
      options.header.Authorization = token
    }
    // 请求超时,默认60s
    options.timeout = 60000
  }
}
uni.addInterceptor('request', httpInterceptor)
uni.addInterceptor('uploadFile', httpInterceptor)


export const http = <T>(options: UniApp.RequestOptions & any) => {
  // @date 2023/9/5 @time 10:35 , @author 张嘉凯
  // TODO 微信小程序开发把下面的配置打开
  // @ts-ignore
  options.url = options.url.replace('/api', baseUrl)

  return new Promise<Data<T>>((resolve, reject) => {
    uni.request({
      ...options,
      // 只代表响应成功,并没有判断状态码
      success: (res: any) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data as Data<T>)
        } else if (res.statusCode === 401) {
          // 401错误,清理用户信息,重定向到登录
          const memberStore = useMemberStore()
          memberStore.clearProfile()
          uni.navigateTo({ url: '/pages/login/index' })
          reject(res)
        } else if (res.statusCode + '' === '10101') {
          console.log('token过期需要清理')
        } else {
          uni.showToast({
            icon: 'none',
            title: (res.data as Data<T>).message || '请求错误'
          })
          reject(res)
        }
      },
      fail: (err: any) => {
        uni.showToast({
          icon: 'none',
          title: '网络错误,换个网络试试'
        })
        reject(err)
      }
    })
  })
}
export default {
  baseUrl,
  ...home,
  ...env,
  ...events,
  ...user,
  ...birthday,
  ...friend
}
