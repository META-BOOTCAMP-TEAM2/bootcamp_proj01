/*eslint-disable*/
const Sequelize = require("sequelize");

module.exports = class KakaoUsers extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        email: {
          type: Sequelize.STRING(40),
          allowNull: true,
          unique: true,
        },
        nick: {
          type: Sequelize.STRING(15),
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        provider: {
          type: Sequelize.ENUM("local", "kakao"),
          allowNull: false,
          defaultValue: "local",
        },
        snsId: {
          type: Sequelize.STRING(30),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "KakaoUser",
        tableName: "KakaoUsers",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  // static associate(db) {
  //   db.KakaoUser.hasMany(db.Post);
  //   db.KakaoUser.belongsToMany(db.KakaoUser, {
  //     foreignKey: 'followingId',
  //     as: 'Followers',
  //     through: 'Follow',
  //   });
  //   db.KakaoUser.belongsToMany(db.KakaoUser, {
  //     foreignKey: 'followerId',
  //     as: 'Followings',
  //     through: 'Follow',
  //   });
  // }
};
