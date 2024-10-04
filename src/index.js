import express, {json, urlencoded } from "express";
import session from "express-session";
import passport from "passport";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

// Middlewares
app.use(json({ limit: "100mb" }));
app.use(urlencoded({ limit: "100mb", extended: true }));

// Routes

// App wit port
const PORT = process.env.PORT || 7001;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
