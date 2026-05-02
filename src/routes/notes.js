const { createNote, getNotes, deleteNote } = require("../controllers/notes");
const { userAuth } = require("../middlewares/auth");
const router = require("express").Router();

// CREATE
router.post("/", userAuth, createNote);

// GET ALL
router.get("/", userAuth, getNotes);

// DELETE
router.delete("/:id", userAuth, deleteNote);

module.exports = router;
