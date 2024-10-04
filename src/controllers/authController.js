import bcrypt from "bcryptjs";
import User from "../models/user.js";

export const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    //check wheather username is present into database or not
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({
        message: "Username already exists. Please choose another one."
      });
    }
    // create Hash password from provided password
    const hashPassword = await bcrypt.hash(password, 10);
    // create new User
    const newUser = new User({
      username,
      password: hashPassword,
      isMfaActive: false
    });
    console.log("New User : ", newUser);
    await newUser.save(); // store the new user to database
    res.status(201).json({ message: "User registered successfully!!!" });
  } catch (error) {
    res.status(500).json({ error: "Error registering User", message: error });
  }
};

export const login = async (req, res) => {
  console.log("The Authenticated user is : ", req.user);
  res
    .status(200)
    .json({
      message: "User logged in successfully!!",
      username: req.user.username,
      isMfaActive: req.user.isMfaActive
    });
};

export const authStatus = async (req, res) => {};

export const logout = async (req, res) => {};

export const setup2FA = async (req, res) => {};

export const verify2FA = async (req, res) => {};

export const reset2FA = async (req, res) => {};
