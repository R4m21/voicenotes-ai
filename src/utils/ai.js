const { aiResponseSchema } = require("./zodSchema");

const analyzeText = async (text) => {
  try {
    const res = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3",
        stream: false,
        format: "json",
        prompt: `
      Analyze the transcription:
      
      ${text}

      return JSON strictly in this format:
      {
        "title": "...",
        "summary": "...,
        "actionItems": [{"text": "...", "priority": "High|Medium|Low]"}],
        "keywords: ["..."]
      }
      Do not include any extra text.
      `,
      }),
    });

    const data = await res.json();
    const parsed = JSON.parse(data.response);
    console.log({ text });
    console.log(JSON.parse(data.response));

    // ZOD VALIDATION + SANITIZATION
    const cleanData = aiResponseSchema.parse(parsed);

    console.log({ cleanData });

    return cleanData;
  } catch (error) {
    console.log(error);
    return {
      summary: "",
      actionItems: [],
      keywords: [],
    };
  }
};

module.exports = { analyzeText };
