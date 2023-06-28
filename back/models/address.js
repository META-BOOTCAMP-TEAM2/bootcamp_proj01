const Sequelize = require("sequelize");

module.exports = class Address extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        address: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        active: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: true,
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
    db.Address.hasMany(db.Post, {
      foreignKey: { name: "addressId", onDelete: "SET NULL", as: "Post" },
    });
  }

  static includeAttributes = ["id", "address", "active", "createdAt"];
};

// 서울특별시 -1
// 부산광역시 -2
// 대구광역시 -3
// 인천광역시 -4
// 광주광역시 -5
// 대전광역시 -6
// 울산광역시 -7
// 세종특별자치시 -8
// 경기도 -9
// 강원도 -10
// 충청북도 -11
// 충청남도 -12
// 전라북도 -13
// 전라남도 -14
// 경상북도 -15
// 경상남도 -16
// 제주특별자치도 17
