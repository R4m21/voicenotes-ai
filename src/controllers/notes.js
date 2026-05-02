const Note = require("../models/Note");

const createNote = async (req, res) => {
  try {
    const { title, transcription, summary, actionItems, keywords } = req.body;

    const note = await Note.create({
      title,
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
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteNote = async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "Note deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createNote, getNotes, deleteNote };
