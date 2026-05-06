const analyzeText = async (text) => {
  try {
    const res = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      body: JSON.stringify({
        model: "llama3",
        prompt: `
      Analyze the transcription:
      
      ${text}

      Return JSON: {
        "summary": "...,
        "actionItems": [{"text": "...", "priority": "High|Medium|Low]"}],
        "keywords"
      }
      `,
      }),
    });

    const data = await res.json();

    return JSON.parse(data.response);
  } catch {
    return {
      summary: "",
      actionItems: [],
      keywords: [],
    };
  }
};

module.exports = { analyzeText };
