import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import passport from 'passport';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = Buffer.from(process.env.PUBLIC_KEY, 'base64');

export default passport.use(
  new JwtStrategy(opts, (payload, done) => {
    const data = fs.readFileSync('data/users.json', 'utf8');
    const user = JSON.parse(data);
    if (user.username === payload.username) {
      return done(null, user);
    }

    return done(null, false);
  }),
);
