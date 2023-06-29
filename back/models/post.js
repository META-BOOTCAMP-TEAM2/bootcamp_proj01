const Sequelize = require("sequelize");

module.exports = class Post extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        addressId: {
          type: Sequelize.INTEGER,
        },
        userId: {
          type: Sequelize.INTEGER,
          defaultValue: 1,
        },
        userid: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        address: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        additionalInfo: {
          type: Sequelize.TEXT,
        },
        deposit: {
          type: Sequelize.INTEGER,
          allowNull: true,
          defaultValue: 0,
        },
        monthlyRent: {
          type: Sequelize.INTEGER,
          allowNull: true,
          defaultValue: 0,
        },
        price: {
          type: Sequelize.INTEGER,
          allowNull: true,
          defaultValue: 0,
        },
        propertyType: {
          type: Sequelize.STRING(255),
        },
        structure: {
          type: Sequelize.STRING(255),
        },
        path1: {
          type: Sequelize.STRING(255),
        },
        path2: {
          type: Sequelize.STRING(255),
        },
        path3: {
          type: Sequelize.STRING(255),
        },
        options: {
          type: Sequelize.STRING(255),
        },
        viewCount: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
      },
      {
        sequelize,
        // tableName: 'tableName', // table명을 수동으로 생성 함
        // freezeTableName: true, // true: table명의 복수형 변환을 막음
        underscored: true, // true: underscored, false: camelCase
        timestamps: true, // createAt, updatedAt
        paranoid: true, // deletedAt
      }
    );
  }

  static associate(db) {
    db.Post.belongsTo(db.Address, {
      foreignKey: { name: "addressId", onDelete: "SET NULL", as: "Address" },
    });
    db.Post.belongsTo(db.User, {
      foreignKey: { name: "userId", onDelete: "SET NULL", as: "User" },
    });
    db.Post.hasMany(db.Like, {
      foreignKey: { name: "postId", onDelete: "SET NULL", as: "Like" },
    });
  }

  static includeAttributes = ["id", "address", "propertyType", "userId", "createdAt"];
};
