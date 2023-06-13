/*eslint-disable*/
const express = require("express");
const logger = require("../lib/logger");
const userRouter = require("./user");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("루트 패스에서 정상 동작중");
});
router.use("/users", userRouter);

module.exports = router;
