// people的service逻辑
const {verify} = require("./tools.service");
const {
  userParamsError,
  TokenExpiredError,
  JsonWebTokenError,
  tokenNotExist
} = require("../constant/err.type");

const friendS = require("../services/friend.services");
const {salt} = require("../config");
const jwt = require("jsonwebtoken");
const friend = require("../schema/friend.schema");
const DecryptService = require("../services/decrypt.service");

class PeopleService {
  async add(ctx) {
    const {
      name,
      lunaBirthday,
      token
    } = ctx.request.body;

    let insertData = {
      name, ...lunaBirthday
    };

    let user = {};
    try {
      user = jwt.verify(token, salt);
    } catch (e) {
      // 可能是token过期
      ctx.body = TokenExpiredError;
      console.log(e);
    }
    if (!user?.randomId) {
      // token过期,上面已处理
    } else {
      const friendId = Math.round(Math.random() * 100000);
      insertData.userId = user.randomId;
      insertData.friendId = friendId;
      await friendS.friendOperate.add(insertData)
        .then(res => {
          ctx.body = {
            success: true,
            message: "添加成功",
            code: 200,
            result: res
          };
        })
        .catch(e => {
          console.log("e:");
          console.log(e);
        });
    }


  }

  // 获取当前登录用户的联系人列表
  async getFriendList(ctx) {
    const verifyRes = verify(ctx, {}, true);
    if (verifyRes.length >= 0) {
      ctx.body = tokenNotExist;
      return;
    }
    let user = await DecryptService.getUserInfo(ctx.request.body.token, salt);
    const {randomId = null} = user;
    if (!randomId) {
      JsonWebTokenError.message = "randomId不存在,用户token信息错误";
      ctx.body = JsonWebTokenError;
      return null;
    }
    const friendListRes = await friendS.friendOperate.get({
      userId: randomId
    });
    ctx.body = {
      code: 200,
      message: "获取联系人列表",
      result: friendListRes
    };
  }

  // 获取指定联系人的detail
  async getFriendDetail(ctx) {
    // 校验token
    const verifyRes = verify(ctx, {
      require: ["friendId"]
    }, true);
    if (verifyRes.length > 0) {
      tokenNotExist.message = "";
      tokenNotExist.result = verifyRes;
      ctx.body = tokenNotExist;
      return;
    }
    const {token, friendId} = ctx.request.body;
    let user = {};
    try {
      user = jwt.verify(token, salt);
    } catch (e) {
      console.log("e");
      console.log(e);
    }
    const {randomId = null} = user;
    if (!randomId || !friendId) {
      ctx.body = userParamsError;
      return false;
    } else {
      const result = await peopleS.peopleOperate.get({
        userId: randomId,
        friendId
      });
      ctx.body = {
        success: true,
        code: 200,
        result
      };
    }

  }

  peopleOperate = {
    get: async (obj) => {
      return await friend.findAll({
        where: obj,
        raw: true
      });
    },
    update: async (obj, target) => {
      return await friend.update(obj, {
        where: target,
        raw: true
      });
    }
  };
}

const peopleS = new PeopleService();

module.exports = new PeopleService();