// 联系人模块
const Router = require("koa-router");
const router = new Router({prefix: "/people"});
const peopleS = require("../services/people.service");

const {
  friendDetail
} = require("../middleware/people.middleware");

router.post("/getPeopleList", peopleS.getFriendList);

// 获取指定联系人的detail
router.post("/friendDetail", friendDetail, peopleS.getFriendDetail);

module.exports = router;
