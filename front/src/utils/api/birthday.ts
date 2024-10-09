import {http} from "./index";

export default {
    async addBirthday(params: {}) {
        return http<String[]>({
            url: '/api/wx/birthday/add',
            data: params,
            token: true,
            method: 'POST'
        })
    },
    async updateFriendBirthday(params: {}) {
        return http<String[]>({
            url: '/api/wx/birthday/update',
            data: params,
            token: true,
            method: 'POST'
        })
    }

}
