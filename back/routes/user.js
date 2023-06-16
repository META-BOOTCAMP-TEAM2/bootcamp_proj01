/*eslint-disable*/
const express = require("express");
const router = express.Router();
const logger = require("../lib/logger");
const userService = require("../service/userService");

// 등록
router.post("/", async (req, res) => {
  try {
    const params = {
      name: req.body.name,
      userid: req.body.userid,
      password: req.body.password,
      role: req.body.role,
      email: req.body.email,
      phone: req.body.phone,
    };
    logger.info(`(user.reg.params) ${JSON.stringify(params)}`);

    // 입력값 null 체크
    if (!params.name || !params.userid || !params.password) {
      const err = new Error("Not allowed null (name, userid, password)");
      logger.error(err.toString());

      res.status(500).json({ err: err.toString() });
    }

    // 비즈니스 로직 호출
    const result = await userService.reg(params);
    logger.info(`(user.reg.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// 리스트 조회
router.get("/", async (req, res) => {
  try {
    const params = {
      name: req.query.name,
      userid: req.query.userid,
    };
    logger.info(`(user.list.params) ${JSON.stringify(params)}`);

    const result = await userService.list(params);
    logger.info(`(user.list.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});
// 상세조회, 수정, 삭제 (실습으로 구현할 것)

// 상세정보 조회
// router.get("/:id", isLoggedIn, async (req, res) => {
//  "/:id"는 경로 매개변수. 동적으로 값을 캡처함.  예를 들어 "/users/123"과 같은 요청에서 123은 id 매개변수에 할당.
router.get("/:id", async (req, res) => {
  try {
    const params = {
      id: req.params.id,
    };
    logger.info(`(user.info.params) ${JSON.stringify(params)}`);

    // 비즈니스 로직 호출
    const result = await userService.info(params);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
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
    logger.info(`(department.edit.params) ${JSON.stringify(params)}`);

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
    logger.info(`(department.delete.params) ${JSON.stringify(params)}`);

    // 비즈니스 로직 호출
    const result = await userService.delete(params);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

module.exports = router;
