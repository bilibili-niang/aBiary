const {DataTypes} = require("sequelize");
const seq = require("../db/seq");

const Friend = seq.define("friend", {
  friendId: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
    comment: "联系人id"
  },
  userId: {
    type: DataTypes.STRING(50),
    allowNull: false,
    comment: "关联的user表id"
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    comment: "联系人名字"
  },
  avatar: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: "联系人的默认头像",
    defaultValue: "/images/avatars/defaultFriendAvatar.png"
  },
  weichatId: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: "联系人的微信号"
  },
  sex: {
    type: DataTypes.STRING(50),
    allowNull: true,
    comment: "用户性别,1为男,2为女,0为未知",
    defaultValue: 0
  },
  classify: {
    type: DataTypes.STRING(50),
    allowNull: true,
    comment: "分类"
  },
  animalSign: {
    type: DataTypes.STRING(50),
    allowNull: true,
    comment: "生肖"
  },
  level: {
    type: DataTypes.STRING(50),
    allowNull: true,
    comment: "等级"
  },
  relationship: {
    type: DataTypes.STRING(50),
    allowNull: true,
    comment: "关系"
  },
  remarks: {
    type: DataTypes.STRING(50),
    allowNull: true,
    comment: "备注"
  },
  remindType: {
    type: DataTypes.STRING(50),
    allowNull: true,
    comment: "生日提醒类型"
  },
  remindFrequency: {
    type: DataTypes.STRING(50),
    allowNull: true,
    comment: "生日提醒时间"
  },
  lYear: {
    type: DataTypes.STRING(10),
    allowNull: true,
    comment: "阴历-年"
  },
  lMonth: {
    type: DataTypes.STRING(10),
    allowNull: true,
    comment: "阴历-月"
  },
  lDay: {
    type: DataTypes.STRING(10),
    allowNull: true,
    comment: "阴历-日"
  },
  Animal: {
    type: DataTypes.STRING(10),
    allowNull: true,
    comment: "生肖"
  },
  IMonthCn: {
    type: DataTypes.STRING(10),
    allowNull: true,
    comment: "阴历-月-大写"
  },
  IDayCn: {
    type: DataTypes.STRING(10),
    allowNull: true,
    comment: "阴历-日-大写"
  },
  cYear: {
    type: DataTypes.STRING(10),
    allowNull: true,
    comment: "阳历-年"
  },
  cMonth: {
    type: DataTypes.STRING(10),
    allowNull: true,
    comment: "阳历-月"
  },
  cDay: {
    type: DataTypes.STRING(10),
    allowNull: true,
    comment: "阳历-日"
  },
  gzYear: {
    type: DataTypes.STRING(10),
    allowNull: true,
    comment: "干支年份"
  },
  gzMonth: {
    type: DataTypes.STRING(10),
    allowNull: true,
    comment: "干支月份"
  },
  gzDay: {
    type: DataTypes.STRING(10),
    allowNull: true,
    comment: "干支日"
  },
  astro: {
    type: DataTypes.STRING(10),
    allowNull: true,
    comment: "星座"
  },
  phone: {
    type: DataTypes.STRING(50),
    allowNull: true,
    comment: "手机号"
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: true,
    comment: "邮箱"
  }
});

//同步并创建表,创建完之后可以注释掉了
Friend.sync({
  // force: "true"
});

module.exports = Friend;