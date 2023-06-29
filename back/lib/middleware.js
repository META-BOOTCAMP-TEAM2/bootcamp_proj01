/*eslint-disable*/
const logger = require("./logger");
const tokenUtil = require("./tokenUtil");

const middleware = {
  // 로그인 체크
  isLoggedIn(req, res, next) {
    const accesstoken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    if (accesstoken) {
      // 토큰이 있는 경우 토큰 검증을 수행 한다.
      const decodedACC = tokenUtil.verifyAccessToken(accesstoken);

      if (decodedACC) {
        // 1. 토큰 검증이 성공한 경우 새로 갱신해 준다.
        const newAccessToken = decodedACC;
        logger.info(`갱신 전 액세스토큰: ${accesstoken}`);
        logger.info(`갱신 후 액세스토큰: ${newAccessToken}`);

        res.cookie("accessToken", newAccessToken, {
          secure: false,
          httpOnly: true,
        }); // 쿠키 세팅`
        next();
      } else if (decodedACC === null) {
        // 2. 액세스토큰 검증이 실패한 경우 리프레시 토큰을 검증후 액세스 토큰을 갱신해 준다.
        const decodedREF = tokenUtil.verifyRefreshToken(refreshToken);
        if (decodedREF) {
          newAccessToken = decodedREF;
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

// console.log(`decodedACC : ${Object.keys(decodedACC)}`);
// //decodedACC : id,userid,username,role,email,iat,exp,iss
// console.log(`decodedACC : ${decodedACC.iat}`);
// //decodedACC : 1687968440
// console.log(`decodedACC : ${decodedACC.exp}`);
// //decodedACC : 1687968450
// console.log(`decodedACC : ${decodedACC.iss}`);
// //decodedACC : My Sweet Home

// iat, exp, iss는 JSON Web Token (JWT)에서 사용되는 표준 클레임(claim)의 일부입니다. 각각은 다음과 같은 의미를 갖습니다:

// iat (Issued At)
// iat는 토큰이 발급된 시간을 나타냅니다. 이는 일반적으로 UTC 기준으로 표현된 POSIX 시간(timestamp)입니다. iat 클레임은 토큰이 언제 발행되었는지를 나타내며, 토큰의 유효성을 검증하거나 토큰의 수명을 추적하는 데 사용될 수 있습니다.

// exp (Expiration Time)
// exp는 토큰의 만료 시간을 나타냅니다. 이 또한 POSIX 시간으로 표현되며, 일반적으로 iat 이후로 특정 시간(초 단위)이 경과한 시점을 나타냅니다. 토큰이 exp 시간 이후에는 더 이상 유효하지 않습니다. 토큰의 수명을 제한하고 보안을 강화하기 위해 사용됩니다. 유효 기간이 지난 토큰은 더 이상 검증되지 않습니다.

// iss (Issuer)
// iss는 토큰을 발급한 발급자(issuer)를 식별하는 값을 가집니다. 발급자는 토큰을 생성한 엔터티(서비스 또는 애플리케이션)를 나타냅니다. 이는 토큰의 신뢰성을 검증하기 위해 사용될 수 있습니다. 예를 들어, 특정 서비스에서 발급한 토큰인지를 확인하고자 할 때 iss 값을 검증할 수 있습니다.

// 이러한 클레임들은 JWT의 페이로드(payload)에 저장되어 있으며, 토큰 검증 및 처리 시 이러한 정보를 활용할 수 있습니다.
