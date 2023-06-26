/*eslint-disable*/
const { sequelize } = require("./connection");
const User = require("./user");
const Board = require("./board");
const Post = require("./post");
const Like = require("./like");

// const GoogleUser = require("./googleUser");
// const KakaoUser = require("./kakaoUser");

const db = {};

db.sequelize = sequelize;

// model 생성
db.User = User;
db.Board = Board;
db.Post = Post;
db.Like = Like;

// model init
User.init(sequelize);
Board.init(sequelize);
Post.init(sequelize);
Like.init(sequelize);
// GoogleUser.init(sequelize);
// KakaoUser.init(sequelize);

// // association(관계 생성)
User.associate(db);
Board.associate(db);
Post.associate(db);
Like.associate(db);

module.exports = db;
