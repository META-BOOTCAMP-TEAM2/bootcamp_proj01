/*eslint-disable*/
const logger = require("../lib/logger");
const userDao = require("../dao/userDao");
const hashUtil = require("../lib/hashUtil");
const service = {
  // service_reg [유저 등록]
  async reg(params) {
    let inserted = null;
    // 1. 비밀번호 암호화
    let hashPassword = null;
    try {
      hashPassword = await hashUtil.makePasswordHash(params.password);
      logger.debug(
        `(userService.makePassword) ${JSON.stringify(params.password)}`
      );
    } catch (err) {
      logger.error(`(userService.makePassword) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err.toString());
      });
    }

    // 2. 사용자 등록 처리
    const newParams = {
      ...params,
      password: hashPassword,
    };

    try {
      inserted = await userDao.insert(newParams);
      logger.debug(`(userService.reg) ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`(userService.reg) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err.toString());
      });
    }

    // 결과값 리턴
    return new Promise((resolve) => {
      resolve(inserted);
    });
  },
  // service_info [회원가입 - 특정 유저 조회]
  async regInfo(params) {
    let result = null;
    try {
      result = await userDao.SearchUserForReg(params);
    } catch (err) {
      return new Promise((resolve, reject) => {
        reject(err.toString());
      });
    }

    // 결과값 리턴
    return new Promise((resolve) => {
      resolve(result);
    });
  },
  // service_reg [유저 로그인]
  async login(params) {
    // 1. 사용자 조회
    let user = null;
    try {
      user = await userDao.userLogin(params);
      logger.debug(`(userService.login) ${JSON.stringify(user)}`);

      // 해당 사용자가 없는 경우 튕겨냄
      if (!user) {
        const err = new Error("아이디 혹은 비밀번호를 확인해주세요.(code:01)");
        logger.error(err.toString());

        return new Promise((resolve, reject) => {
          reject(err.toString());
        });
      }
    } catch (err) {
      logger.error(`(userService.login) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err.message);
      });
    }

    // 2. 비밀번호 비교
    try {
      const checkPassword = await hashUtil.checkPasswordHash(
        params.password,
        user.password
      );
      logger.debug(`(userService.checkPassword) ${checkPassword}`);

      // 비밀번호 틀린 경우 튕겨냄
      if (!checkPassword) {
        const err = new Error("아이디 혹은 비밀번호를 확인해주세요.(code:02)");
        logger.error(err.toString());
        return new Promise((resolve, reject) => {
          reject(err.toString());
        });
      }
    } catch (err) {
      logger.error(`(userService.checkPassword) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err.toString());
      });
    }

    return new Promise((resolve) => {
      resolve(user);
    });
  },
  //service_info [마이페이지 유저 조회]
  async userInfo(params) {
    let result = null;
    try {
      result = await userDao.selectUserForMypage(params);
    } catch (err) {
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },
  // service_list [전체 유저 조회]
  async list(params) {
    let result = null;
    try {
      result = await userDao.selectList(params);
    } catch (err) {
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },

  // service_update [유저 정보 수정]
  async edit(params) {
    let result = null;

    try {
      result = await userDao.update(params);
      logger.debug(`(userService.edit) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(userService.edit) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err.toString());
      });
    }

    // 결과값 리턴
    return new Promise((resolve) => {
      resolve(result);
    });
  },
  // service_delelte [유저 삭제]
  async delete(params) {
    let result = null;

    try {
      result = await userDao.delete(params);
      logger.debug(`(userService.delete) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(userService.delete) ${err.toString()}`);
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
