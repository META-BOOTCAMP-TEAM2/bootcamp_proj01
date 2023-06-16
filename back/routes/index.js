/*eslint-disable*/
const express = require("express");
const logger = require("../lib/logger");
const router = express.Router();
const userRouter = require("./user");
const authRouter = require("./auth");
const loginRouter = require("./login");

// router.get("/", (req, res) => {
//   res.send("루트 패스에서 정상 동작중");
// });

router.use("/login", loginRouter);
router.use("/users", userRouter);
router.use("/auth", authRouter);

module.exports = router;
