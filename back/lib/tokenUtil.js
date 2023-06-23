/*eslint-disable*/
const jwt = require("jsonwebtoken");

const accessSecretKey = process.env.SECRETKEY;
const accOptions = {
  expiresIn: "10m", // 액세스 토큰 만료시간 (10분)
  issuer: "My Sweet Home", //발행처
};
const refreshOptions = {
  expiresIn: "14d", // 리프레시 토큰 만료시간 (2주)
  issuer: "My Sweet Home", //발행처
};

const tokenUtil = {
  // 액세스 토큰 생성
  makeAccessToken(user) {
    const payload = {
      id: user.id,
      userid: user.userid,
      username: user.username,
      role: user.role,
      email: user.email,
      phone: user.phone,
    };
    const accessToken = jwt.sign(payload, accessSecretKey, accOptions);

    return accessToken;
  },
  makeRefreshToken(user) {
    const payload = {
      id: user.id,
      userid: user.userid,
      username: user.username,
      role: user.role,
      email: user.email,
      phone: user.phone,
    };

    const refreshToken = jwt.sign(payload, accessSecretKey, refreshOptions);

    return refreshToken;
  },
  verifyToken(token) {
    try {
      const decoded = jwt.verify(token, accessSecretKey);

      return decoded;
    } catch (err) {
      return null;
    }
  },

  // // 리프레쉬 토큰 검증
  // verifyToken1(req, res) {
  //   try {
  //     const token = req.cookies.accessToken;
  //     const data = jwt.verify(token, accessSecretKey);
  //     if (data) {
  //       //토큰 검증이 성공한 경우 새로 갱신해 준다.
  //       const newAccessToken = makeAccessToken(data);
  //     }
  //     next(); // 미들웨어 통과(계속 진행)
  //   } catch (error) {
  //     res.status(500).json(error);
  //   }
  // },
};

module.exports = tokenUtil;
