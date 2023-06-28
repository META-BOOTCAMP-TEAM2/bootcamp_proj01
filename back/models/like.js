const Sequelize = require('sequelize');

module.exports = class Like extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {},
      {
        sequelize,
        underscored: true, // true: underscored, false: camelCase
        timestamps: false, // createAt, updatedAt
        paranoid: false, // deletedAt
      },
    );
  }

  static associate(db) {
    db.Like.belongsTo(db.Post, {
      foreignKey: { name: 'postId', onDelete: 'SET NULL', as: 'Post' },
    });
    db.Like.belongsTo(db.User, {
      foreignKey: { name: 'userId', onDelete: 'SET NULL', as: 'User' },
    });
  }
};
