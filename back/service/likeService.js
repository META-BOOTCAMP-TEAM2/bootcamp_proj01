const logger = require("../lib/logger");
const likeDao = require("../dao/likeDao");

const service = {
  // like 등록
  async reg(params) {
    let inserted = null;

    try {
      inserted = await likeDao.insert(params);
      logger.debug(`(likeService.reg) ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`(likeService.reg) ${err.toString()}`);
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
  async list(params) {
    let result = null;

    try {
      result = await likeDao.selectList(params);
      logger.debug(`(likeService.list) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(likeService.list) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },

  // user별 like 상세조회
  async listInfo(params) {
    let result = null;

    try {
      result = await likeDao.selectInfo(params);
      logger.debug(`(likeService.list) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(likeService.list) ${err.toString()}`);
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
      console.log(`sadsadasdsadsasdasasaasdsadsasa${params}`);
      console.log(`sadsadasdsadsasdasasaasdsadsasa${Object.keys(params)}`);
      console.log(`sadsadasdsadsasdasasaasdsadsasa    ${params.userId}`);
      console.log(`sadsadasdsadsasdasasaasdsadsasa    ${params.postId}`);

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
