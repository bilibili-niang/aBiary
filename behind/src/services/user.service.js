const jwt = require("jsonwebtoken");
const axios = require("axios");
const user = require("../schema/user.schema");
const md5 = require("md5");
const {md5Key, salt, appid, secretKey} = require("../config");
const {verify} = require("./tools.service");
const {
  userParamsError,
  wxUserLoginError,
  tokenNotExist,
  userRegisterError,
  FormatError, tokenRefreshError
} = require("../constant/err.type");
const regSourceS = require("./regSource.service");
const WXBizDataCrypt = require("../utils/WXBizDataCrypt");
const DecryptS = require("../services/decrypt.service");

class UserService {
  async WxLogin(ctx) {
    const verifyRes = verify(ctx, {
      require: ["code"]
    });
    if (verifyRes.length > 0) {
      ctx.body = userParamsError;
      return false;
    }
    // 这一步的code一定存在
    const {code} = ctx.request.body;
    // 通过code获取用户的openid
    const url = "https://api.weixin.qq.com/sns/jscode2session?appid=" + appid + "&secret=" + secretKey + "&js_code=" + code + "&grant_type=authorization_code";
    let idResult = {};
    await axios({
      method: "get",
      url: url
    }).then(res => {
      /**
       * errcode 这个字段存在,说明出错了
       */
      if (res.data?.errcode) {
        ctx.body = wxUserLoginError;
        // 出错的
        return false;
      } else {
        /**
         * @example
         * {
         *   session_key: 'asfo;jdi;olgfhldifujgatdhg==',
         *   openid: 'asdgdfs-sdafdfzgASDG'
         * }
         */
        idResult = res.data;
      }
    });

    let userInfo = {};
    userInfo = await regSourceS.getUserById(idResult.openid);
    console.log("userInfo:");
    console.log(userInfo);
    let result = {};
    // openId不存在,创建一个
    if (!userInfo?.openId) {
      console.log('创建用户')
      const randomUserId = Math.round(Math.random() * 100000);
      const userName = "微信用户" + Math.round(Math.random() * 100000);

      await userS.userOperate.add({
        openId: idResult.openid,
        name: userName,
        randomId: randomUserId,
        avatar: "/images/avatars/defaultAvatar.png",
        password: md5("123456" + md5Key),
        sex: 0,
        sessionKey: idResult?.session_key || ""
      })
        .then(async res => {
          const {dataValues = null} = res;
          // 注册成功之后会有这个对象
          userInfo = dataValues;
          if (dataValues) {
            result = res;
            // 创建regSource表信息
            await regSourceS.regSourceOperate.add({
              openId: idResult.openid,
              userId: dataValues.randomId
            });
          }
        })
        .catch(e => {
          console.log(e)
          console.log('创建用户失败');
        });
    } else {
      // 存在,通过另一个service获取用户信息
      result = await userS.getUserInfoByRandomId(idResult.openid);
      // 设置token
      result.token = userS.createToken(result) || "";
    }
    delete result.password;
    // 是否为空
    if (JSON.stringify(result) === "{}") {
      ctx.body = userRegisterError;
    } else {
      ctx.body = {
        code: 200,
        success: true,
        message: "登录成功",
        result
      };
    }
  }

  async getInfoByToken(ctx) {
    const verifyRes = verify(ctx, {}, true);
    if (verifyRes.length >= 0) {
      ctx.body = tokenNotExist;
      return false;
    }
    const {token} = ctx.request.body;
    let userToken = await DecryptS.getUserInfo(token, salt);
    console.log("userToken:");
    console.log(userToken);
    const user = await userS.userOperate.findOne({
      randomId: userToken.randomId
    })
    console.log(user);
    ctx.body = {
      code: 200,
      success: true,
      message: "获取用户信息成功",
      result: user
    };
  }


  /**
   * 通过指定字段查询用户信息
   * @param Obj
   * @returns {Promise<void>}
   */
  async getUserInfo(Obj) {
    return await user.findOne({
      attributes: {exclude: ["id", "password", "idIdentify"]},
      where: Obj,
      raw: true
    });
  }


  /**
   * 增删改查
   * @param Obj
   * @returns {Promise<*>}
   */
  userOperate = {
    add: async (obj) => {
      return user.create(
        Object.assign(obj, {
          raw: true
        })
      );
    },
    findOne: async (obj) => {
      return user.findOne({
        where: obj,
        raw: true
      });
    },
    /**
     * 更新
     * @param obj 要更新的obj
     * @param target 查找的对象
     * @returns {Promise<*>}
     */
    update: async (obj, target) => {
      return await user.update(obj, {
        where: target,
        raw: true
      });
    }
  };


  /**
   * 加密
   * @param data
   * @returns {{result: string, code: string, success: boolean, message: string}|*}
   */
  createToken(data) {
    if (data) {
      // 创建新的token
      return jwt.sign(data, salt, {expiresIn: 60 * 60 * 24});
    } else {
      return tokenRefreshError;
    }
  }

  /**
   * 通过regSource表中的randomId获取用户信息
   */
  async getUserInfoByRandomId(openId) {
    const res = await regSourceS.regSourceOperate.findOne({openId});
    // console.log("通过注册来源查询的信息:", res);
    const {userId = null} = res;
    let result = {};
    if (!userId) {
      return FormatError;
    } else {
      result = await userS.userOperate.findOne({
        randomId: userId
      });
    }
    return result;
  }

  /**
   * 获取sessionKey
   * @param openId {string}
   */
  async getUserSessionKey(openId) {
    const url = "https://api.weixin.qq.com/sns/jscode2session?appid=" + appid + "&secret=" + secretKey + "&js_code=" + openId + "&grant_type=authorization_code";
    return await axios({
      method: "get",
      url: url
    });
  }

  /**
   * 微信用户解析获取用户手机号
   * @returns {Promise<Buffer>}
   */
  async getUserEncryptPhone(encryptedData, iv, sessionKey) {
    const pc = new WXBizDataCrypt(appid, sessionKey);
    const data = pc.decryptData(encryptedData, iv);
    return data;
  }

}

let userS = new UserService();
module.exports = new UserService();