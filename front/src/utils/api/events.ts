import {http} from "./index";

export default {
    async postEvents(params: object) {
        return http<String[]>({
            url: '/api/home',
            data: params,
            method: 'POST'
        })
    },

    /**
     * 提交留言
     */
    async submitMessage(text: string) {
        return http<String>({
            url: '/api/wx/log/message',
            data: {
                text
            },
            method: 'POST'
        })
    }

}
