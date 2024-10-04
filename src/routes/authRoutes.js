import { Router } from "express";
import passport from "passport";

const router = Router();

// Registration Route
router.post("/register", register);

// Login route
router.post("/login", login);

// AuthStatus Route
router.get("/status", authStatus);

// Logout Route
router.post("/logout", logout);

// 2FA Route
router.post("/2fa/setup", setup2FA);

// verify Route
router.post("/2fa/verify", verify2FA);

// 2FA Route
router.post("/2fa/reset", reset2FA);
