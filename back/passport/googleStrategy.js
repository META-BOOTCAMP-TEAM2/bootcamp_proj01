/*eslint-disable*/

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GoogleUser = require("../models/user");

module.exports = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        // console.log("google profile", profile);
        const newUser = {
          id: profile.id,
          userid: profile.id,
          snsId: profile.id,
          username: profile.displayName,
          provider: "google",
        };

        try {
          let user = await GoogleUser.findOne({ snsId: profile.id });

          if (user) {
            done(null, user);
          } else {
            user = await GoogleUser.create(newUser);
            done(null, user);
          }
        } catch (err) {
          console.error(err);
        }
      }
    )
  );
};
