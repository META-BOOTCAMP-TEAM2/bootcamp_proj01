const Sequelize = require("sequelize");

module.exports = class Like extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
<<<<<<< HEAD
      {},
      {
        sequelize,
        underscored: true, // true: underscored, false: camelCase
        timestamps: false, // createAt, updatedAt
        paranoid: false, // deletedAt
=======
      {
        postId: {
          type: Sequelize.INTEGER,
        },
        userId: {
          type: Sequelize.INTEGER,
        },
        like: {
          type: Sequelize.BOOLEAN,
          defaultValue: null,
        },
      },
      {
        sequelize,
        // tableName: 'tableName', // table명을 수동으로 생성 함
        // freezeTableName: true, // true: table명의 복수형 변환을 막음
        underscored: true, // true: underscored, false: camelCase
        timestamps: true, // createAt, updatedAt
        paranoid: true, // deletedAt
>>>>>>> d5bf5698864de21fc1ac36410994f668ffb7f0be
      }
    );
  }

  static associate(db) {
    db.Like.belongsTo(db.Post, {
<<<<<<< HEAD
      foreignKey: { name: "postid", onDelete: "CASCADE", as: "Post" },
    });
    db.Like.belongsTo(db.User, {
      foreignKey: { name: "userid", onDelete: "CASCADE", as: "User" },
    });
  }
=======
      foreignKey: { name: "postId", onDelete: "SET NULL", as: "Post" },
    });
    db.Like.belongsTo(db.User, {
      foreignKey: { name: "userId", onDelete: "SET NULL", as: "User" },
    });
  }

  static includeAttributes = ["like", "userId", "createdAt"];
>>>>>>> d5bf5698864de21fc1ac36410994f668ffb7f0be
};
