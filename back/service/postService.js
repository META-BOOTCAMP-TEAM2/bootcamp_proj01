const logger = require("../lib/logger");
const postDao = require("../dao/postDao");

const service = {
  // 파일업로드
  async reg(params) {
    let inserted = null;
    try {
      inserted = await postDao.insert(params);
      logger.debug(`(postService.reg) ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`(postService.reg) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err.toString());
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
      result = await postDao.selectList(params);
      logger.debug(`(postService.list) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(postService.list) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },
  // selectInfo
  async info() {
    let result = null;
    try {
      result = await postDao.selectInfo();
      logger.debug(`(postService.list) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(postService.list) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        console.log(err);
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },
  // // selectInfo
  // async info(params) {
  //   let result = null;

  //   try {
  //     // 1. 게시글 상세조회
  //     result = await postDao.selectInfo(params);
  //     logger.debug(`(postService.info) ${JSON.stringify(result)}`);

  //     // 조회수 업데이트
  //     if (result) {
  //       postDao.update({ id: params.id, viewCount: result.viewCount + 1 });

  //       result.viewCount += 1;
  //     }
  //     // 2. 추가로직
  //   } catch (err) {
  //     logger.error(`(postService.info) ${err.toString()}`);
  //     return new Promise((resolve, reject) => {
  //       reject(err);
  //     });
  //   }

  //   return new Promise((resolve) => {
  //     resolve(result);
  //   });
  // },
  // // update
  // async edit(params) {
  //   let result = null;

  //   try {
  //     result = await postDao.update(params);
  //     logger.debug(`(postService.edit) ${JSON.stringify(result)}`);
  //   } catch (err) {
  //     logger.error(`(postService.edit) ${err.toString()}`);
  //     return new Promise((resolve, reject) => {
  //       reject(err);
  //     });
  //   }

  //   return new Promise((resolve) => {
  //     resolve(result);
  //   });
  // },
  // // delelte
  // async delete(params) {
  //   let result = null;

  //   try {
  //     result = await postDao.delete(params);
  //     logger.debug(`(postService.delete) ${JSON.stringify(result)}`);
  //   } catch (err) {
  //     logger.error(`(postService.delete) ${err.toString()}`);
  //     return new Promise((resolve, reject) => {
  //       reject(err);
  //     });
  //   }

  //   return new Promise((resolve) => {
  //     resolve(result);
  //   });
  // },
};

module.exports = service;
