const router = require("express").Router();
const { streamTranscription } = require("../controllers/ai");
const { userAuth } = require("../middlewares/auth");
const multer = require("multer");

const upload = multer({ dest: "uploads/" });

router.post(
  "/transcribe",
  userAuth,
  upload.single("audio"),
  streamTranscription,
);

module.exports = router;
