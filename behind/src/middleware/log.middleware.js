const {verify} = require("../services/tools.service");
const {commentNotAllow, commentUserNotAllow} = require("../constant/err.type");
const logC = require("../services/log.service");

class LogMiddleware {
  async message(ctx, next) {
    const verifyRes = verify(ctx, {
      require: [{
        key: "text",
        type: String
      }]
    });
    if (verifyRes.length >= 0) {
      ctx.body = commentNotAllow;
      return false;
    } else {
      await next();
    }
  }

  /**
   * 查询这个ip发送的信息是否超过了500条
   * @param ctx
   * @param next
   * @returns {Promise<void>}
   */
  async ipRepeat(ctx, next) {
    const ips = await logC.getLog({
      fileNameAndPath: ctx.request.ip
    });
    console.log(ips.length);
    if (ips.length <= 500) {
      await next();
    } else {
      ctx.body = commentUserNotAllow;
    }
  }
}

module.exports = new LogMiddleware();