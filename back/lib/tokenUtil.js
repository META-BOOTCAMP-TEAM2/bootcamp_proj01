/*eslint-disable*/
const jwt = require("jsonwebtoken");

const secretKey = process.env.SECRETKEY;
const options = {
  expiresIn: "24h", // 만료시간
};

const tokenUtil = {
  // 토큰 생성
  makeToken(user) {
    const payload = {
      id: user.id,
      userid: user.userid,
      name: user.name,
      role: user.role,
    };

    const token = jwt.sign(payload, secretKey, options);

    return token;
  },
  // 토큰 검증
  verifyToken(tokenHeader) {
    try {
      if (tokenHeader && tokenHeader.startsWith("Bearer ")) {
        // "Bearer " 스키마 제외
        tokenHeader = tokenHeader.split(" ")[1];
      }
      const decoded = jwt.verify(tokenHeader, secretKey);

      return decoded;
    } catch (err) {
      return null;
    }
  },
};

module.exports = tokenUtil;
