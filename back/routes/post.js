/*eslint-disable*/
const express = require("express");
const tokenUtil = require("../lib/tokenUtil");
const router = express.Router();
const logger = require("../lib/logger");
const postService = require("../service/postService");
const { isLoggedIn } = require("../lib/middleware");
// const { isLoggedIn } = require("../lib/middleware");

// 등록
router.post("/", async (req, res) => {
  try {
    const params = {
      additionalInfo: req.body.additionalInfo, //상세정보
      address: req.body.address, //매물주소
      deposit: req.body.deposit, //전세가
      monthlyRent: req.body.monthlyRent, //월세가
      price: req.body.price, //매매
      propertyType: req.body.propertyType, //계약방식
      structure: req.body.structure, //방구조

      filename1: req.body.filename1,
      filename2: req.body.filename2,
      filename3: req.body.filename3,
      originalName1: req.body.originalName1,
      originalName2: req.body.originalName2,
      originalName3: req.body.originalName3,

      path1: req.body.path1,
      path2: req.body.path2,
      path3: req.body.path3,

      userId: Number(1), //유저아이디
      userid: req.body.userid, //유저아이디
    };
    logger.info(`(post.reg.params) ${JSON.stringify(params)}`);

    // 비즈니스 로직 호출
    const result = await postService.reg(params);
    logger.info(`(post.reg.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err.toString());
  }
});

// 리스트 조회
router.get("/:id", async (req, res) => {
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
    res.status(500).json({ err: err.toString() });
  }
});

// // 상세정보 조회
// router.get("/:id", async (req, res) => {
//   try {
//     const params = {
//       id: req.params.id,
//     };
//     logger.info(`(post.info.params) ${JSON.stringify(params)}`);

//     const result = await postService.info(params);
//     logger.info(`(post.info.result) ${JSON.stringify(result)}`);

//     // 최종 응답
//     res.status(200).json(result);
//   } catch (err) {
//     res.status(500).json({ err: err.toString() });
//   }
// });

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
    res.status(500).json({ err: err.toString() });
  }
});

module.exports = router;
