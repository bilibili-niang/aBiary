const logC = require("../services/log.service");

class LogController {
  addMessage = async (ctx) => {
    const {text} = ctx.request.body;
    await logC.insertLog({
      logType: "message",
      detail: text,
      fileNameAndPath: ctx.request.ip
    })
      .then(res => {
        ctx.body = {
          code: 200,
          success: true,
          message: "留言成功",
          result: ""
        };
      })
      .catch(e => {
        console.log("e:");
        console.log(e);
        ctx.body = {
          code: 200,
          success: false,
          message: "留言失败",
          result: ""
        };
      });

  };

}

module.exports = new LogController();