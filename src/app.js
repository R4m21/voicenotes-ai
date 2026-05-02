const express = require("express");
const cors = require("cors");
const routerNotes = require("./routes/notes");
const routerAi = require("./routes/ai");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/notes", routerNotes);
app.use("/api/ai", routerAi);

module.exports = app;
