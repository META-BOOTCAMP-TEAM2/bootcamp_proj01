/*eslint-disable*/
const Sequelize = require("sequelize");

module.exports = class GoogleUsers extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        googleId: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        displayName: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        firstName: {
          type: Sequelize.STRING(500),
          allowNull: false,
        },
        lastName: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        image: {
          type: Sequelize.STRING(255),
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
};
