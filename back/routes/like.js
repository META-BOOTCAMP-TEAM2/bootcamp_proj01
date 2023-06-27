const express = require("express");

const router = express.Router();
const logger = require("../lib/logger");
const likeService = require("../service/likeService");
const { isLoggedIn } = require("../lib/middleware");

// 등록
router.post("/", isLoggedIn, async (req, res) => {
  const loginUserId = res.get("userId") || null;
  try {
    const params = {
      postId: req.body.postId,
      content: req.body.content,
      userId: req.body.userId || loginUserId,
    };
    logger.info(`(like.reg.params) ${JSON.stringify(params)}`);

    // 입력값 null 체크
    if (!params.postId) {
      const err = new Error("Not allowed null (postId)");
      logger.error(err.toString());

      res.status(500).json({ err: err.toString() });
    }

    // 비즈니스 로직 호출
    const result = await likeService.reg(params);
    logger.info(`(like.reg.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// 리스트 조회
router.get("/", isLoggedIn, async (req, res) => {
  try {
    const params = {
      postIds: req.query.postIds ? req.query.postIds.split(",") : null,
      userIds: req.query.userIds ? req.query.userIds.split(",") : null,
    };
    logger.info(`(like.list.params) ${JSON.stringify(params)}`);

    const result = await likeService.list(params);
    logger.info(`(like.list.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// 상세정보 조회
router.get("/:id", isLoggedIn, async (req, res) => {
  try {
    const params = {
      id: req.params.id,
    };
    logger.info(`(like.info.params) ${JSON.stringify(params)}`);

    const result = await likeService.info(params);
    logger.info(`(like.info.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// 수정
router.put("/:id", isLoggedIn, async (req, res) => {
  try {
    const params = {
      id: req.params.id,
      content: req.body.content,
    };
    logger.info(`(like.update.params) ${JSON.stringify(params)}`);

    const result = await likeService.edit(params);
    logger.info(`(like.update.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// 삭제
router.delete("/:id", isLoggedIn, async (req, res) => {
  try {
    const params = {
      id: req.params.id,
    };
    logger.info(`(like.delete.params) ${JSON.stringify(params)}`);

    const result = await likeService.delete(params);
    logger.info(`(like.delete.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

module.exports = router;
