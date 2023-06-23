/*eslint-disable*/
const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        userid: {
          type: Sequelize.STRING(255),
          unique: true,
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING(500),
          allowNull: true,
        },
        username: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        role: {
          type: Sequelize.STRING(20),
          allowNull: true,
        },
        email: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        phone: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        provider: {
          type: Sequelize.ENUM("local", "kakao", "google"),
          allowNull: false,
          defaultValue: "local",
        },
        snsId: {
          type: Sequelize.STRING(30),
          allowNull: true,
        },
        updatedPwDate: {
          type: Sequelize.DATE,
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
    db.User.hasMany(db.Board, {
      foreignKey: { name: "userId", onDelete: "SET NULL", as: "Boards" },
    });
    // db.User.hasMany(db.Post, {
    //   foreignKey: { name: "userId", onDelete: "SET NULL", as: "Posts" },
    // });
  }

  static includeAttributes = ["id", "username", "role", "email", "phone"];
};

// static associate(db) {
//   db.User.belongsTo(db.Department, { foreignKey: { name: 'departmentId', onDelete: 'SET NULL', as: 'Department' } });
//   db.User.hasMany(db.Board, { foreignKey: { name: 'userId', onDelete: 'SET NULL', as: 'Boards' } });
//   db.User.hasMany(db.Post, { foreignKey: { name: 'userId', onDelete: 'SET NULL', as: 'Posts' } });
//   db.User.hasMany(db.Comment, { foreignKey: { name: 'userId', onDelete: 'SET NULL', as: 'Comments' } });
// }

// static includeAttributes = ['id', 'name', 'role', 'email', 'phone'];
// };

// 아이디	userid	varchar(255)	unique, not null
// 비밀번호	password	varchar(500)	not null
// 이름	username	varchar(100)
// 사용자권한	role	varchar(20)
// 이메일	email	varchar(255)
// 전화번호	phone	varchar(255)
// 비밀번호 변경일	updated_pw_date	datetime
// 등록일시	created_at	datetime
// 수정일시	updated_at	datetime
// 삭제일시 deleted_at	datetime
