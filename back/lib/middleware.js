/*eslint-disable*/
const logger = require("./logger");
const tokenUtil = require("./tokenUtil");

const middleware = {
  // 로그인 체크
  // isLoggedIn(req, res, next) {
  isLoggedIn(req, res, next) {
    const accesstoken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;
    if (accesstoken) {
      // 토큰이 있는 경우 토큰 검증을 수행 한다.
      const decodedACC = tokenUtil.verifyAccessToken(accesstoken);
      if (decodedACC) {
        // 1. 토큰 검증이 성공한 경우 새로 갱신해 준다.
        const newAccessToken = tokenUtil.makeToken(decodedACC);
        logger.info(`갱신 전 액세스토큰: ${accesstoken}`);
        logger.info(`갱신 후 액세스토큰: ${newAccessToken}`);

        res.cookie("accessToken", newAccessToken, {
          secure: false,
          httpOnly: true,
        }); // 쿠키 세팅`

        next(); // 미들웨어 통과(계속 진행)
      } else if (!decodedACC) {
        // 2. 액세스토큰 검증이 실패한 경우 리프레시 토큰을 검증후 액세스 토큰을 갱신해 준다.
        const decodedREF = tokenUtil.verifyRefreshToken(refreshToken);
        newAccessToken = decodedACC;
        res.cookie("accessToken", newAccessToken, {
          secure: false,
          httpOnly: true,
        }); // 쿠키 세팅`

        next(); // 미들웨어 통과(계속 진행)
      } else {
        // 2. 토큰 검증이 실패한 경우 401에러를 응답 한다.
        const err = new Error("만료된 토큰입니다. 로그인 필요.");
        logger.error(err.toString());

        res.status(401).json(err.toString());
      }
    } else {
      // 토큰이 없는 경우 401에러 응답
      const err = new Error("토큰이 없습니다. 로그인 필요.");
      logger.error(err.toString());

      res.status(401).json(err.toString());
    }
  },
};

module.exports = middleware;
