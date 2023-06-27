const logger = require("../lib/logger");
const likeDao = require("../dao/likeDao");

const service = {
  // comment 입력
  async reg(params) {
    let inserted = null;

    try {
      inserted = await likeDao.insert(params);
      logger.debug(`(likeService.reg) ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`(likeService.reg) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    // 결과값 리턴
    return new Promise((resolve) => {
      resolve(inserted);
    });
  },
  // selectList
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
  // selectInfo
  async info(params) {
    let result = null;

    try {
      result = await likeDao.selectInfo(params);
      logger.debug(`(likeService.info) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(likeService.info) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },
  // update
  async edit(params) {
    let result = null;

    try {
      result = await likeDao.update(params);
      logger.debug(`(likeService.edit) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(likeService.edit) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },
  // delelte
  async delete(params) {
    let result = null;

    try {
      result = await likeDao.delete(params);
      logger.debug(`(likeService.delete) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(likeService.delete) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },
};

module.exports = service;
