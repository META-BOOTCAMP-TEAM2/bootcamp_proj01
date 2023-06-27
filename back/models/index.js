/*eslint-disable*/
const { sequelize } = require("./connection");
const User = require("./user");
const Post = require("./post");
const Like = require("./like");

// const GoogleUser = require("./googleUser");
// const KakaoUser = require("./kakaoUser");
const Address = require("./address");

const db = {};

db.sequelize = sequelize;

// model 생성
db.User = User;
db.Post = Post;
db.Like = Like;
db.Address = Address;

// model init
User.init(sequelize);
Post.init(sequelize);
Like.init(sequelize);
// GoogleUser.init(sequelize);
// KakaoUser.init(sequelize);
Address.init(sequelize);

// association(관계 생성)
User.associate(db);
Post.associate(db);
Like.associate(db);
Address.associate(db);

module.exports = db;
