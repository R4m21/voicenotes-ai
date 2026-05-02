const { createNote, getNotes, deleteNote } = require("../controllers/notes");
const { userAuth } = require("../middlewares/auth");
const router = require("express").Router();

// CREATE
router.post("/", createNote);

// GET ALL
router.get("/", userAuth, getNotes);

// DELETE
router.delete("/:id", deleteNote);

module.exports = router;