const logger = require("../lib/logger");
const addressDao = require("../dao/addressDao");

const service = {
  // department 입력
  async reg(params) {
    let inserted = null;

    try {
      inserted = await addressDao.insert(params);
      logger.debug(`(addressService.reg) ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`(addressService.reg) ${err.toString()}`);
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
      result = await addressDao.selectList(params);
      logger.debug(`(addressService.list) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(addressService.list) ${err.toString()}`);
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
      result = await addressDao.selectInfo(params);
      logger.debug(`(addressService.info) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(addressService.info) ${err.toString()}`);
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
      result = await addressDao.update(params);
      logger.debug(`(addressService.edit) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(addressService.edit) ${err.toString()}`);
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
      result = await addressDao.delete(params);
      logger.debug(`(addressService.delete) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(addressService.delete) ${err.toString()}`);
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
