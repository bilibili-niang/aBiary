const {salt} = require("../config");
const {TokenExpiredError} = require("../constant/err.type");
const jwt = require("jsonwebtoken");
/**
 *
 * @param ctx
 * @param verifyObj{Object | Array} 需要校验的关键字
 * @param needToken{Boolean} 是否需要token
 * @returns {boolean|*[]}
 */
const verify = (ctx, verifyObj, needToken) => {
  const requireList = verifyObj.require;
  const result = [];
  if (requireList) {
    requireList.forEach(item => {
      // item 为string
      if (item.constructor === String) {
        if (!ctx.request.body[item]) {
          result.push(`缺少${item}参数`);
        }
      } else if (item.constructor === Object) {
        if (!ctx.request.body[item.key]) {
          result.push(`缺少${item.key}参数`);
        } else {
          try {
            if (((ctx.request.body)[item.key]).constructor !== item.type) {
              result.push(`${item.key}的类型错误`);
            }
          } catch (e) {
            console.log(e);
          }
        }
      }
    });
  }
  let token = "";
  if (needToken) {
    token = ctx.request.headers?.token || ctx.request.headers?.authorization || ctx.request.body?.token;
    if (token) {
      // 挂载,方便后续取值
      ctx.request.body.token = token;
      let user = {};
      try {
        user = jwt.verify(token, salt);
        ctx.request.body.user = user;
      } catch (e) {
        // 可能是token过期
        console.log("可能是token过期");
        ctx.body = TokenExpiredError;
      }
    } else {
      result.push("token不存在");
      return result;
    }
  }
  return result.length === 0 ? true : result;
};

/**
 * 对文件上传进行校验
 */
const verifyFile = (ctx, verifyObj) => {

};

module.exports = {
  verify,
  verifyFile
};