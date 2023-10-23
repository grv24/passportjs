const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const key = require("./keys");
const User = require("../models/user.model");

passport.serializeUser((user, done) => {
  console.log('seralize')
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    console.log('deseralize')
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      // Options for the Google OAuth 2.0 strategy
      callbackURL: "/auth/google/redirect",
      clientID: key.google.clientId,
      clientSecret: key.google.clientSecret,
    },
    (accessToken, refreshToken, profile, done) => {
      // Passport callback function

      // This is where you handle the user's profile data and decide what to do next.
      User.findOne({ googleId: profile.id }).then((existingUser) => {
        if (existingUser) {
          // User already exists, no need to create a new one
          console.log(`User already exists: ${existingUser}`);
          done(null, existingUser);
        } else {
          // User doesn't exist, create a new user
          new User({
            provider: profile.provider,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            username: profile.displayName,
            googleId: profile.id,
            picture: profile.photos[0].value,
          })
            .save()
            .then((newUser) => {
              console.log(`New user created: ${newUser}`);
              done(null, newUser);
            });
        }
      });
    }
  )
);
