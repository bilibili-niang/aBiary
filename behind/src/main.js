const app = require("./app");
// 这里只用引入server的配置
const {server} = require("./config/index");
const {insertLog} = require("./services/log.service");

const fileNameAndPath = __filename;
let date = new Date(+new Date() + 8 * 3600 * 1000).toISOString().replace(/T/g, " ").replace(/\.[\d]{3}Z/, "");


// 中间件：处理未定义的接口
app.use(async (ctx, next) => {
  await next(); // 等待其他中间件执行完毕
  // 如果请求没有被处理，返回 404 Not Found 错误
  if (ctx.body === undefined) {
    ctx.status = 404;
    ctx.body = {
      code: 404,
      success: false,
      msg: "你所访问的接口出错了或是暂无该接口",
      result: {}
    };
  }
});


app.listen(server.port, async () => {
  await insertLog({
    time: date,
    ip: "localhost",
    logType: "server start",
    detail: "服务器启动",
    userId: "root",
    fileNameAndPath
  });
  console.log(`server is running at 127.0.0.1:${server.port}`);
},(e)=>{
    console.log(e)
})
