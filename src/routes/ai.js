const router = require("express").Router();

// SIMPLE AI PROCESSOR
router.post("/process", (req, res) => {
  const { text } = req.body;

  const summary = text.slice(0, 120);

  const actionItems = text
    .split(".")
    .filter(
      (t) => t.includes("karna") || t.includes("todo") || t.includes("fix"),
    )
    .map((t) => ({
      text: t.trim(),
      priority: "Medium",
    }));

  const keywords = text
    .toLowerCase()
    .split(" ")
    .filter((w) => ["bug", "meeting", "fix", "call", "update"].includes(w));

  res.json({
    summary,
    actionItems,
    keywords,
  });
});

module.exports = router;
