const Note = require("../models/Note");

const createNote = async (req, res) => {
  try {
    const { title, transcription, summary, actionItems, keywords } = req.body;

    const note = await Note.create({
      title,
      userId: req.user._id,
      transcription,
      summary,
      actionItems,
      keywords,
    });

    await note.save();

    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteNote = async (req, res) => {
  try {
    const deletedNote = await Note.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!deletedNote) {
      return res
        .status(404)
        .json({ message: "Note not found or unauthorized" });
    }

    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createNote, getNotes, deleteNote };
