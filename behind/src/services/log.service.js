const log = require("../schema/logTools");

class logC {
  // async insertLog(option = {}) {
  async insertLog(option = {}) {
    return await log.create(option);
  }

  async getLog(obj = {}) {
    return await log.findAll({
        where: obj,
        raw: true
      });
  }
}

module.exports = new logC();