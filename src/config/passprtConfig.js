import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import User from "../models/user.js";

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username });
      if (!user) return done(null, false, { message: "User not found" });

      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (isPasswordMatch) return done(null, user);
      else return done(null, false, { message: "Incorrect Password" });
    } catch (error) {
      return done(error);
    }
  })
);
// Serialize User
passport.serializeUser((user, done) => {
    console.log("We are inside serializeUser");
    
  done(null, user._id);
});

// Deserialize User
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
