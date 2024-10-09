/*module.exports = {
  server: {
    port: "3000",
  },
  database: {
    host: 3306,
    user: "root",
    pwd: "123456",
    name: "birthdaySchema"
  },
  database2: {
    host: "124.223.212.143",
    port: 3306,
    user: "root",
    pwd: "xD7nKRRFTMWSfmeA",
    name: "birthdaySchema"
  },
  /!**
   * 密码加密的值
   *!/
  md5Key: "as34j.23sdg/",
  /!**
   * 加密的值
   *!/
  salt: "birthdaySecret",
  appid: "wx7fc0635ddc1b6a6c",
  secretKey:'e36f941d54f8ae1f698270e7ce5a63b7'
};*/

// linux
// const globalConfig = require('/globleConfig.js')
// windows
const globalConfig = require('C://globleConfig.js')
console.log('globalConfig', globalConfig)
console.log("globalConfig:")
console.log(globalConfig)
module.exports = globalConfig