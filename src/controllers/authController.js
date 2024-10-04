import bcrypt from "bcryptjs";
import User from "../models/user.js";
import speakeasy from "speakeasy";
import jwt from "jsonwebtoken";
import qrCode from "qrcode";

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
  res.status(200).json({
    message: "User logged in successfully!!",
    username: req.user.username,
    isMfaActive: req.user.isMfaActive
  });
};

export const authStatus = async (req, res) => {
  if (req.user) {
    res.status(200).json({
      message: "User logged in successfully!!",
      username: req.user.username,
      isMfaActive: req.user.isMfaActive
    });
  } else {
    res.status(401).json({ message: "Unauthorized User" });
  }
};

export const logout = async (req, res) => {
  if (!req.user) res.status(401).json({ message: "Unauthorized User" });
  req.logout((error) => {
    if (error) return res.status(400).json({ message: "User not logout !!!!" });
    res.status(200).json({ message: "Logout successfull" });
  });
};

export const setup2FA = async (req, res) => {
  try {
    console.log("The req.User is : ", req.user);
    const user = req.user;
    var secret = speakeasy.generateSecret();
    console.log("The Secret object is : ", secret);
    user.twoFactorSecret = secret.base32;
    user.isMfaActive = true;
    await user.save();
    const url = speakeasy.otpauthURL({
      secret: secret.base32,
      label: `${req.user.username}`,
      issuer: "www.pratik's_MERNStack_Projects.com",
      encoding: "base32"
    });
    const qrImageUrl = await qrCode.toDataURL(url);
    res.status(200).json({
      secret: secret.base32,
      qrCode: qrImageUrl
    });
  } catch (error) {
    res.status(500).json({ error: "Error settin up MFA", message: error });
  }
};

export const verify2FA = async (req, res) => {};

export const reset2FA = async (req, res) => {};
