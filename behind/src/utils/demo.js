var WXBizDataCrypt = require("./WXBizDataCrypt");

var appId = "wx7fc0635ddc1b6a6c";
var sessionKey = "5ArFj1W+p5zPHe2IgfzxBA==";
var encryptedData = "p02t+YIgXQj111cbN7aPunwDbg7MlpG1cS63JKXM2zDv+uwkrRoUEhYDp4sC5/BXkgmwVh0cMt2qXFvaEApkImHzZnWbneLT1EtUiwtl4HayDWekHXO+mUUgtsSi3Xr6a8IUwIFVLXfZFWUu9FeGRp4Lh/d3YvWdBP0XiuLEnBCqxbDm1F/jpSMcUbrgPz1ySxMS2uxcGKtDGkjGSaXNug==";
var iv = "L9U/BuEHBfx0fF9wuY5/JA==";

var pc = new WXBizDataCrypt(appId, sessionKey);

var data = pc.decryptData(encryptedData, iv);

console.log("解密后 data: ", data);
// 解密后的数据为
//
// data = {
//   "nickName": "Band",
//   "gender": 1,
//   "language": "zh_CN",
//   "city": "Guangzhou",
//   "province": "Guangdong",
//   "country": "CN",
//   "avatarUrl": "http://wx.qlogo.cn/mmopen/vi_32/aSKcBBPpibyKNicHNTMM0qJVh8Kjgiak2AHWr8MHM4WgMEm7GFhsf8OYrySdbvAMvTsw3mo8ibKicsnfN5pRjl1p8HQ/0",
//   "unionId": "ocMvos6NjeKLIBqg5Mr9QjxrP1FA",
//   "watermark": {
//     "timestamp": 1477314187,
//     "appid": "wx4f4bc4dec97d474b"
//   }
// }
