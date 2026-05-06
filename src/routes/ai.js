const router = require("express").Router();
const { createNoteFromAudio } = require("../controllers/notes");
const { userAuth } = require("../middlewares/auth");
const multer = require("multer");

const upload = multer({ dest: "uploads/" });

router.post(
  "/transcribe",
  userAuth,
  upload.single("audio"),
  createNoteFromAudio,
);

module.exports = router;
