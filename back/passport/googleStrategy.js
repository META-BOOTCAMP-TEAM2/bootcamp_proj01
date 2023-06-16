/*eslint-disable*/

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GoogleUser = require("../models/googleUser");

module.exports = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log("google profile", profile);
        const newUser = {
          googleId: profile.id,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          image: profile.photos[0].value,
        };

        try {
          let user = await GoogleUser.findOne({ googleId: profile.id });

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
