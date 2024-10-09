const {verifyFile, verify} = require("../services/tools.service");
const {userParamsError, fileUploadError} = require("../constant/err.type");
const fileMiddleware = {
  // 头像更新,需要一些字段存在
  avatarUpdate: async (ctx, next) => {
    try {
      if (!ctx.request.files) {
        ctx.body = fileUploadError;
      } else {
        await next();
      }
    } catch (e) {
      console.log(e);
      ctx.body = fileUploadError;
    }
  },
  /**
   * 对用户头像更改接口body中携带的必要参数进行校验
   * @param ctx
   * @param next
   * @returns {Promise<void>}
   */
  avatarUploadParams: async (ctx, next) => {
    const verifyRes = verify(ctx, {
      require: [{
        key: "friendId",
        type: String
      }]
    }, true);
    if (verifyRes.length >= 0) {
      userParamsError.result = verifyRes;
      ctx.body = userParamsError;
      return false;
    } else {
      await next();
    }
  }
};


module.exports = fileMiddleware;