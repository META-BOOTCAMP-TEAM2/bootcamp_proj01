/*eslint-disable*/
//로그인 체크 미들웨어
const { decode } = require("jsonwebtoken");
const logger = require("./logger");
const tokenUtil = require("./tokenUtil");

const middleware = {
  // 로그인 체크
  isLoggedIn(req, res, next) {
    const tokenHeader = req.headers.authorization;

    if (tokenHeader) {
      // 토큰이 있는 경우 토큰 검증을 수행 한다.
      const loginUserId =
        tokenUtil.verifyToken(req.headers.authorization).userid || null;
      req.body.userid = loginUserId;

      if (loginUserId) {
        // 1. 토큰 검증이 성공한 경우 새로 갱신해 준다.
        // const newToken = tokenUtil.makeToken(decoded);
        // res.set({
        //   token: newToken,
        //   userId: decoded.userid,
        // }); // header 세팅`

        next(); // 미들웨어 통과(계속 진행)
      } else {
        // 2. 토큰 검증이 실패한 경우 401에러를 응답 한다.
        const err = new Error("유효하지않은 토큰입니다.");
        logger.error(err.toString());

        res.status(401).json(err.toString());
      }
    } else {
      // 토큰이 없는 경우 401에러 응답  //로그인시 토큰 발급하므로 불필요.
      const err = new Error("토큰이 없습니다.");
      logger.error(err.toString());

      res.status(401).json(err.toString());
    }
  },
};

module.exports = middleware;
