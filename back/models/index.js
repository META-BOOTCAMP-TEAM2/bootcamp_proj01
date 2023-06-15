/*eslint-disable*/
const { sequelize } = require("./connection");
const User = require("./user");
const GoogleUser = require("./googleUser");
const KakaoUser = require("./kakaoUser");

const db = {};

db.sequelize = sequelize;

// model 생성
db.User = User;
db.GoogleUser = GoogleUser;
db.KakaoUser = KakaoUser;

// model init
User.init(sequelize);
GoogleUser.init(sequelize);
KakaoUser.init(sequelize);

// // association(관계 생성)
// Department.associate(db);
// User.associate(db);

module.exports = db;
