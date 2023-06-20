const Sequelize = require("sequelize");

module.exports = class Post extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        boardId: {
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
        filename1: {
          type: Sequelize.STRING(255),
        },
        filename2: {
          type: Sequelize.STRING(255),
        },
        filename3: {
          type: Sequelize.STRING(255),
        },

        originalName1: {
          type: Sequelize.STRING(255),
        },
        originalName2: {
          type: Sequelize.STRING(255),
        },
        originalName3: {
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
    db.Post.belongsTo(db.Board, {
      foreignKey: { name: "boardId", onDelete: "SET NULL", as: "Board" },
    });
    db.Post.belongsTo(db.User, {
      foreignKey: { name: "userId", onDelete: "SET NULL", as: "User" },
    });
  }

  static includeAttributes = [
    "id",
    "address",
    "propertyType",
    "userId",
    "createdAt",
  ];
};
