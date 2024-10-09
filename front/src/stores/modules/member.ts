import {defineStore} from 'pinia'
import {ref} from 'vue'
import type {resultObj} from "@/stores/modules/user";

// 定义 Store
export const useMemberStore = defineStore(
    'member',
    () => {
        // 会员信息
        const profile = ref<resultObj>()
        // 保存会员信息，登录时使用
        const setProfile = (val: resultObj) => {
            if (val.token) {
                uni.setStorageSync('token', val.token)
            }
            if (val) {
                profile.value = val
            }
        }
        // 清理会员信息，退出时使用
        const clearProfile = () => {
            profile.value = undefined
        }
        // 记得 return
        return {
            profile,
            setProfile,
            clearProfile,
        }
    },
    {
        // 网页端配置
        // persist: true,
        // 小程序端配置
        persist: {
            storage: {
                getItem(key) {
                    return uni.getStorageSync(key)
                },
                setItem(key, value) {
                    uni.setStorageSync(key, value)
                },
            },
        },
    },
)
