const express = require("express");
const cors = require("cors");
const routerAuth = require("./routes/auth");
const routerNotes = require("./routes/notes");
const routerAi = require("./routes/ai");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", routerAuth);
app.use("/api/notes", routerNotes);
app.use("/api/ai", routerAi);

module.exports = app;
