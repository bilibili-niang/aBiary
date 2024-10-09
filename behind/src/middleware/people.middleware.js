const {verify} = require("../services/tools.service");
const {userParamsError} = require("../constant/err.type");
const peopleS = require("../services/people.service");
const peopleMiddleware = {

  /**
   * 获取联系人单个详情的接口校验
   * @returns {Promise<void>}
   */
  friendDetail: async (ctx, next) => {
    const verifyRes = verify(ctx, {
      require: ["friendId"]
    }, true);
    if (verifyRes === true) {
      await next();
    } else {
    }
  },
  // 添加联系人生日的校验
  friendAdd: async (ctx, next) => {
    const verifyRes = verify(ctx, {
      require: [{
        key: "name",
        type: String
      }, {
        key: "lunaBirthday",
        type: Object
      }]
    }, true);
    if (verifyRes.length >= 0) {
      userParamsError.result = verifyRes;
      ctx.body = userParamsError;
      return false;
    } else {
      await next();
    }
  },
  // 联系人信息更新
  friendUpdate: async (ctx, next) => {
    const verifyRes = verify(ctx, {
      require: [{
        key: "name",
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
  },
  // 新建联系人时,通过传入的联系人名字查询该联系人的信息是否重复,如果重复,返回该联系人最开始的数据
  friendRepeat: async (ctx, next) => {
    const {name, user} = ctx.request.body;
    await peopleS.peopleOperate.get({
      name,
      userId: user.randomId
    })
      .then(async res => {
        if (res.length > 0) {
          ctx.body = {
            code: 200,
            success: false,
            message: "该联系人已存在",
            result: res[0]
          };
        } else {
          await next();
        }
      })
      .catch(e => {
        console.log("e:");
        console.log(e);

      });

  }


};

module.exports = peopleMiddleware;