const express = require("express");

const router = express.Router();
const logger = require("../lib/logger");
const likeService = require("../service/likeService");
const { isLoggedIn } = require("../lib/middleware");

// 찜하기 like 등록
router.post("/", isLoggedIn, async (req, res) => {
  try {
    const params = {
      userId: req.body.userid, // 로그인한 유저의 ID
      postId: req.body.postid, // 찜할 매물의 ID
    };
    logger.info(`(like.reg.params) ${JSON.stringify(params)}`);

    const result = await likeService.like(params);
    logger.info(`(like.reg.result) ${JSON.stringify(result)}`);

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err.toString());
  }
});

// user가 선택한 like 전체조회
router.get("/:userid", isLoggedIn, async (req, res) => {
  try {
    const params = {
      userId: req.params.userid, // 로그인한 유저의 ID
    };
    logger.info(`(like.list.params) ${JSON.stringify(params)}`);

    const result = await likeService.likeList(params);
    logger.info(`(like.list.result) ${JSON.stringify(result)}`);

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err.toString());
  }
});

// 특정 매물을 사용자가 찜했는지 조회 (하트표시)
router.get("/:userid/:postid", async (req, res) => {
  try {
    const params = {
      userId: req.params.userid, // 로그인한 유저의 ID
      postId: req.params.postid,
    };
    logger.info(`(like.selectedHeart.params) ${JSON.stringify(params)}`);

    const result = await likeService.selectedHeart(params);
    logger.info(`(like.selectedHeart.result) ${JSON.stringify(result)}`);

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err.toString());
  }
});

// 찜 매물 삭제
router.delete("/:userid", async (req, res) => {
  try {
    const params = {
      userId: req.body.userid, // 로그인한 유저의 ID
      postId: req.body.postid, // 찜 ID
    };

    logger.info(`(like.delete.params) ${JSON.stringify(params)}`);

    const result = await likeService.delete(params);
    logger.info(`(like.delete.result) ${JSON.stringify(result)}`);

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err.toString());
  }
});

module.exports = router;
