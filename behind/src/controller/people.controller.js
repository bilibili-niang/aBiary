const {salt} = require("../config");
const {TokenExpiredError} = require("../constant/err.type");
const jwt = require("jsonwebtoken");
const peopleS = require("../services/people.service");

class PeopleController {
  async update(ctx) {
    const {
      lunaBirthday,
      token
    } = ctx.request.body;
    let updateData = JSON.parse(JSON.stringify(lunaBirthday));

    let user = {};
    try {
      user = jwt.verify(token, salt);
    } catch (e) {
      // 可能是token过期
      ctx.body = TokenExpiredError;
      console.log(e);
    }

    // 下面几个属性很关键,不能让外部接口更改
    delete updateData.userId;
    delete updateData.id;
    delete updateData.friendId;
    delete updateData.avatar;

    const res = await peopleS.peopleOperate.update(updateData, {
      friendId: lunaBirthday.friendId,
      userId: user.randomId
    });
    if (res[0] === 1) {
      // 成功
      ctx.body = {
        code: 200,
        success: true,
        result: "",
        message: "联系人信息更新成功"
      };

    } else {
      ctx.body = {
        code: 200,
        success: false,
        result: "",
        message: "联系人信息更新失败"
      };
    }

  }
}

module.exports = new PeopleController();