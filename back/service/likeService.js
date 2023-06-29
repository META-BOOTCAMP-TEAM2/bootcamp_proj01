const logger = require("../lib/logger");
const likeDao = require("../dao/likeDao");

const service = {
  // like 등록
  async like(params) {
    let inserted = null;

    try {
      inserted = await likeDao.like(params);
      logger.debug(`(likeService.like) ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`(likeService.like) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err.toString());
      });
    }

    // 결과값 리턴
    return new Promise((resolve) => {
      resolve(inserted);
    });
  },

  // user별 like 조회
  async likeList(params) {
    let result = null;

    try {
      result = await likeDao.likeList(params);
      logger.debug(`(likeService.likeList) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(likeService.likeList) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },

  // user가 찜한 매물 목록 하트를 표시하기위함.
  async selectedHeart(params) {
    let result = null;

    try {
      result = await likeDao.selectedHeart(params);
      logger.debug(`(likeService.selectedHeart) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(likeService.selectedHeart) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },

  // 삭제
  async delete(params) {
    let result = null;

    try {
      result = await likeDao.delete(params);
      logger.debug(`(likeService.delete) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(likeService.delete) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err.toString());
      });
    }

    // 결과값 리턴
    return new Promise((resolve) => {
      resolve(result);
    });
  },
};

module.exports = service;
