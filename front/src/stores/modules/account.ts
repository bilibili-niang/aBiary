import {defineStore} from 'pinia'

export const account = defineStore('account', {
    state: () => {
        return {
            account: {
                name: 'userName',
                age: 10
            }
        }
    },
    actions: {
        login(account: Object) {
            console.log(account)
        }
    }
})
