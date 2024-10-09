const koa = require("koa");
const router = require("../router");
const koabody = require("koa-body");
const koaStatic = require("koa-static");
//参数校验
const parameter = require("koa-parameter");
const template = require("koa-html-template");
const static = require("koa-static");
const app = new koa();
const path = require("path");

// 跨域
app.use(async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", "*");
  ctx.set("Access-Control-Allow-Headers", "Content-Type");
  ctx.set("Access-Control-Allow-Methods", "POST");
  await next();
});

//开放html模板的静态目录
app.use(static(path.join(__dirname, "../static/views/"), {extension: "html"}));
app.use(static(path.join(__dirname, "../static")));
/* @author 张嘉凯
 * @date 2023/6/21 @time 15:21
 * 存放文章图片
*/
app.use(static(path.join(__dirname, "../static/images/markdown")));
app.use(template());

app.use(koabody({
  multipart: true, //支持图片文件
  formidable: {
    uploadDir: path.join(__dirname, "../upload"), //设置上传目录
    keepExtensions: true, //保留拓展名
  }
}));


app.use(parameter(app));

//开放静态资源路径
app.use(koaStatic(path.join(__dirname, "../upload")));
app.use(koaStatic(path.join(__dirname, "../bonus")));
//挂载
app.use(router.routes());

//统一的错误处理:
app.on("error", (error) => {
  console.log("错误统一处理");
  console.log(error);
});

// 导出:
module.exports = app;
