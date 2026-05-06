const Note = require("../models/Note");
const { analyzeText } = require("../utils/ai");
const { transcribeAudio } = require("../utils/transcribe");

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

// 🆕 NEW: Voice → AI → Save
const createNoteFromAudio = async (req, res) => {
  
  const file = req.file;
  
  if (!file) {
    return res.status(400).json({ message: "Audio file is required" });
  }
  
  const filePath = file.path;
  console.log("...", filePath);

  // 🎤 Step 1: Transcription
  const transcription = await transcribeAudio(filePath);

  // 🧠 Step 2: AI Analysis
  const aiData = await analyzeText(transcription);

  // 💾 Step 3: Save to DB
  const note = await Note.create({
    title: "Voice Note",
    userId: req.user._id,
    transcription,
    summary: aiData.summary,
    actionItems: aiData.actionItems,
    keywords: aiData.keywords,
  });

  // await note.save();
  try {
    res.status(201).json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to process audio" });
  }
};

module.exports = { createNote, getNotes, deleteNote, createNoteFromAudio };
