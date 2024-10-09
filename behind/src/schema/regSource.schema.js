// 对应user表中的regSource来源id
const {DataTypes} = require("sequelize");
const seq = require("../db/seq");

const regSource = seq.define("regSource", {
  userId: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
    comment: "user表中的randomId"
  },
  openId: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
    comment: "记录的用户的微信的openId"
  }
});

//同步并创建表,创建完之后可以注释掉了
regSource.sync({
  // force: "true"
});

module.exports = regSource;