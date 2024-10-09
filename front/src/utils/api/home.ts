import {http} from "./index";

export default {
    /**
     * 获取首页数据
     * @return Promise
     */
    async home(params: {}) {
        return http<String[]>({
            url: '/api/home',
            data: params,
            method: 'POST'
        })
    },
    /**
     * 获取数据失败的测试
     */
    async homeFail() {
        return http<String[]>({url: '/api/fail'})
    },

    /**
     * 获取首页推荐文章
     */
    async homeRecommend() {
        return http<String[]>({url: '/api/markdownFile/getRecommend'})
    },

    /**
     * 获取所有tags
     */
    async allTags() {
        return http<String[]>({url: '/api/markdownFile/tags'})
    },
    /**
     * 随机获取一条文章数据
     */
    async getRandomOne() {
        return http<String[]>({
            url: '/api/markdownFile/random'
        })
    },

    /**
     * 通过tags获取与其有关的文章列表
     * @param params
     */
    async aboutTags(params: any) {
        return http<String[]>({
            url: '/api/tag/aboutTag',
            method: 'POST',
            data: params
        })
    },

    async getMarkdownById(params: any) {
        return http<String[]>({
            url: '/api/markdownFile/getData',
            method: 'POST',
            data: params
        })
    },

    async getMarkdownContent(params: any) {
        return http<String[]>({
            url: '/api/markdownFile/transformToHtml',
            method: 'POST',
            data: params
        })
    },
    async getPeopleList() {
        return http<String[]>({
            url: '/api/people/getPeopleList',
            method: 'POST',
        })
    }
}
