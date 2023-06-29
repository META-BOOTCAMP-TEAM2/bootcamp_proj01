const Sequelize = require("sequelize");

module.exports = class Like extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        postId: {
          type: Sequelize.INTEGER,
        },
        userId: {
          type: Sequelize.INTEGER,
        },
        like: {
          type: Sequelize.BOOLEAN,
          defaultValue: true,
        },
      },
      {
        sequelize,
        underscored: true, // true: underscored, false: camelCase
        timestamps: true, // createAt, updatedAt
        paranoid: false, // deletedAt
      }
    );
  }

  static associate(db) {
    db.Like.belongsTo(db.Post, {
      foreignKey: { name: "postId", onDelete: "CASCADE", as: "Post" },
    });
    db.Like.belongsTo(db.User, {
      foreignKey: { name: "userId", onDelete: "CASCADE", as: "User" },
    });
  }
  static includeAttributes = ["like", "userId", "postId", "createdAt"];
};
