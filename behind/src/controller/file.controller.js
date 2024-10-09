const {salt} = require("../config");
const {TokenExpiredError} = require("../constant/err.type");
const jwt = require("jsonwebtoken");
const friendS = require("../services/friend.services");

class FileController {
  /**
   * friend头像更改的逻辑
   * @param ctx
   */
  async avatarUpload(ctx) {
    const file = ctx.request.files.file;
    const {friendId, token} = ctx.request.body;
    const pathList = file.path.split("\\");
    const fileName = "/" + (pathList[pathList.length - 1] + "");

    let user = {};
    try {
      user = jwt.verify(token, salt);
    } catch (e) {
      // 可能是token过期
      ctx.body = TokenExpiredError;
      console.log(e);
    }

    await friendS.friendOperate.update({
      avatar: fileName
    }, {
      userId: user.randomId,
      friendId: friendId
    })
      .then(res => {
        ctx.body = {
          code: 200,
          success: true,
          message: "头像更换成功",
          result: ""
        };
      })
      .catch(e => {
        console.log("e:");
        console.log(e);
        ctx.body = {
          code: 200,
          success: false,
          message: "头像更换失败",
          result: fileName
        };
      });


  }
}

module.exports = new FileController();