// 用户记录的表
const {DataTypes} = require("sequelize");
const seq = require("../db/seq");

const People = seq.define("people", {
  bindId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: "绑定user表的id"
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "用户名,唯一"
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: "用户邮箱,唯一"
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: "用户的默认头像",
    defaultValue: "/images/avatars/defaultValueAvatar.png"
  },
  gender: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: "用户性别,1为男,2为女,0为未知",
    defaultValue: 0
  },
  remark: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: "为该用户的备注文字",
    defaultValue: "这个人是谁呢"
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
  animalSign: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: "生肖",
  }
});

//同步并创建表,创建完之后可以注释掉了
People.sync({
  // force: "true"
});

module.exports = People;