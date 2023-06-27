const logger = require("../lib/logger");
const likeDao = require("../dao/likeDao");

const service = {
<<<<<<< HEAD
  // like 등록
=======
  // comment 입력
>>>>>>> d5bf5698864de21fc1ac36410994f668ffb7f0be
  async reg(params) {
    let inserted = null;

    try {
      inserted = await likeDao.insert(params);
      logger.debug(`(likeService.reg) ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`(likeService.reg) ${err.toString()}`);
      return new Promise((resolve, reject) => {
<<<<<<< HEAD
        reject(err.toString());
=======
        reject(err);
>>>>>>> d5bf5698864de21fc1ac36410994f668ffb7f0be
      });
    }

    // 결과값 리턴
    return new Promise((resolve) => {
      resolve(inserted);
    });
  },
<<<<<<< HEAD

  // user별 like 조회
=======
  // selectList
>>>>>>> d5bf5698864de21fc1ac36410994f668ffb7f0be
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
<<<<<<< HEAD

  // user별 like 상세조회
  async listInfo(params) {
=======
  // selectInfo
  async info(params) {
>>>>>>> d5bf5698864de21fc1ac36410994f668ffb7f0be
    let result = null;

    try {
      result = await likeDao.selectInfo(params);
<<<<<<< HEAD
      logger.debug(`(likeService.list) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(likeService.list) ${err.toString()}`);
=======
      logger.debug(`(likeService.info) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(likeService.info) ${err.toString()}`);
>>>>>>> d5bf5698864de21fc1ac36410994f668ffb7f0be
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },
<<<<<<< HEAD

  // 삭제
=======
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
>>>>>>> d5bf5698864de21fc1ac36410994f668ffb7f0be
  async delete(params) {
    let result = null;

    try {
      result = await likeDao.delete(params);
      logger.debug(`(likeService.delete) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(likeService.delete) ${err.toString()}`);
      return new Promise((resolve, reject) => {
<<<<<<< HEAD
        reject(err.toString());
      });
    }

    // 결과값 리턴
=======
        reject(err);
      });
    }

>>>>>>> d5bf5698864de21fc1ac36410994f668ffb7f0be
    return new Promise((resolve) => {
      resolve(result);
    });
  },
};

module.exports = service;
