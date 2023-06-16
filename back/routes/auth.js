/*eslint-disable*/
const express = require("express");
const passport = require("passport");
const router = express.Router();
const logger = require("../lib/logger");
const tokenUtil = require("../lib/tokenUtil");
const userService = require("../service/userService");
const { join, login, logout } = require("../lib/auth");
// user 토큰 발행
router.post("/token", async (req, res) => {
  try {
    const params = {
      userid: req.body.userid,
      password: req.body.password,
    };
    logger.info(`(auth.token.params) ${JSON.stringify(params)}`);

    // 입력값 null 체크
    if (!params.userid || !params.password) {
      const err = new Error("Not allowed null (userid, password)");
      logger.error(err.toString());

      res.status(500).json({ err: err.toString() });
    }

    // 비즈니스 로직 호출
    const result = await userService.login(params);
    logger.info(`(auth.token.result) ${JSON.stringify(result)}`);

    // 토큰 생성
    const token = tokenUtil.makeToken(result);
    res.set("token", token); // header 세팅

    // 최종 응답
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

//구글

// @desc    Auth with Google
// @route   GET /auth/google
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

// @desc    Google auth callback
// @route   GET /auth/google/callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    logger.debug("login success");
    res.redirect("/");
  }
);

// @desc    Logout user
// @route   /auth/logout
router.get("/logout", (req, res, next) => {
  req.logout((error) => {
    if (error) {
      return next(error);
    }
    res.redirect("/");
  });
});

//카카오
// GET /auth/kakao
router.get("/kakao", passport.authenticate("kakao"));

// GET /auth/kakao/callback
router.get(
  "/kakao/callback",
  passport.authenticate("kakao", {
    failureRedirect: "/?error=카카오로그인 실패",
  }),
  (req, res) => {
    res.redirect("/?message=성공했습니다."); // 성공 시에는 /로 이동
  }
);

// router.get("/login", function (req, res, next) {
//   res.render("index", { title: "로그인 폼 양식입니다." });
// });
// router.get("/join", function (req, res, next) {
//   res.render("register", { title: "회원가입 폼 양식입니다." });
// });

//로컬 회원가입 , 로그인 , 로그아웃
// POST /auth/join
// router.post("/join", isNotLoggedIn, join);
router.post("/join", join);

// POST /auth/login
// router.post("/login", isNotLoggedIn, login);
router.post("/login", login);

// GET /auth/logout
// router.get("/logout", isLoggedIn, logout);
router.get("/logout", logout);

module.exports = router;
