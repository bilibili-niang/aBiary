// 解密
const jwt = require("jsonwebtoken");
const {TokenExpiredError} = require("../constant/err.type");

class DecryptService {
  /**
   * 对用户加密信息进行解密
   * @returns {object}
   * 解密后的用户数据
   * @param encryptStrings {string}
   * 需要解密的token
   * @param salt {string}
   * 加密的盐
   */
  async getUserInfo(encryptStrings, salt) {
    let data = {};
    try {
      data = jwt.verify(encryptStrings, salt);
    } catch (e) {
      // 解密失败,token过期
      data = TokenExpiredError;
    }
    console.log('解析的token:')
    console.log(data)
    return data;
  }

}

module.exports = new DecryptService();