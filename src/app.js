const express = require("express");
const cors = require("cors");
const routerAuth = require("./routes/auth");
const routerNotes = require("./routes/notes");
const routerAi = require("./routes/ai");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
dotenv.config();

const app = express();
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";

app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", routerAuth);
app.use("/api/notes", routerNotes);
app.use("/api/ai", routerAi);

module.exports = app;
