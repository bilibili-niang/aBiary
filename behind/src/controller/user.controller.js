const userS = require("../services/user.service");
const {wxUserLoginError} = require("../constant/err.type");

class UserController {
  async decryptWeixinUserPhone(ctx) {
    const {encryptedData, iv, openId} = ctx.request.body;

    await userS.getUserSessionKey(openId)
      .then(async res => {
        console.log(res.data);
        if (res.data?.errcode) {
          ctx.body = wxUserLoginError;
          // 出错的
          return false;
        }

        let userPhone = "";
        await userS.getUserEncryptPhone(encryptedData, iv, res.data.session_key)
          .then(res => {
            userPhone = res;
          })
          .catch(e => {
            console.log("e:");
            console.log(e);
          });

        // 更新user表中的手机号

        const {user} = ctx.request.body;
        console.log("userPhone.phoneNumber", userPhone.phoneNumber);
        await userS.userOperate.update({
          phone: userPhone.phoneNumber
        }, {
          randomId: user.randomId
        }).then(res => {
          console.log("res:");
          console.log(res);
          ctx.body = {
            code: 200,
            success: true,
            message: "手机号更新成功",
            result: userPhone.phoneNumber || ""
          };
        })
          .catch(e => {
            console.log("e:");
            console.log(e);
            ctx.body = {
              code: 200,
              success: false,
              message: "更新手机号失败",
              result: ""
            };
          });
      })
      .catch(e => {
        console.log("e:");
        console.log(e);
      });

  }

  /**
   * 更新用户个人信息
   * @param ctx
   * @returns {Promise<void>}
   */
  async updateUserInfo(ctx) {
    const user = ctx.request.body.user;
    // 获取用户可以修改的字段
    const {
      name,
      phone,
      email,
      birthday,
      lunaBirthday,
      realName
    } = ctx.request.body;

    await userS.userOperate.update({
      name,
      phone,
      email,
      birthday,
      lunaBirthday,
      realName
    }, {
      randomId: user.randomId
    })
      .then(res => {
        console.log("res:");
        console.log(res);

        ctx.body = {
          code: 200,
          success: true,
          message: "用户更新个人信息成功"
        };
      })
      .catch(e => {
        console.log("e:");
        console.log(e);
        ctx.body = {
          code: 200,
          success: false,
          message: "用户更新个人信息失败"
        };
      });

  }
}

module.exports = new UserController();