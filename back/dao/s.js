const { Op } = require("sequelize");
const { User, Department } = require("../models/index");

const dao = {
  // 등록
  insert(params) {
    return new Promise((resolve, reject) => {
      User.create(params)
        .then((inserted) => {
          // password는 제외하고 리턴함
          const insertedResult = { ...inserted };
          delete insertedResult.dataValues.password;
          resolve(inserted);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  // 리스트 조회
  selectList(params) {
    // where 검색 조건
    const setQuery = {};
    if (params.name) {
      setQuery.where = {
        ...setQuery.where,
        name: { [Op.like]: `%${params.name}%` }, // like검색
      };
    }
    if (params.userid) {
      setQuery.where = {
        ...setQuery.where,
        userid: params.userid, // '='검색
      };
    }

    // order by 정렬 조건
    setQuery.order = [["id", "DESC"]];

    return new Promise((resolve, reject) => {
      User.findAndCountAll({
        ...setQuery,
        attributes: { exclude: ["password"] }, // password 필드 제외
        include: [
          {
            model: Department,
            as: "Department",
            attributes: ["name", "code"],
          },
        ],
      })
        .then((selectedList) => {
          resolve(selectedList);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  selectInfo(params) {
    return new Promise((resolve, reject) => {
      // User.findAll
      User.findByPk(params.id, {
        include: [
          {
            model: Department,
            as: "Department",
          },
        ],
      })
        .then((selectedInfo) => {
          resolve(selectedInfo);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  // 로그인용 아이디로 사용자 검색
  selectUser(params) {
    return new Promise((resolve, reject) => {
      User.findOne({
        attributes: ["id", "userid", "password", "name", "role"],
        where: {
          userid: params.userid,
        },
      })
        .then((selectedOne) => {
          resolve(selectedOne);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  update(params) {
    return new Promise((resolve, reject) => {
      User.update(params, {
        where: { id: params.id },
      })
        .then(([updated]) => {
          resolve({ updatedCount: updated });
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  delete(params) {
    return new Promise((resolve, reject) => {
      // User.findAll
      User.destroy({
        where: { id: params.id },
      })
        .then(([deleted]) => {
          resolve({ deletedCount: deleted });
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};

module.exports = dao;
