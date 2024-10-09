import type {loginResult} from "@/stores/modules/user";

/**
 * 请求响应定义
 */
export type Data<resultType> = {
    code: number
    msg: string
    message: string
    success: boolean
    result: any
}
