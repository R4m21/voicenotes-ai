const router = require("express").Router();
const { streamTranscription, aiAnalyzeText } = require("../controllers/ai");
const { userAuth } = require("../middlewares/auth");
const multer = require("multer");

const upload = multer({ dest: "uploads/" });

router.post(
  "/transcribe",
  userAuth,
  upload.single("audio"),
  streamTranscription,
);

router.post("/analyze", userAuth, aiAnalyzeText);

module.exports = router;
