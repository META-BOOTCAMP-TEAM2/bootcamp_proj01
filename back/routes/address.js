const express = require("express");

const router = express.Router();
const logger = require("../lib/logger");
const addressService = require("../service/addressService");
const { isLoggedIn } = require("../lib/middleware");

// 주소등록
router.post("/", async (req, res) => {
  try {
    const params = {
      address: req.body.address,
      active: req.body.active || true,
    };
    logger.info(`(board.reg.params) ${JSON.stringify(params)}`);

    // 입력값 null 체크
    if (!params.address) {
      const err = new Error("Not allowed null (address)");
      logger.error(err.toString());

      res.status(500).json(err.toString());
    }

    // 비즈니스 로직 호출
    const result = await addressService.reg(params);
    logger.info(`(board.reg.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err.toString());
  }
});

// 리스트 조회
router.get("/", isLoggedIn, async (req, res) => {
  try {
    const params = {
      title: req.query.title,
      active: req.query.active,
      userIds: req.query.userIds ? req.query.userIds.split(",") : null,
    };
    logger.info(`(board.list.params) ${JSON.stringify(params)}`);

    const result = await addressService.list(params);
    logger.info(`(board.list.result) ${JSON.stringify(result)}`);

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
    logger.info(`(board.info.params) ${JSON.stringify(params)}`);

    const result = await addressService.info(params);
    logger.info(`(board.info.result) ${JSON.stringify(result)}`);

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
      title: req.body.title,
      active: req.body.active,
    };
    logger.info(`(board.update.params) ${JSON.stringify(params)}`);

    const result = await addressService.edit(params);
    logger.info(`(board.update.result) ${JSON.stringify(result)}`);

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
    logger.info(`(board.delete.params) ${JSON.stringify(params)}`);

    const result = await addressService.delete(params);
    logger.info(`(board.delete.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

module.exports = router;
