//用户模块
const Router = require("koa-router");
const router = new Router({prefix: "/wx/user"});
const userS = require("../services/user.service");
const userMiddleware = require("../middleware/user.middleware");
const userC = require("../controller/user.controller");

//用户注册
router.post("/", ctx => {
  ctx.body = {
    code: 0,
    message: "注册成功"
  };
});

/**
 * 解密用户手机号
 */
router.post("/decryptPhone", userMiddleware.decryptPhone, userC.decryptWeixinUserPhone);


/**
 *  用户登录
 */
router.post("/login", userS.WxLogin);
/**
 * token解析用户信息
 */
router.post("/loginByToken", userS.getInfoByToken);

/**
 * 用户修改个人信息
 */
router.post('/update',userMiddleware.verifyToken,userC.updateUserInfo)


module.exports = router;
