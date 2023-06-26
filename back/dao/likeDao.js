/*eslint-disable*/

const { Op } = require("sequelize");
const { Post, User, Like } = require("../models/index");

const dao = {
  // like 등록
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

  // user별 like 조회
  selectList(params) {
    return new Promise((resolve, reject) => {
      Like.findAll({
        where: { userid: params.userid },
        attributes: ["postid"],
        raw: true,
      })
        .then((likes) => {
          const postIds = likes.map((like) => like.postid);
          return Post.findAll({
            where: { id: postIds },
          });
        })
        .then((posts) => {
          resolve(posts);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  // user별 like 상세조회
  selectInfo(params) {
    return new Promise((resolve, reject) => {
      Like.findAll({
        where: { userid: params.userid, postid: params.postid },
      })
        .then((selected) => {
          resolve(selected);
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
        where: { userid: params.userid, postid: params.postid },
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
