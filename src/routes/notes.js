const { createNote, getNotes, deleteNote } = require("../controllers/notes");
const router = require("express").Router();

// CREATE
router.post("/", createNote);

// GET ALL
router.get("/", getNotes);

// DELETE
router.delete("/:id", deleteNote);

module.exports = router;