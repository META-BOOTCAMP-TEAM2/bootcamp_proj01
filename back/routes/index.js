/*eslint-disable*/
const express = require("express");
const logger = require("../lib/logger");
const router = express.Router();
const userRouter = require("./user");
const authRouter = require("./auth");
const postRouter = require("./post");
const uploadRouter = require("./upload");
<<<<<<< HEAD
=======
const addressRouter = require("./address");
>>>>>>> d5bf5698864de21fc1ac36410994f668ffb7f0be
const likeRouter = require("./like");

router.use("/users", userRouter);
router.use("/auth", authRouter);
<<<<<<< HEAD
router.use("/upload", uploadRouter);
router.use("/post", postRouter);
router.use("/like", likeRouter);
=======
router.use("/post", uploadRouter);
// router.use("/post", postRouter);
router.use("/address", addressRouter);
router.use("/likes", likeRouter);
>>>>>>> d5bf5698864de21fc1ac36410994f668ffb7f0be

module.exports = router;
