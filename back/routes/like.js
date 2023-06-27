const express = require("express");
const router = express.Router();
const logger = require("../lib/logger");
const likeService = require("../service/likeService");
const { isLoggedIn } = require("../lib/middleware");
const tokenUtil = require("../lib/tokenUtil");

// like 등록
router.post("/", async (req, res) => {
  try {
    const params = {
      userid: req.body.userid, // 로그인한 유저의 ID
      postid: req.body.postid, // 찜할 매물의 ID
    };
    console.log("hi");
    logger.info(`(like.reg.params) ${JSON.stringify(params)}`);

    const result = await likeService.reg(params);
    logger.info(`(like.reg.result) ${JSON.stringify(result)}`);

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err.toString());
  }
});

// user별 like 조회
router.get("/:userid", async (req, res) => {
  try {
    const params = {
      userid: req.params.userid, // 로그인한 유저의 ID
    };
    logger.info(`(like.list.params) ${JSON.stringify(params)}`);

    const result = await likeService.list(params);
    logger.info(`(like.list.result) ${JSON.stringify(result)}`);

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

//user별 like 상세조회
router.get("/:userid/:postid", async (req, res) => {
  try {
    const params = {
      userid: req.params.userid, // 로그인한 유저의 ID
      postid: req.params.postid,
    };
    logger.info(`(like.list.params) ${JSON.stringify(params)}`);

    const result = await likeService.listInfo(params);
    logger.info(`(like.list.result) ${JSON.stringify(result)}`);

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// 삭제
router.delete("/:userid", async (req, res) => {
  try {
    const params = {
      userid: req.body.userid, // 로그인한 유저의 ID
      postid: req.body.postid, // 찜 ID
    };

    logger.info(`(like.delete.params) ${JSON.stringify(params)}`);

    const result = await likeService.delete(params);
    logger.info(`(like.delete.result) ${JSON.stringify(result)}`);

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

module.exports = router;
