/*eslint-disable*/
const express = require("express");
const passport = require("passport");
const router = express.Router();
const logger = require("../lib/logger");
const tokenUtil = require("../lib/tokenUtil");
const userService = require("../service/userService");
const { join, login, logout } = require("../lib/auth");

// 등록
router.post("/join", async (req, res) => {
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

    // 입력값 null 체크 -> front에서 required 처리하므로 불필요
    if (!params.name || !params.userid || !params.password) {
      const err = new Error("Not allowed null (name, userid, password)");
      logger.error(err.toString());

      res.status(500).json(err.toString());
    }

    // 비즈니스 로직 호출
    const result = await userService.reg(params);
    logger.info(`(user.reg.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err.toString());
  }
});

router.post("/logout", (req, res) => {
  // 사용자의 토큰을 받아옵니다.
  const token = req.headers && req.headers.token;

  // 토큰을 검증하고 무효화합니다.
  try {
    tokenUtil.verifyToken;
  } catch (err) {
    // 토큰 검증 실패
    return res.status(401).json({ error: "Invalid token" });
  }
  res.status(200).json("User has been logged out.");
});

// isLoggedIn(req, res, next) {
//   const token = req.headers && req.headers.token;

//   if (token) {
//     // 토큰이 있는 경우 토큰 검증을 수행 한다.
//     const decoded = tokenUtil.verifyToken(token);
//     if (decoded) {
//       // 1. 토큰 검증이 성공한 경우 새로 갱신해 준다.
//       const newToken = tokenUtil.makeToken(decoded);
//       res.set({
//         token: newToken,
//         userId: decoded.id,
//       }); // header 세팅`

//       next(); // 미들웨어 통과(계속 진행)
//     } else {
//       // 2. 토큰 검증이 실패한 경우 401에러를 응답 한다.
//       const err = new Error('Unauthorized token');
//       logger.error(err.toString());

//       res.status(401).json({ err: err.toString() });
//     }
//   } else {
//     // 토큰이 없는 경우 401에러 응답
//     const err = new Error('Unauthorized token');
//     logger.error(err.toString());

//     res.status(401).json({ err: err.toString() });
//   }
// }

// user 토큰 발행

router.post("/login", async (req, res) => {
  try {
    // console.log(req.body);
    const params = {
      userid: req.body.userid,
      password: req.body.password,
    };
    logger.info(`(auth.token.params) ${JSON.stringify(params)}`);

    // 입력값 null 체크 ->front required 하므로 불필요
    if (!params.userid || !params.password) {
      const err = new Error("Not allowed null (userid, password)");
      logger.error(err.toString());

      res.status(500).json(err.toString());
    }

    // 비즈니스 로직 호출
    const result = await userService.login(params);
    logger.info(`(auth.token.result) ${JSON.stringify(result)}`);

    // 토큰 생성
    const token = tokenUtil.makeToken(result);
    res.set("token", token); // header 세팅

    // 최종 응답
    res.status(200).json(result.userid); //유저 id를 전달
  } catch (err) {
    res.status(500).json(err);
  }
});

//구글

// @desc    Auth with Google
// @route   GET /auth/google
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));
//

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

// // router.get("/login", function (req, res, next) {
// //   res.render("index", { title: "로그인 폼 양식입니다." });
// // });
// // router.get("/join", function (req, res, next) {
// //   res.render("register", { title: "회원가입 폼 양식입니다." });
// // });

// //로컬 회원가입 , 로그인 , 로그아웃
// // POST /auth/join
// // router.post("/join", isNotLoggedIn, join);
// router.post("/join", join);

// // POST /auth/login
// // router.post("/login", isNotLoggedIn, login);
// router.post("/login", login);

// // GET /auth/logout
// // router.get("/logout", isLoggedIn, logout);
// router.get("/logout", logout);

module.exports = router;
