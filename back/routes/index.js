/*eslint-disable*/
const express = require("express");
const logger = require("../lib/logger");
const router = express.Router();
const userRouter = require("./user");
const authRouter = require("./auth");
const uploadRouter = require("./upload");

router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/upload", uploadRouter);

module.exports = router;
