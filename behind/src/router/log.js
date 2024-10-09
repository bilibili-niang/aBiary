const Router = require("koa-router");
const LogMiddleware = require("../middleware/log.middleware");
const logC = require("../controller/log.controller");
const router = new Router({
  prefix: "/wx/log"
});

/**
 * 添加留言
 */
router.post("/message", LogMiddleware.message,LogMiddleware.ipRepeat, logC.addMessage);

module.exports = router;