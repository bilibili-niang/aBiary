import {http} from "./index";

export default {
    /**
     * 向服务器发起登录
     * @param params
     */
    async login(params: {}) {
        return http<String[]>({
            url: '/api/wx/user/login',
            data: params,
            method: 'POST'
        })
    },
    async loginByToken(token?: string) {
        return http<String[]>({
            url: '/api/wx/user/loginByToken',
            method: 'POST',
            data: {token}
        })
    },
    async decryptPhone(params: object) {
        return http<String[]>({
            url: '/api/wx/user/decryptPhone',
            method: 'POST',
            data: params
        })
    },
    async updateUserInfo(params: object){
        return http<String[]>({
            url: '/api/wx/user/update',
            method: 'POST',
            data: params
        })
    }
}
