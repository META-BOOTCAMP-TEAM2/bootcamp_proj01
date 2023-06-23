const logger = require("./logger");
const tokenUtil = require("./tokenUtil");

const middleware = {
  // 로그인 체크
  // isLoggedIn(req, res, next) {
  isLoggedIn(req, res) {
    const token = req.cookies.accessToken;
    if (token) {
      // 토큰이 있는 경우 토큰 검증을 수행 한다.
      const decoded = tokenUtil.verifyToken(token);
      if (decoded) {
        // 1. 토큰 검증이 성공한 경우 새로 갱신해 준다.
        const newAccessToken = tokenUtil.makeToken(decoded);
        logger.info(`갱신 전 액세스토큰: ${token}`);
        logger.info(`갱신 후 액세스토큰: ${newAccessToken}`);

        res.cookie("accessToken", newAccessToken, {
          secure: false,
          httpOnly: true,
        }); // 쿠키 세팅`

        // next(); // 미들웨어 통과(계속 진행)
        res.status(200).json("토큰 갱신 완료");
      } else {
        // 2. 토큰 검증이 실패한 경우 401에러를 응답 한다.
        const err = new Error("만료된 토큰입니다.");
        logger.error(err.toString());

        res.status(401).json(err.toString());
      }
    } else {
      // 토큰이 없는 경우 401에러 응답
      const err = new Error("토큰이 없습니다.");
      logger.error(err.toString());

      res.status(401).json(err.toString());
    }
  },
};

module.exports = middleware;
