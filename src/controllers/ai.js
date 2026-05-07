const { analyzeText } = require("../utils/ai");
const { transcribeAudio } = require("../utils/transcribe");

const streamTranscription = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "Audio file is required" });
    }
    const filePath = file.path;

    // 🎤 Step 1: Transcription
    const transcription = await transcribeAudio(filePath);

    console.log(transcription);

    // 🧠 Set headers for streaming
    res.setHeader("Content-Type", "text/plain");
    res.setHeader("Transfer-Encoding", "chunked");

    // 🔥 Stream character by character
    for (let char of transcription) {
      res.write(char);
      //   await new Promise((r) => setTimeout(r, 10)); // typing effect
    }
    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to process audio" });
  }
};

const aiAnalyzeText = async (req, res) => {
  try {
    const { text } = req.body;
    const aiData = await analyzeText(text);
    return res.json(aiData);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { streamTranscription, aiAnalyzeText };
