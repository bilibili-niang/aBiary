const Router = require("koa-router");
const peopleS = require("../services/people.service");
const peopleMiddleware = require("../middleware/people.middleware");
const peopleC = require("../controller/people.controller");
const router = new Router({prefix: "/wx/birthday"});

/**
 * 联系人信息新增
 * /wx/birthday/add
 */
router.post("/add", peopleMiddleware.friendAdd, peopleMiddleware.friendRepeat, peopleS.add);

/**
 * 联系人信息更新
 */
router.post("/update", peopleMiddleware.friendUpdate, peopleC.update);

module.exports = router;