const User = require('../models/users.model');
const Strategy = require("passport-local").Strategy;
const bcryptjs = require("bcryptjs");

function initializeStrategy(passport){
  passport.use(
    new Strategy(async (username, password, done) => {
      const user = await User.findOne({username});
      if (!user) return done(null, false, { message: "user not found" });
      if (bcryptjs.compareSync(user.password, password)) {
        return done(null, false, { message: "password didn't match" });
      }
      return done(null, user);
    }),
  );
  
  passport.serializeUser((user, done) => done(null, user.id));
  
  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
  });
}


module.exports = initializeStrategy;