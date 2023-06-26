/*eslint-disable*/
const express = require("express");
const logger = require("../lib/logger");
const router = express.Router();
const userRouter = require("./user");
const authRouter = require("./auth");
const postRouter = require("./post");
const uploadRouter = require("./upload");
const likeRouter = require("./like");

router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/upload", uploadRouter);
router.use("/post", postRouter);
router.use("/like", likeRouter);

module.exports = router;
