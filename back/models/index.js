/*eslint-disable*/
const { sequelize } = require("./connection");
const User = require("./user");
const Post = require("./post");
const Like = require("./like");
<<<<<<< HEAD

// const GoogleUser = require("./googleUser");
// const KakaoUser = require("./kakaoUser");
=======
const Address = require("./address");
>>>>>>> d5bf5698864de21fc1ac36410994f668ffb7f0be

const db = {};

db.sequelize = sequelize;

// model 생성
db.User = User;
db.Post = Post;
db.Like = Like;
<<<<<<< HEAD
=======
db.Address = Address;
>>>>>>> d5bf5698864de21fc1ac36410994f668ffb7f0be

// model init
User.init(sequelize);
Post.init(sequelize);
Like.init(sequelize);
<<<<<<< HEAD
// GoogleUser.init(sequelize);
// KakaoUser.init(sequelize);
=======
Address.init(sequelize);
>>>>>>> d5bf5698864de21fc1ac36410994f668ffb7f0be

// association(관계 생성)
User.associate(db);
Post.associate(db);
Like.associate(db);
<<<<<<< HEAD
=======
Address.associate(db);
>>>>>>> d5bf5698864de21fc1ac36410994f668ffb7f0be

module.exports = db;
