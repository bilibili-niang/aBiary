const {userParamsError, tokenNotExist} = require("../constant/err.type");
const {verify} = require("../services/tools.service");

class UserMiddleware {
  async decryptPhone(ctx, next) {
    const verifyRes = verify(ctx, {
      require: [{
        key: "encryptedData",
        type: String
      }, {
        key: "iv",
        type: String
      }, {
        key: "openId",
        type: String
      }]
    }, true);
    if (verifyRes.length > 0) {
      userParamsError.result = verifyRes.join(",");
      ctx.body = userParamsError;
      return false;
    } else {
      await next();
    }
  }

  /**
   * 对用户的token进行校验,解密
   * @param ctx
   * @param next
   * @returns {Promise<boolean>}
   */
  async verifyToken(ctx, next) {
    const verifyRes = verify(ctx, {}, true);
    if (verifyRes.length >= 0) {
      ctx.body = tokenNotExist;
      return false;
    } else {
      await next();
    }
  }
}

module.exports = new UserMiddleware();