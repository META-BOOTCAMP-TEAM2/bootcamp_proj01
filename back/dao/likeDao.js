const { Op } = require("sequelize");
const { Like, User, Post } = require("../models/index");

const dao = {
  // 등록
  insert(params) {
    return new Promise((resolve, reject) => {
      Like.create(params)
        .then((inserted) => {
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
    if (params.postIds) {
      setQuery.where = {
        ...setQuery.where,
        postId: params.postIds, // 'in' 검색
      };
    }
    if (params.userIds) {
      setQuery.where = {
        ...setQuery.where,
        userId: params.userIds, // 'in' 검색
      };
    }
    // order by 정렬 조건
    setQuery.order = [["id", "DESC"]];

    return new Promise((resolve, reject) => {
      Like.findAndCountAll({
        ...setQuery,
        include: [
          {
            model: User,
            attributes: User.includeAttributes,
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
  // 상세정보 조회
  selectInfo(params) {
    return new Promise((resolve, reject) => {
      Like.findByPk(params.id, {
        include: [
          {
            model: Post,
            as: "Post",
            attributes: Post.includeAttributes,
            include: [
              {
                model: User,
                as: "User",
                attributes: User.includeAttributes,
              },
            ],
          },
          {
            model: User,
            as: "User",
            attributes: User.includeAttributes,
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
  // 수정
  update(params) {
    return new Promise((resolve, reject) => {
      Like.update(params, {
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
  // 삭제
  delete(params) {
    return new Promise((resolve, reject) => {
      Like.destroy({
        where: { id: params.id },
      })
        .then((deleted) => {
          resolve({ deletedCount: deleted });
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};

module.exports = dao;
