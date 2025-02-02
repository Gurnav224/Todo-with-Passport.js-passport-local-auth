const User = require("../models/user.model");
const Strategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");


const initializePassport = (passport) => {
  passport.use(
    new Strategy(async function (username, password, done) {
      const user = await User.findOne({ username });

      if (!user) {
        return done(null, false, { message: "Incorrect Username" });
      }

      try {
        if (!bcrypt.compare(password, user.password)) {
          return done(null, false), { message: "Incorrect password" };
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }),
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(async function (id, done) {
    const user = await User.findById(id);
    done(null, user);
  });
};


module.exports = initializePassport;