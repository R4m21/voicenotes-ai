# 🎙️ VoiceNotes AI (Backend)

AI-powered voice note processing backend built with Node.js, Whisper (local), and Ollama.

This backend handles:

* 🎤 Audio upload
* 🧠 Speech-to-text (Whisper)
* 🤖 AI analysis (Ollama - Llama3/Phi3)
* 💾 MongoDB storage

---

# 🚀 Tech Stack

* **Node.js + Express**
* **MongoDB + Mongoose**
* **Whisper (local Python)** – speech-to-text
* **Ollama (Llama3 / Phi3)** – AI analysis
* **Zod** – validation & sanitization
* **Multer** – file uploads

---

# 📁 Project Structure

```
voicenotes-ai
├─ server.js
├─ transcribe.py
├─ uploads/
├─ venv/
├─ src/
│  ├─ app.js
│  ├─ config/db.js
│  ├─ controllers/
│  │  ├─ auth.js
│  │  └─ notes.js
│  ├─ middlewares/auth.js
│  ├─ models/
│  │  ├─ Note.js
│  │  └─ User.js
│  ├─ routes/
│  │  ├─ ai.js
│  │  ├─ auth.js
│  │  └─ notes.js
│  └─ utils/
│     ├─ ai.js
│     ├─ transcribe.js
│     ├─ validation.js
│     └─ zodSchema.js
```

---

# ⚙️ Setup (macOS)

## 1. Install Homebrew

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew --version
```

---

## 2. Install Python & Dependencies

```bash
brew install python
python3 --version
pip3 --version
```

---

## 3. Setup Virtual Environment (Recommended)

```bash
python3 -m venv venv
source venv/bin/activate
```

Install Whisper:

```bash
pip install openai-whisper
pip install torch
```

---

## 4. Install FFmpeg

```bash
brew install ffmpeg
```

---

## 5. Install Ollama

```bash
brew install ollama
```

Start Ollama:

```bash
ollama serve
```

Download model:

```bash
ollama run llama3
# or lightweight:
ollama run phi3
```

---

## 6. Install Node Dependencies

```bash
npm install
```

---

## 7. Create Required Folders

```bash
mkdir uploads
```

---

## ▶️ Run Server

```bash
npm run dev
```

---

# 🔄 API Flow

```
Client (audio)
   ↓
Multer (uploads/)
   ↓
Whisper (transcribe.py)
   ↓
Text output
   ↓
Ollama (AI analysis)
   ↓
Zod validation
   ↓
MongoDB
```

---

# 📡 API Endpoint

## 🎤 Transcribe Audio

**POST** `/api/ai/transcribe`

### Headers:

```
Authorization: Bearer <token>
```

### Body:

```
FormData:
audio: <file>
```

### Response:

```json
{
  "title": "Voice Note",
  "transcription": "...",
  "summary": "...",
  "actionItems": [
    { "text": "...", "priority": "High" }
  ],
  "keywords": ["..."]
}
```

---

# ⚠️ Important Notes

* Whisper runs locally using Python
* Ollama must be running on port `11434`
* AI output is validated using Zod before saving
* Audio files are stored temporarily in `/uploads`

---

# 🧠 Models Recommendation

| Model  | Use Case            |
| ------ | ------------------- |
| llama3 | Best quality        |
| phi3   | Faster, lightweight |

---

# 🐞 Common Issues

## 1. Whisper Warning

```
FP16 is not supported on CPU
```

✔ Normal, safe to ignore

---

## 2. Ollama JSON Parsing Error

✔ Use:

* `format: "json"`
* fallback parsing logic

---

## 3. Slow Transcription

✔ Use:

* smaller Whisper model (`base`)
* or switch to faster-whisper

---

# 🔐 Environment Variables

Create `.env`:

```
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret
PORT=8000
```

---

# 🚀 Future Improvements

* Streaming transcription (real-time)
* Background job queue (BullMQ)
* Cloud storage (S3)
* Multi-language support
* AI retry mechanism

---

# 📄 License

ISC
