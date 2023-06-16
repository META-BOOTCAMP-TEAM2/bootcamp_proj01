/*eslint-disable*/
const passport = require("passport");
const Google = require("./googleStrategy");
const Kakao = require("./kakaoStrategy");
const GoogleUser = require("../models/googleUser");
const KakaoUser = require("../models/kakaoUser");
const Local = require("./localStrategy");
module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    KakaoUser.findOne({ where: { id } })
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });

  Local();
  Google();
  Kakao();
};
