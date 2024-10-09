const friend = require("../schema/friend.schema");

class FriendServices {

  friendOperate = {
    add: async (obj) => {
      return await friend.create(
        Object.assign(obj, {
          raw: true
        }));
    },
    get: async (obj) => {
      return await friend.findAll({
        where: obj,
        raw: true
      });
    },
    /**
     * 更新
     * @param obj 要更新的obj
     * @param target 查找的对象
     * @returns {Promise<*>}
     */
    update:async(obj,target)=>{
      return await friend.update(obj,{
        where: target,
        raw: true
      });
    }
  };
}

const friendS = new FriendServices();
module.exports = new FriendServices();