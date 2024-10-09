// 登录时result中的数据
type resultObj = {
    id: Number,
    email: String,
    username: String,
    avatar: String,
    token: String,
}
// 登录接口
export type loginResult = {
    code: Number,
    result: resultObj,
    success: Boolean,
    message: String,
}