const Router = require("koa-router");
const {fileUploadError} = require("../constant/err.type");
const fileMiddleware = require("../middleware/file.middleware");
const router = new Router({prefix: "/file"});
const fileC = require("../controller/file.controller");

// 文件接收
router.post("/upload", fileMiddleware.avatarUpdate, fileMiddleware.avatarUploadParams, fileC.avatarUpload);

module.exports = router;