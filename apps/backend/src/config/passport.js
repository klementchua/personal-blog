require('dotenv').config();
const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const db = require('../db/db');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new Strategy(options, async (payload, done) => {
    try {
      const user = await db.getUserById(payload.id);
      if (!user) return done(null, false, { message: 'User does not exist' });
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

module.exports = passport;
