// 首页
const fs = require("fs");
const Router = require("koa-router");
// 这里可以设置总路由的前缀
// const router = new Router({prefix: '/indexData'})
const router = new Router();

fs.readdirSync(__dirname).forEach(file => {
  if (file !== "index.js") {
    let r = require("./" + file);
    router.use(r.routes());
  }
});

/*router.all("/", (ctx) => {
  ctx.body = {
    code: 200,
    success: false,
    msg: "你所访问的接口出错了或是暂无该接口",
    result: {}
  };
});*/


module.exports = router;