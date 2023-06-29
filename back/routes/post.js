/*eslint-disable*/
const express = require("express");
const tokenUtil = require("../lib/tokenUtil");
const router = express.Router();
const logger = require("../lib/logger");
const postService = require("../service/postService");
const { isLoggedIn } = require("../lib/middleware");

// 상세정보 조회
router.get("/:id", isLoggedIn, async (req, res) => {
  try {
    const params = {
      userid: req.params.id,
    };
    logger.info(`(post.list.params) ${JSON.stringify(params)}`);

    const result = await postService.list(params);
    logger.info(`(post.list.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err.toString());
  }
});

// 리스트 조회
router.get("/", async (req, res) => {
  try {
    logger.info(`(post.info) ${JSON.stringify()}`);

    const result = await postService.info();
    logger.info(`(post.info.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err.toString());
  }
});

// // 수정
// router.put("/:id", isLoggedIn, async (req, res) => {
//   try {
//     const params = {
//       id: req.params.id,
//       title: req.body.title,
//       content: req.body.content,
//       imagePath: req.body.imagePath,
//       filePath: req.body.filePath,
//     };
//     logger.info(`(post.update.params) ${JSON.stringify(params)}`);

//     const result = await postService.edit(params);
//     logger.info(`(post.update.result) ${JSON.stringify(result)}`);

//     // 최종 응답
//     res.status(200).json(result);
//   } catch (err) {
//     res.status(500).json({ err: err.toString() });
//   }
// });

// 삭제
router.delete("/:id", isLoggedIn, async (req, res) => {
  try {
    const params = {
      id: req.params.id,
    };
    logger.info(`(post.delete.params) ${JSON.stringify(params)}`);

    const result = await postService.delete(params);
    logger.info(`(post.delete.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err.toString());
  }
});

module.exports = router;
