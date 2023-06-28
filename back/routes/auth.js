/*eslint-disable*/
const express = require("express");
const passport = require("passport");
const router = express.Router();
const logger = require("../lib/logger");
const tokenUtil = require("../lib/tokenUtil");
const userService = require("../service/userService");

// 회원가입
router.post("/join", async (req, res) => {
  try {
    const params = {
      username: req.body.username,
      userid: req.body.userid,
      password: req.body.password,
      role: req.body.role,
      email: req.body.email,
      phone: req.body.phone,
    };
    logger.info(`(user.reg.params) ${JSON.stringify(params)}`);

    // 입력값 null 체크 -> front에서 required 처리
    if (!params.username || !params.userid || !params.password) {
      const err = new Error("Not allowed null (name, userid, password)");
      logger.error(err.toString());
      res.json(err.toString());
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

//로그인
router.post("/login", async (req, res) => {
  try {
    const params = {
      userid: req.body.userid,
      password: req.body.password,
    };
    logger.info(`(auth.login.params) ${JSON.stringify(params)}`);

    // 입력값 null 체크 ->front required 하므로 불필요
    if (!params.userid || !params.password) {
      const err = new Error("Not allowed null (userid, password)");
      logger.error(err.toString());

      res.status(500).json(err.toString());
    }

    // 비즈니스 로직 호출
    const result = await userService.login(params);
    logger.info(`(auth.login.result) ${JSON.stringify(result)}`);
    // 토큰 생성
    const accessToken = tokenUtil.makeAccessToken(result);
    const refreshToken = tokenUtil.makeRefreshToken(result);
    // token 전송
    const tokenSet = { access_token: accessToken, refresh_token: refreshToken };
    // res.cookie("accessToken", accessToken, {
    //   secure: false,
    //   httpOnly: true,
    // });

    // res.cookie("refreshToken", refreshToken, {
    //   secure: false,
    //   httpOnly: true,
    // });

    const user = { ...result.dataValues };
    delete user.password;
    // 최종 응답
    res.status(200).json(tokenSet); //유저 정보를 전달
  } catch (err) {
    res.status(500).json(err);
  }
});

// 구글;
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.status(200).json("성공적으로 로그인 했습니다. [google]"); // 성공 시에는 /로 이동
  }
);

router.get("/google/logout", (req, res) => {
  try {
    req.logout(() => {
      // 사용자 로그아웃 후 콜백 함수 실행
      req.session.destroy(() => {
        // 세션 파괴
        res.clearCookie("connect.sid"); // 쿠키 삭제
        res.status(200).json("성공적으로 로그아웃 했습니다. [google]"); // 성공 시에는 /로 이동
      });
    });
  } catch (error) {
    res.status(403).json(`error_google: ${error}`);
  }
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
    res.status(200).json("성공적으로 로그인 했습니다. [kakao]"); // 성공 시에는 /로 이동
  }
);
router.get("/kakao/logout", (req, res) => {
  try {
    req.logout(() => {
      // 사용자 로그아웃 후 콜백 함수 실행
      req.session.destroy(() => {
        // 세션 파괴
        res.clearCookie("connect.sid"); // 쿠키 삭제
        res.status(200).json("성공적으로 로그아웃 했습니다. [kakao]"); // 성공 시에는 /로 이동
      });
    });
  } catch (error) {
    res.status(403).json(`error_google: ${error}`);
  }
});
// [ejs 서버 템플릿엔진으로 체크.]
// // router.get("/login", function (req, res, next) {
// //   res.render("index", { title: "로그인 폼 양식입니다." });
// // });
// // router.get("/join", function (req, res, next) {
// //   res.render("register", { title: "회원가입 폼 양식입니다." });
// // });

module.exports = router;
