// 通过regSource表查询user
const regSource = require("../schema/regSource.schema");

class RegSourceService {
  /**
   * 通过指定的id获取用户的randonId
   * @returns {Promise<void>}
   */
  async getUserById(openId) {
    return await regSourceS.regSourceOperate.findOne({
      openId
    });
  }

  async createId(openId, userId) {
    return await regSource.create({
      openId,
      userId
    });
  }

  regSourceOperate = {
    add: async (obj) => {
      return regSource.create(
        Object.assign(obj, {
          raw: true
        }));
    },
    findOne: async (obj) => {
      return regSource.findOne({
        where: obj,
        raw: true
      });
    }
  };
}

const regSourceS = new RegSourceService();
module.exports = new RegSourceService();