const {DataTypes} = require("sequelize");
const seq = require("../db/seq");

const User = seq.define("user", {
  randomId: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
    comment: "用户id"
  },
  name: {
    type: DataTypes.STRING(50),
    allonwNull: false,
    comment: "用户名,唯一"
  },
  phone: {
    type: DataTypes.STRING(50),
    allowNull: true,
    unique: true,
    comment: "phone"
  },
  password: {
    type: DataTypes.STRING(50),
    allowNull: false,
    comment: "密码"
  },
  realName: {
    type: DataTypes.STRING(50),
    allowNull: true,
    comment: "真实姓名"
  },
  idIdentify: {
    type: DataTypes.STRING(50),
    allowNull: true,
    comment: "身份证"
  },
  avatar: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: "用户的默认头像",
    defaultValue: "/images/avatars/defaultValueAvatar.png"
  },
  sex: {
    type: DataTypes.STRING(50),
    allowNull: true,
    comment: "用户性别,1为男,2为女,0为未知",
    defaultValue: 0
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: true,
    comment: "用户邮箱"
  },
  vipType: {
    type: DataTypes.STRING(50),
    allowNull: true,
    comment: "vip类型"
  },
  vipLevel: {
    type: DataTypes.STRING(50),
    allowNull: true,
    comment: "vip等级"
  },
  vipExp: {
    type: DataTypes.STRING(50),
    allowNull: true,
    comment: "vip经验"
  },
  vipStatus: {
    type: DataTypes.STRING(50),
    allowNull: true,
    comment: "vip状态"
  },
  vipStartTime: {
    type: DataTypes.STRING(50),
    allowNull: true,
    comment: "vip开始时间"
  },
  vipEndTime: {
    type: DataTypes.STRING(50),
    allowNull: true,
    comment: "vip结束时间"
  },
  regSource: {
    type: DataTypes.STRING(50),
    allowNull: true,
    comment: "注册来源"
  },
  birthday: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: "用户生日",
  },
  lunaBirthday: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: "用户生日,阴历",
  },
  sessionKey: {
    type: DataTypes.STRING(50),
    allowNull: true,
    comment: "微信sessionKey",
  }
});

// 同步并创建表,创建完之后可以注释掉了
User.sync({
  // force: "true"
});

module.exports = User;