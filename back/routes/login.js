/*eslint-disable*/

const express = require("express");
const router = express.Router();
const logger = require("../lib/logger");

router.get("/", (req, res) => {
  res.send("login");
  logger.info("로그인 패스 라우팅 성공");
});

module.exports = router;
