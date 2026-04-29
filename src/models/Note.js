const mongoose = require("mongoose");

const ActionItemSchema = new mongoose.Schema({
  text: String,
  priority: {
    type: String,
    enum: ["High", "Medium", "Low"],
    default: "Medium",
  },
  completed: { type: Boolean, default: false },
});

const NoteSchema = new mongoose.Schema(
  {
    title: String,
    transcription: String,
    summary: String,
    actionItems: [ActionItemSchema],
    keywords: [String],
  },
  { timestamps: true },
);

const Note = mongoose.model("Note", NoteSchema);

module.exports = Note;
