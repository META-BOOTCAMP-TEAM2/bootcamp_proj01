/*eslint-disable*/
const express = require("express");
const router = express.Router();
const logger = require("../lib/logger");
const userService = require("../service/userService");
const { isLoggedIn } = require("../lib/middleware");

//[회원가입 - 중복사용자 조회]
router.get("/search/:userid", async (req, res) => {
  try {
    const params = {
      userid: req.params.userid,
    };
    const result = await userService.regInfo(params);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

// 유저 수정
router.put("/:id", async (req, res) => {
  try {
    const params = {
      id: req.params.id,
      name: req.body.name,
      role: req.body.role,
      email: req.body.email,
      phone: req.body.phone,
    };
    logger.info(`(user.edit.params) ${JSON.stringify(params)}`);

    // 비즈니스 로직 호출
    const result = await userService.edit(params);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// 유저 삭제
router.delete("/:id", async (req, res) => {
  try {
    const params = {
      id: req.params.id,
    };
    logger.info(`(user.delete.params) ${JSON.stringify(params)}`);

    // 비즈니스 로직 호출
    const result = await userService.delete(params);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

module.exports = router;

//// 리스트 조회
// router.get("/", async (req, res) => {
//   try {
//     const params = {
//       name: req.query.name,
//       userid: req.query.userid,
//     };
//     logger.info(`(user.list.params) ${JSON.stringify(params)}`);

//     const result = await userService.list(params);
//     logger.info(`(user.list.result) ${JSON.stringify(result)}`);

//     // 최종 응답
//     res.status(200).json(result);
//   } catch (err) {
//     res.status(500).json({ err: err.toString() });
//   }
// });

// 상세정보 조회

// // 상세정보 조회
// router.get("/:id", isLoggedIn, async (req, res) => {
//   try {
//     console.log(req.params);
//     const params = {
//       userid: req.params.id,
//     };
//     logger.info(`(user.info.params) ${JSON.stringify(params)}`);

//     // 비즈니스 로직 호출
//     const result = await userService.info(params);

//     // 최종 응답
//     logger.info(`result값:  ${result}`);

//     res.status(200).json(result);
//   } catch (err) {
//     res.status(500).json(err.toString());
//   }
// });
