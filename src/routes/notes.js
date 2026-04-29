const router = require("express").Router();
const Note = require("../models/Note");

// CREATE
router.post("/", async (req, res) => {
  const note = await Note.create(req.body);
  res.json(note);
});

// GET ALL
router.get("/", async (req, res) => {
  const notes = await Note.find().sort({ createdAt: -1 });
  res.json(notes);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;