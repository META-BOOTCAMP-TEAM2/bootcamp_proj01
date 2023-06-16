/*eslint-disable*/
const bcrypt = require("bcrypt");
const passport = require("passport");
const KakaoUser = require("../models/kakaoUser");

exports.join = async (req, res, next) => {
  // console.log(req.body);
  const { email, nick, password } = req.body;
  try {
    const exUser = await KakaoUser.findOne({ where: { email } });
    if (exUser) {
      return res.redirect("/join?error=exist");
    }
    await KakaoUser.create({
      email,
      nick,
      password,
    });
    return res.redirect("/?성공적으로 가입했습니다.");
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

exports.login = (req, res, next) => {
  passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      return res.redirect(`/?error=${info.message}`);
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.redirect("/?성공적으로 로그인했습니다.");
    });
  })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
};

exports.logout = (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
};
