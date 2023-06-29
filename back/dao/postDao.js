/*eslint-disable*/

const { Op } = require("sequelize");
const { Post, User, Address, Like } = require("../models/index");

const dao = {
  // 매물등록
  upload(params) {
    return new Promise((resolve, reject) => {
      Post.create(params)
        .then((inserted) => {
          resolve(inserted);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  // 특정 사용자에 대한 전체 매물검색
  selectUserRoomList(params) {
    // where 검색 조건
    const setQuery = {};
    setQuery.where = {
      ...setQuery.where,
      userid: params.id, // '='검색
    };

    // order by 정렬 조건
    setQuery.order = [["userid", "DESC"]];

    return new Promise((resolve, reject) => {
      Post.findAndCountAll({
        ...setQuery,
        attributes: { exclude: ["viewCount"] }, // password 필드 제외
      })
        .then((selectedList) => {
          resolve(selectedList);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  // 게시물 조회
  selectInfo() {
    return new Promise((resolve, reject) => {
      Post.findAll({
        attributes: { exclude: ["viewCount"] },
      })
        .then((selectedOne) => {
          resolve(selectedOne);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  // 리스트 조회
  // selectList(params) {
  //   // where 검색 조건
  //   const setQuery = {};
  //   if (params.title) {
  //     setQuery.where = {
  //       ...setQuery.where,
  //       title: { [Op.like]: `%${params.title}%` }, // like검색
  //     };
  //   }
  //   if (params.content) {
  //     setQuery.where = {
  //       ...setQuery.where,
  //       content: { [Op.like]: `%${params.content}%` }, // like검색
  //     };
  //   }
  //   if (params.userIds) {
  //     setQuery.where = {
  //       ...setQuery.where,
  //       userId: params.userIds, // in 검색
  //     };
  //   }
  //   // order by 정렬 조건
  //   setQuery.order = [["id", "DESC"]];

  //   return new Promise((resolve, reject) => {
  //     Post.findAndCountAll({
  //       ...setQuery,
  //       include: [
  //         {
  //           model: User,
  //           as: "User",
  //           attributes: User.includeAttributes,
  //         },
  //       ],
  //     })
  //       .then((selectedList) => {
  //         resolve(selectedList);
  //       })
  //       .catch((err) => {
  //         reject(err);
  //       });
  //   });
  // },
  // 상세정보 조회
  // selectInfo(params) {
  //   return new Promise((resolve, reject) => {
  //     Post.findByPk(params.id, {
  //       include: [
  //         {
  //           model: Board,
  //           as: "Board",
  //           attributes: Board.includeAttributes,
  //         },
  //         {
  //           model: Comment,
  //           as: "Comments",
  //           attributes: Comment.includeAttributes,
  //           include: [
  //             {
  //               model: User,
  //               as: "User",
  //               attributes: User.includeAttributes,
  //             },
  //           ],
  //         },
  //         {
  //           model: User,
  //           as: "User",
  //           attributes: User.includeAttributes,
  //           include: [
  //             {
  //               model: Department,
  //               as: "Department",
  //               attributes: Department.includeAttributes,
  //             },
  //           ],
  //         },
  //       ],
  //     })
  //       .then((selectedInfo) => {
  //         resolve(selectedInfo);
  //       })
  //       .catch((err) => {
  //         reject(err);
  //       });
  //   });
  // },
  // 수정
  update(params) {
    return new Promise((resolve, reject) => {
      Post.update(params, {
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
  // 게시물 삭제
  delete(params) {
    return new Promise((resolve, reject) => {
      Post.destroy({
        where: { id: params.id },
      })
        .then(() => {
          resolve("delete success");
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};

module.exports = dao;
